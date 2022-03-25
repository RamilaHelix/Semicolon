import { Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react';
interface CardComponentProps {
    title: string;
    question: string;
    input: string;
    output: string;
}
const CodingQueCard: React.FC<CardComponentProps> = ({ title, question,
    input, output }) => {
    return <Card
        elevation={5}
        sx={{
            maxHeight: "100%",
            width: "100%",
            height: "100%",
            overflowY: "scroll",
        }}
    >
        <CardHeader title={title} titleTypographyProps={{ "fontWeight": "bold" }} />
        <CardContent>
            {/* <div>{question.replace(/<[^<|>]+?>|&nbsp;|&lt|&gt;|&quot|;|&|\//gi, "")}</div> */}
            <div dangerouslySetInnerHTML={{ __html: question }}></div>
            <Typography
                marginY="0.8rem"
                variant="h5"
                fontWeight={"bold"}
            >
                Examples
            </Typography>
            <CardActions
                sx={{
                    background: "#acacac5e",
                    fontFamily: "'Monaco' 'Menlo' monospace",
                    borderRadius: "5px",
                    letterSpacing: ".3px",
                }}>

                <Typography
                    variant='h6'
                    color={"#676767ed"}
                >
                    Input:&nbsp;
                    <Typography variant='subtitle1' component="span">
                        {
                            input.split('\n').map(inp => {
                                return (
                                    <span key={inp}>{inp}<br /></span>
                                )
                            })
                        }
                    </Typography >
                    <br />
                    Output:&nbsp;
                    <Typography variant="subtitle1" component="span">
                        {
                            output.split('\n').map(out => {
                                return (
                                    <span key={out}>{out}<br /></span>
                                )
                            })
                        }
                    </Typography>
                </Typography>
            </CardActions>
        </CardContent>

    </Card >
}
export default CodingQueCard