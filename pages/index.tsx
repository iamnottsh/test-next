import Head from 'next/head'
import {
    AppBar,
    Badge,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent, CardHeader,
    Container,
    Drawer,
    Toolbar,
    Typography
} from "@mui/material";
import {useState} from "react";
import _call from "@/_call";
import {clearKeys, exportKeys, importKeys, setKey} from "@/_laokey";
import {nanoid} from "nanoid/async";
import Mark from "@/Mark";

function Bar() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')
    const [disabled, setDisabled] = useState(false)
    return <Toolbar>
        <Button variant="contained" color="secondary" size="large" sx={{mr: 2}} onClick={() => setOpen(true)}>
            发帖
        </Button>
        <Drawer anchor="bottom" open={open} onClose={() => {
            if (!disabled) setOpen(false)
        }} keepMounted>
            <Container>
                <Card>
                    <CardHeader title="发帖"/>
                    <CardContent>
                        <Mark value={value} onChange={event => setValue(event.target.value)} defaultShow="对比"/>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="secondary" size="large" onClick={async () => {
                            setDisabled(true)
                            let error
                            try {
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
                                const key = JSON.stringify(await crypto.subtle.exportKey('jwk', publicKey))
                                await _call('create_topic', {id: await nanoid(), key, value})
                                setKey(key, JSON.stringify(await crypto.subtle.exportKey('jwk', privateKey)))
                                setValue('')
                                setOpen(false)
                            } catch (e) {
                                error = e
                            }
                            setDisabled(false)
                            if (error) throw error
                        }} disabled={disabled}>
                            钦此
                        </Button>
                        <Button onClick={() => setOpen(false)} disabled={disabled}>
                            慢着
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </Drawer>
        <Typography variant="h1" sx={{flexGrow: 1}}>
            lao
        </Typography>
        <ButtonGroup variant="outlined" color="inherit" sx={{ml: 2}}>
            <Button onClick={async () => {
                await navigator.clipboard.writeText(exportKeys())
                alert('已复制凭据！')
            }}>
                导出
            </Button>
            <Button onClick={() => {
                const result = prompt('请输入凭据！')
                if (result !== null) importKeys(result)
            }}>
                并入
            </Button>
            <Button onClick={() => {
                if (confirm('你确定要清除凭据吗？如果你没有事先导出凭据以供并入，就再也找不回来了！'))
                    clearKeys()
            }}>
                清除
            </Button>
        </ButtonGroup>
    </Toolbar>
}

export default function Home() {
    const [counter, setCounter] = useState(0)
    return <>
        <Head>
            <title>lao</title>
            <meta name="description" content="lao，一个不记名的留言板"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <AppBar>
            <Bar/>
        </AppBar>
        <Bar/>
        <Container component="main">
            <Typography variant="h2">
                Next + MUI
            </Typography>
            <Badge badgeContent={counter} color="secondary">
                <Button
                    variant="contained"
                    onClick={() => {
                        setCounter(counter + 1)
                    }}
                >
                    点我
                </Button>
            </Badge>
            <Typography>
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
            </Typography>
            <Typography>
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
                miku miku miku miku miku miku miku miku miku miku miku miku miku miku miku
            </Typography>
        </Container>
    </>
}
