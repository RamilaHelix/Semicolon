import { Box, Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
import QueTable from "../components/QueTable";
import BlueButton from "../elements/BlueButton";
import { CodingQuestion } from "../model/CodingQuestion.model";
import { Mcq } from "../model/McqQuestion.model";
import "../styles/pages/MenuPage.scss";
import { Link } from 'react-router-dom';
interface menuProps {
  programmingQuestion: CodingQuestion[],
  mcqs: Mcq[],
}


const MenuPage: React.FC<menuProps> = ({ programmingQuestion, mcqs }) => {

  return (
    <>
      <Box className="menu-page"
        marginX={"2rem"}
        display={"flex"}
        paddingTop={'10rem'}
        justifyContent={"space-around"}
        sx={{
          '& .helix-timer': {
            top: '3rem'
          }
        }}
      >

        <Card sx={{ maxHeight: "50%", width: "50%", marginRight: "1.8rem" }}>
          <CardHeader
            title="Multiple Choice Question's"
            sx={{ textAlign: "center" }}
          />
          <CardContent>
            <div className="MenuPage-Table">
              <QueTable
                disableChips={true}
                mcqs={mcqs}
                sendIndex={undefined} />
            </div>
          </CardContent>
        </Card>
        <Card sx={{ maxHeight: "50%", width: "50%" }}>
          <CardHeader title="Coding Question's" sx={{ textAlign: "center" }} />
          <CardContent>
            {programmingQuestion.map((ques) =>
              (<li key={ques.title}>{ques.title}</li>))}
          </CardContent>
        </Card>
      </Box>
      <Box display={"flex"} justifyContent={"space-around"}>
        <Link to="/mcqs" >
          <BlueButton>Solve MCQ's</BlueButton>
        </Link>
        <Link to="/program" >
          <BlueButton>Solve Coding</BlueButton>
        </Link>
      </Box>

    </>
  );
};
export default MenuPage;
