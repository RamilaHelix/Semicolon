import React, { useEffect, useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { useUserContext } from '../context/userContext';
import BasicTable from '../elements/BasicTable';
import CardElement from '../elements/CardElement';
import { Candidate } from '../model/Candidate.model';
import GetAppIcon from '@mui/icons-material/GetApp';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import semicolonApi from '../functions/fetchApi';
//const res = require('../Res/submitted.json')

interface CandidateResponse {
  candidate_id: string,
  script: string,
  points: number,
  score: number,
  name: string,
  email: string,
  contact: string,
  contestName: string,
  scriptDownloadDone: boolean
}

export default function AdminPanel() {

  const [candidate, setCandidates] = React.useState<any[]>([])
  const candidates: CandidateResponse[] = [];
  const { user } = useUserContext();
  let data: any[] = [];

  React.useEffect(() => {
    let candidatesSession = (localStorage.getItem('admin'))

    if (candidatesSession && candidatesSession.length > 0) {
      setCandidates(JSON.parse(candidatesSession))
      return
    }


    semicolonApi(`auth/attempted/${user?.contest_id}`, {}, "GET")
      .then(res => {
        data = res

        const mcqs = data[0].mcqs;
        const progs = data[0].progs;

        mcqs.forEach(mcq => {
          let index = -1
          const obj = candidates.find(x => x.candidate_id === mcq.candidate_id.candidate_id)
          if (obj)
            index = candidates.indexOf(obj);

          if (index > -1) {
            candidates[index].score = mcq.is_right ? candidates[index].score += 1 : candidates[index].score += 0
          }
          else {
            const { candidate_id, name, email, contact } = mcq.candidate_id;
            const contestName = mcq.candidate_id.contest_id.name
            candidates.push({
              candidate_id, name, email, contact, contestName, score: mcq.is_right ? 1 : 0,
              script: '', points: -1, scriptDownloadDone: false
            })
          }
        })

        if (mcqs.length <= 0) {
          progs.forEach(prog => {
            const { candidate_id, name, email, contact } = prog.candidate_id;
            const contestName = prog.candidate_id.contest_id.name;
            const { script, points } = prog;
            candidates.push({
              candidate_id, name, email, contact, contestName, score: - 1,
              script, points, scriptDownloadDone: false
            })
          })
        }
        else
          progs.forEach(prog => {
            const obj = candidates.find(x => x.candidate_id === prog.candidate_id.candidate_id)
            let index = -1
            if (obj)
              index = candidates.indexOf(obj);
            if (index < 0) return
            candidates[index].script = prog.script;
            candidates[index].points = prog.points;
          })

        setCandidates(candidates)
      })
      .catch(err => console.log(err))

    return () => {
      setCandidates([])
    }
  }, [])


  function downloadCode(filename: string, text: string) {
    if (text === '') { console.log(text); return }
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function filterCandidates(email) {
    const obj = candidate.find(x => x.email === email)
    obj.scriptDownloadDone = true;
    setCandidates(ele => ([
      ...ele.map(e => e.email === email ? obj : e)
    ]))

  }

  useEffect(() => {
    if (localStorage.getItem('admin'))
      localStorage.setItem("admin", JSON.stringify(candidate))
  }, [candidate])
  return (
    <div>
      <Typography variant="h4" gutterBottom
        color="primary" textAlign='center'
      >
        {candidate[0]?.contestName ?? ' Contest Name'}
      </Typography>


      <Box display={'flex'} justifyContent={'space-around'} >
        <CardElement title={`Reports for ${candidate[0]?.contestName ?? 'Contest'}`}
          sx={{ minWidth: 900 }}
        >
          <BasicTable export={true} height={500}
            rows={candidate.map((el) => (
              {
                id: el.email,
                Name: el.name,
                Email: el.email,
                Score: el.score,
                Points: el.points,
                Code: el.script,
                ScriptDownloadDone: el.scriptDownloadDone
              }))}
            columns={[
              { field: 'id', flex: 1, hide: true },
              { field: 'scriptDownloadDone', flex: 1, hide: true },
              { field: 'Name', flex: 1 },
              { field: 'Email', flex: 2, headerAlign: 'center', align: "center" },
              { field: 'Score', flex: 1, headerAlign: 'center', align: "center", headerName: "Score" },
              { field: 'Points', flex: 1, headerAlign: 'center', align: "center" },
              {
                field: 'Code', flex: 1, sortable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center',
                renderCell: (params: GridRenderCellParams<any>) => (
                  params.value ?
                    params.row.ScriptDownloadDone ?
                      <IconButton color="primary" aria-label="download done"
                        component="span">
                        <DownloadDoneIcon />
                      </IconButton> :
                      <IconButton color="primary" aria-label="download code"
                        component="span" onClick={() => {
                          downloadCode(params.row.Name, params.value)
                          params.row.ScriptDownloadDone = true
                          filterCandidates(params.row.Email)
                        }}>
                        <GetAppIcon />
                      </IconButton>
                    : <HorizontalRuleIcon />
                )
              },
            ]}
          />
        </CardElement>
      </Box>
    </div>
  )
}
/**
 *  useEffect(() => {
    // semicolonApi(`candidate/attempted/${user?.admin_id}`, {}, "GET")
    //   .then(res => setCandidate(res))
    //   .catch(err => console.log(err))
    const PorgREs: CandidateResponse = data[0].progs.map(prog =>
    ({
      candidate_id: prog.candidate_id.candidate_id,
      name: prog.candidate_id.name,
      email: prog.candidate_id.email,
      contact: prog.candidate_id.contact,
      contestName: prog.candidate_id.contest_id.name,
      Score: 0,
      points: prog.points,
      script: prog.script
    }))

    const McqREs: CandidateResponse = data[0].mcqs.map(mcq => {

      return {
        candidate_id: mcq.candidate_id.candidate_id,
        name: mcq.candidate_id.name,
        email: mcq.candidate_id.email,
        contact: mcq.candidate_id.contact,
        contestName: mcq.candidate_id.contest_id.name,
        Score: 0,
        points: 0,
        script: ""
      }
    })


  }, [])
 */