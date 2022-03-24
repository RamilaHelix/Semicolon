import React, { useEffect, useState } from "react";
import { Card, Button, CardContent } from "@mui/material";
import "../styles/components/QueTable.scss";
interface ClickProps {
  sendIndex: (index: number) => void,
  disableChips: boolean,
  mcqs: any[],
}

const ClickableChips: React.FC<ClickProps> = ({ sendIndex, disableChips, mcqs }) => {
  const [question, setQuestion] = useState(mcqs);
  useEffect(() => {
    setQuestion(mcqs)
  }, [mcqs])


  const handleClick = (index: number) => {
    sendIndex(index)
  };

  return (
    <Card className="Que-table" sx={{ boxShadow: "1px 1px 2px 2px #888888 " }}>
      <CardContent>
        {question.map((que, index) => {
          return (
            <Button className="chip"
              key={index}
              variant="contained"
              size="small"
              color={que.choice != '' ? "info" : "warning"}
              onClick={() => { handleClick(index) }}
              disabled={disableChips}
            >
              {index + 1}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ClickableChips;
