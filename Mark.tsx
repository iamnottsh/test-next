import {Grid, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import {marked} from "marked";
import React, {useState} from "react";

export default function Mark(props: TextFieldProps & { defaultShow: "编辑" | "渲染" | "对比" }) {
    const [show, setShow] = useState(props.defaultShow)
    return <Grid container columns={22}>
        <Grid xs={show === '编辑' ? 20 : show === '渲染' ? 0 : 10}>
            {show !== '渲染' &&
                <TextField minRows={6} multiline fullWidth {...props}/>
            }
        </Grid>
        <Grid xs={show === '渲染' ? 20 : show === '编辑' ? 0 : 10}>
            {show !== '编辑' &&
                <iframe srcDoc={marked(props.value as string)} sandbox="" width="100%" height="100%"/>
            }
        </Grid>
        <Grid xs={1}>
            <ToggleButtonGroup value={show} exclusive orientation="vertical" onChange={(_, value) => setShow(value)}>
                <ToggleButton value="编辑">编</ToggleButton>
                <ToggleButton value="渲染">渲</ToggleButton>
                <ToggleButton value="对比">比</ToggleButton>
            </ToggleButtonGroup>
        </Grid>
    </Grid>
}
