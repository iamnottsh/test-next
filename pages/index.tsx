import Head from 'next/head'
import {
    AppBar,
    Badge,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Container,
    Drawer,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {useState} from "react";
import _call from "@/_call";
import {clearKeys, exportKeys, importKeys, setKey} from "@/_laokey";
import {nanoid} from "nanoid/async";

function Bar() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')
    return <Toolbar>
        <Button variant="contained" color="secondary" size="large" sx={{mr: 2}} onClick={() => setOpen(true)}>
            发帖
        </Button>
        <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
            <Card>
                <CardContent>
                    <TextField multiline fullWidth onChange={event => setValue(event.target.value)}/>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="secondary" size="large" onClick={async () => {
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
                        console.log(await _call('create_topic', {id: await nanoid(), key, value}))
                        setKey(key, JSON.stringify(await crypto.subtle.exportKey('jwk', privateKey)))
                    }}>
                        送出
                    </Button>
                    <Button onClick={() => setOpen(false)}>
                        算了
                    </Button>
                </CardActions>
            </Card>
        </Drawer>
        <Typography variant="h1" sx={{flexGrow: 1}}>
            lao
        </Typography>
        <ButtonGroup variant="outlined" color="inherit" sx={{ml: 2}}>
            <Button onClick={async () => {
                await navigator.clipboard.writeText(exportKeys())
                alert('已复制凭据')
            }}>
                导出
            </Button>
            <Button onClick={() => {
                const result = prompt('请输入凭据')
                if (result !== null) importKeys(result)
            }}>
                并入
            </Button>
            <Button onClick={() => {
                clearKeys()
                alert('已清空凭据')
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
