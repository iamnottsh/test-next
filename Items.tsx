import {MutableRefObject, ReactNode, useState} from "react";
import {Button, LinearProgress, Stack} from "@mui/material";

interface ItemsProps {
    upMore: MutableRefObject<(() => void) | undefined>
    downMore: MutableRefObject<(() => void) | undefined>
    onUpMore: () => Promise<void>
    onDownMore: () => Promise<void>
    list: ReactNode[]
}

export default function Items({upMore, downMore, onUpMore, onDownMore, list}: ItemsProps) {
    const [onUp, setOnUp] = useState<boolean>(false)
    const [onDown, setOnDown] = useState<boolean>(false)
    return <Stack spacing={2}>
        {onUp
            ? <LinearProgress/>
            : <Button ref={(ref) => {
                if (ref) upMore.current = () => ref.click()
            }} onClick={() => {
                setOnUp(true)
                onUpMore()
                    .finally(() => {
                        setOnUp(false)
                    })
            }}>
                上边
            </Button>
        }
        {list}
        {onDown
            ? <LinearProgress/>
            : <Button ref={(ref) => {
                if (ref) downMore.current = () => ref.click()
            }} onClick={() => {
                setOnDown(true)
                onDownMore()
                    .finally(() => {
                        setOnDown(false)
                    })
            }} disabled={onDown}>
                下边
            </Button>
        }
    </Stack>
}
