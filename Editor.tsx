import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Drawer,
    Grid,
    LinearProgress,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import _limit from "@/_limit";
import {marked} from "marked";
import xss from "xss";

interface EditorProps {
    title: string
    emit: (value: string) => Promise<void>
}

export default function Editor({title, emit}: EditorProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const [sending, setSending] = useState<boolean>(false)
    const [show, setShow] = useState<'编辑' | '渲染' | '比较'>('比较')
    return <>
        <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => setOpen(true)}
        >
            {title}
        </Button>
        <Drawer anchor="bottom" open={open} onClose={() => {
            setOpen(false)
        }} keepMounted>
            <Container>
                <Card elevation={10} sx={{mt: 8, mb: 8}}>
                    <CardHeader title={<Box display="flex" alignItems="center">
                        <Button onClick={() => setOpen(false)}>关闭</Button>
                        <Typography variant="h2" sx={{ml: 2, flexGrow: 1}}>{title}</Typography>
                        <ToggleButtonGroup value={show} exclusive onChange={(_, value) => setShow(value)}>
                            <ToggleButton value="编辑">编辑</ToggleButton>
                            <ToggleButton value="渲染">渲染</ToggleButton>
                            <ToggleButton value="比较">比较</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>}/>
                    <CardContent>
                        <Grid container maxHeight="50vh" overflow="scroll" columnSpacing={2}>
                            <Grid item xs={show === '编辑' ? 12 : show === '渲染' ? 0 : 6}>
                                {show !== '渲染' &&
                                    <TextField
                                        minRows={8}
                                        multiline
                                        fullWidth
                                        value={value}
                                        onChange={event => setValue(event.target.value)}
                                        helperText={`${value.length}/${_limit}`}
                                        placeholder="支持markdown格式"
                                    />
                                }
                            </Grid>
                            <Grid item xs={show === '渲染' ? 12 : show === '编辑' ? 0 : 6}>
                                {show !== '编辑' &&
                                    <Box dangerouslySetInnerHTML={{__html: xss(marked(value))}}/>
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                    {sending ? <LinearProgress/> :
                        <CardActions>
                            <Button variant="contained" color="secondary" size="large" onClick={() => {
                                if (value.length > _limit) {
                                    alert(`不能多于${_limit}个字！`)
                                }
                                setSending(true)
                                emit(value)
                                    .then(() => {
                                        setValue('')
                                        setOpen(false)
                                    })
                                    .finally(() => {
                                        setSending(false)
                                    })
                            }}>
                                钦此
                            </Button>
                        </CardActions>}
                </Card>
            </Container>
        </Drawer>
    </>
}
