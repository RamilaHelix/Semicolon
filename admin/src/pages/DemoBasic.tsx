import { GridCellParams } from '@mui/x-data-grid';
import React from 'react'
import BasicTable from '../elements/BasicTable';
import { CodingQuestion } from '../model/CodingQuestion.model';

export default function DemoBasic() {
    const [coding, setCoding] = React.useState<CodingQuestion[]>([
        {
            prog_id: "1",
            question: "string",
            title: "string",
            time: 4,
            boilerplateCodeJS: "",
            testCases: [{
                testcase_id: "1",
                hidden: false,
                points: 4,
                output: "5",
                input: `10 5
                    1 0 1 0 1
                    0 0 1 0 0
                    0 0 1 1 0
                    0 1 0 1 0
                    1 1 1 0 0
                    0 0 0 0 1                   
                    0 1 0 1 0                    
                    0 0 1 1 0                    
                    0 0 0 1 1                    
                    1 1 0 0 0`
            },
            {
                output: "5",
                points: 4,
                testcase_id: "2",
                hidden: false,
                input: `10 5
                    1 0 1 0 1
                    0 0 1 0 0
                    0 0 1 1 0
                    0 1 0 1 0
                    1 1 1 0 0
                    0 0 0 0 1                   
                    0 1 0 1 0                    
                    0 0 1 1 0                    
                    0 0 0 1 1                    
                    1 1 0 0 0`
            }
            ],
        }
    ]);
    const deletedCodingQuestion = (id: number | string | undefined) => {
        setCoding([...coding.filter((question) => question.prog_id !== id)]);
    };



    return (
        <BasicTable export={false}
            rows={coding.map(
                (el: CodingQuestion, index) => (
                    (el.prog_id = index.toString()),
                    //(img = el.question.includes("figure")),
                    {
                        id: index.toString(),
                        Question$: el.question,
                        TestCase: el.testCases, //sequence is important here 
                        Question: el.question?.replace(/<[^<|>]+?>|&nbsp;|&lt|&gt;|&quot|;|&|#39|\//gi, ""),
                        Duration: el.time + " mins",
                    }
                )
            )}
            columns={[
                { field: "id", flex: 1, hide: true },
                {
                    field: "Question",
                    flex: 2,
                    cellClassName: (params: GridCellParams<number>) => {
                        if (params.row.Question$.includes("img")) {
                            return "img-icon";
                        }
                        return "";
                    },
                },
                {
                    field: "Duration",
                    flex: 1,
                    sortable: false,
                    headerAlign: "center",
                    align: "center",
                },
            ]}
            deletedId={deletedCodingQuestion}
        />)
}
