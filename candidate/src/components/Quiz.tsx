import { Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { CSSProperties, useEffect } from 'react';
interface QuizProps {
    data: { question: string, a: string, b: string, c: string, d: string, choice: string, disabled: boolean }
    sx: CSSProperties[],
    sendAnd: (ans: string) => void
}

interface Question {
    question: string,
    options: (string | undefined)[],
    value: string[]
}
const Quiz: React.FC<QuizProps> = (props) => {
    const { data } = props;
    const [choice, setChoice] = React.useState(props.data?.choice ?? '')
    const [disabled, setDisabled] = React.useState(props.data?.disabled)

    useEffect(() => {
        setChoice(props.data?.choice ?? '')
    }, [props.data])


    useEffect(() => {
        setDisabled(props.data?.disabled)
    }, [props.data?.disabled])

    if (!data)
        return (<></>)
    const question: Question = {
        question: data.question,
        options: [data.a, data.b, data.c, data.d],
        value: ["a", "b", "c", "d"]
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setChoice(value)
        props.sendAnd(value)
    }

    return (
        <Card elevation={0}
            sx={[{
                //boxShadow: "1px 1px 2px 2px #888888 ",
                height: "100%", maxWidth: '74rem',
                border: "none"
                //height: "29rem", width: '84rem'
            }, ...props.sx]}
        >
            <CardContent sx={{ padding: '2rem' }}>
                <Typography
                    variant="h5"
                    // fontWeight={600}
                    fontFamily={"Roboto"}
                    color={"#676767"}
                    lineHeight="33px"
                >
                    {question.question}
                </Typography>
                <FormControl sx={{ marginLeft: "2rem", marginTop: "2rem" }}>
                    <RadioGroup name="radio-options"
                        value={choice}
                        onChange={onChangeHandler}
                    >
                        {question.options.map((opt, i) =>
                            <FormControlLabel
                                key={opt}
                                label={opt}
                                value={question.value[i]}
                                disabled={disabled}
                                control={<Radio />} />)}
                    </RadioGroup>
                </FormControl>
            </CardContent >
        </Card >)
}

export default Quiz