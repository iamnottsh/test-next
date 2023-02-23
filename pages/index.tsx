import Head from 'next/head'
import {
    AppBar,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Container,
    Toolbar,
    Typography
} from "@mui/material";
import _call from "@/_call";
import {clearTokens, exportTokens, getToken, importTokens, setToken} from "@/_token";
import {nanoid} from "nanoid/async";
import Editor from "@/Editor";
import Items from "@/Items";
import React, {useEffect, useRef, useState} from "react";
import xss from "xss";
import {marked} from "marked";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/zh-cn";
import {ObjectId} from "bson";

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export default function Home() {
    const [items, setItems] = useState<{ token: string, value: string, _id: string }[]>([])
    const upMore = useRef<() => void>(), downMore = useRef<() => void>()
    const [first, setFirst] = useState(true)
    useEffect(() => {
        if (first && upMore.current) {
            upMore.current()
            setFirst(false)
        }
    }, [first])
    const bar = <Toolbar>
        <Editor title="发帖" emit={async value => {
            const {publicKey, privateKey} = await crypto.subtle.generateKey(
                {
                    name: 'RSA-OAEP',
                    modulusLength: 4096,
                    publicExponent: new Uint8Array([1, 0, 1]),
                    hash: 'SHA-256'
                },
                true,
                ['encrypt', 'decrypt']
            )
            const token = JSON.stringify(await crypto.subtle.exportKey('jwk', publicKey))
            await _call('create_topic', {id: await nanoid(), token, value})
            setToken(token, JSON.stringify(await crypto.subtle.exportKey('jwk', privateKey)))
            if (downMore.current) downMore.current()
        }}/>
        <Typography variant="h1" sx={{ml: 2, flexGrow: 1}}>
            lao
        </Typography>
        <ButtonGroup variant="outlined" color="inherit" sx={{ml: 2}}>
            <Button onClick={async () => {
                await navigator.clipboard.writeText(exportTokens())
                alert('已复制凭据！')
            }}>
                导出
            </Button>
            <Button onClick={() => {
                const result = prompt('请输入凭据！')
                if (result !== null) importTokens(result)
            }}>
                并入
            </Button>
            <Button onClick={() => {
                if (confirm('你确定要清除凭据吗？如果你没有事先导出凭据以供并入，就再也找不回来了！'))
                    clearTokens()
            }}>
                清除
            </Button>
        </ButtonGroup>
    </Toolbar>
    return <>
        <Head>
            <title>lao</title>
            <meta name="description" content="lao，一个不记名的留言板"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <AppBar>
            {bar}
        </AppBar>
        {bar}
        <Container component="main" sx={{mt: 4, mb: 4}}>
            <Items
                upMore={upMore}
                downMore={downMore}
                onUpMore={async () => {
                    setItems([...await _call('get_topics', {
                        ...(items.length > 0 && {no: items[0]._id}),
                        reverse: false
                    }), ...items])
                }}
                onDownMore={async () => {
                    setItems([...items, ...await _call('get_topics', {
                        ...(items.length > 0 && {no: items[items.length - 1]._id}),
                        reverse: true
                    })])
                }}
                list={items.map(({token, value, _id}) =>
                    <Card
                        key={_id}
                        sx={{border: 2, borderColor: getToken(token) ? 'secondary.main' : 'text.primary'}}
                    >
                        <CardHeader
                            title={`>>${_id}`}
                            subheader={dayjs(new ObjectId(_id).getTimestamp()).fromNow()}
                        />
                        <CardContent
                            dangerouslySetInnerHTML={{__html: xss(marked(value))}}
                        />
                    </Card>
                )}/>
        </Container>
    </>
}
