import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React, { createRef } from 'react';
import BasicTable from '../elements/BasicTable';
import { Add } from '@mui/icons-material';
import downloadFile from '../functions/downloadFile'
import upLoadFile from '../functions/upLoadFile';
import { Mcq } from '../model/McqQuestion.model';

export default function AddMcqs(props) {

    const [open, setOpen] = React.useState(false);
    const [temp, setTemp] = React.useState<Mcq[]>([]);

    const updatedMcqs = (id: number | string | undefined) => {
        setTemp([...temp.filter((t: Mcq) => t.mcq_id !== id)])
    }

    const handleMcq = async (e: any) => {
        let fileData = await upLoadFile(e);
        setTemp([...fileData])
    }

    const fileRef = createRef<HTMLInputElement>()

    const handleAdd = () => {
        props.addMCQ(temp)
        setOpen(false);
        setTemp([])
    }
    return <>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton size="large" onClick={() => setOpen(true)}>
                <Add fontSize="large" color='primary' />
            </IconButton>
        </Box>

        <Dialog open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="Dialog-Dialog-title"
            aria-describedby="Dialog-Dialog-description"
            fullWidth
            maxWidth="lg"
        >
            <DialogContent>
                <DialogTitle>Add Question</DialogTitle>
                <Box>
                    <BasicTable export={false}
                        rows={temp.map((el: Mcq, index) => (
                            el.mcq_id = index.toString(),
                            {
                                id: index.toString(),
                                Question: el.question,
                                A: el.a,
                                B: el.b,
                                C: el.c,
                                D: el.d,
                                Correct: el.answer,
                            }))
                        }
                        columns={[
                            { field: 'id', flex: 1, hide: true },
                            { field: 'Question', flex: 3 },
                            { field: 'A', flex: 1, disableColumnMenu: true, },
                            { field: 'B', flex: 1, disableColumnMenu: true, },
                            { field: 'C', flex: 1, disableColumnMenu: true, },
                            { field: 'D', flex: 1, disableColumnMenu: true, },
                            {
                                field: 'Correct', flex: 1, sortable: false,
                                headerAlign: "center", disableColumnMenu: true,
                                align: "center",
                            },

                        ]}
                        deletedId={updatedMcqs}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button component="a" onClick={() => downloadFile('sample', 'question,a,b,c,d,answer,points,question_number')}>Sample</Button>
                <Button onClick={() => fileRef.current?.click()} disabled={temp.length > 0 ? true : false}>Upload</Button>
                <Button onClick={handleAdd} disabled={temp.length > 0 ? false : true}>Add</Button>
                <Button onClick={() => { setOpen(false); setTemp([]) }}>Close</Button>
                <input type='file' ref={fileRef} hidden onChange={handleMcq}></input>
            </DialogActions>
        </Dialog>
    </>
}

/*   const handleMcq = async (e: any) => 
 const keys: string[] = [];
          const arr: any[] = [];
  
          Papa.parse(e.target.files[0], {
              complete: function (results) {
  
                  (results.data[0] as Array<string>).map(key => {
                      keys.push(key);
                  })
  
                  for (let i = 1; i < results.data.length; i++) {
                      let field: { [key: string]: any } = [];
                      (results.data[i] as Array<string>).map((data, index) => {
                          if (data !== null)
                              field[keys[index]] = data;
                      })
                      arr.push(field)
                  }
                  arr.pop()
                  setTemp([...arr])
              }
})*/
/* function handelDownload() {
        const blob = new Blob(['question,option1,option2,option3,option4,answer'])
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'sample.csv';
        a.click();
} */