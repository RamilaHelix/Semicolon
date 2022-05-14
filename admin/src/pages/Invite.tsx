import React, { createRef, useEffect, useState } from 'react';
import BasicTable from '../elements/BasicTable';
import CardElement from '../elements/CardElement';
import { Candidate } from "../model/Candidate.model"
import { Box, Button, IconButton, Typography } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import GetAppIcon from '@mui/icons-material/GetApp';
import '../styles/pages/Invite.scss'
import upLoadFile from '../functions/upLoadFile';
import downloadFile from '../functions/downloadFile';
import semicolonApi from '../functions/fetchApi';
import { useUserContext } from '../context/userContext';

function Buttons({ setData, inviteCandidate }) {
    const fileRef = createRef<HTMLInputElement>()

    let parsedData;

    const getData = async (e: any) => {
        parsedData = await upLoadFile(e);
        if (setData) {
            setData(parsedData);
        }
    };
    return (<>
        <Button
            variant="contained"
            size="large"
            onClick={() => downloadFile("candidate", "name,contact,email")}
            sx={{
                width: 226,
                marginLeft: 2,
                height: 50,
                padding: 4,
            }}
        > Download SpreadSheet
        </Button>
        <Button
            variant="contained"
            size="large"
            onClick={() => {
                fileRef.current?.click();
            }}
            sx={{ width: 226, height: 50, margin: "0 5px", padding: 4 }}
        >
            Upload SpreadSheet
        </Button>
        <Box flexBasis={"100%"} height={0} />
        <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ my: 2, height: 50 }}
            onClick={inviteCandidate}
        >
            Invite
        </Button>
        <input
            type="file"
            ref={fileRef}
            hidden
            onChange={getData}
        />
    </>)
}

interface candidate {
    sub_id: string;
    script: string;
    points: number;
    candidate_id: string;
    name: string;
    email: string;
    contact: string;
    pin: string;
    attempted: false,
    contest_id: {
        contest_id: string;
        name: string;
        duration: number;
    }

}
export default function Invite() {
    const userContext = useUserContext();

    useEffect(() => {
        semicolonApi(`candidate/attempted/${userContext.user?.admin_id}`, {}, "GET")
            .then(res => setCandidate(res))
            .catch(err => console.log(err))
    }, [])

    function invite(candiate: Candidate[]) {
        if (candiate.length <= 0) return
        candiate.forEach(candidate => {
            candidate.admin_id = userContext.user?.admin_id;
            candidate.contest_id = userContext.user?.contest_id;
        })

        semicolonApi('candidate/add', { candidates: candiate }, "POST")
            .then(res => { setCandidate([]); console.log(res) })
            .catch(err => console.log(err))
    }

    const [candidate, setCandidate] = useState<candidate[]>([])
    const [inviteCandidate, setInviteCandidate] = useState<Candidate[]>([])

    const deletedCandidates = (id: number | string | undefined) => {
        console.log(id)
        setInviteCandidate([...inviteCandidate.filter((row) => row.email !== id)])
    }

    const modifyData = (value: Candidate[]) => {

        const merged = [...value, ...inviteCandidate ?? []]
        const arry = merged.map((invitecandidate, index) => {
            return { ...invitecandidate, number: index }
        })
        setInviteCandidate(arry);
    }

    function downloadCode(filename: string, text: string) {
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

    return <div className='invite-page'>
        <Typography
            component="h2"
            variant="h4"
            color="primary"
            textAlign='center'
            gutterBottom>
            {userContext.user?.constestName}
        </Typography>
        <Box display={'flex'} justifyContent={'space-around'} className='table-content'>
            <CardElement title={'Invite Candidates'} sx={{ maxWidth: 500 }}
                buttons={<Buttons setData={modifyData}
                    inviteCandidate={() => { invite(inviteCandidate) }} />}
            >
                <BasicTable export={false} height={500}
                    rows={inviteCandidate.map((el: Candidate, index) => (
                        {
                            id: el.email,
                            Name: el.name,
                            Email: el.email,
                        }))}
                    columns={[
                        { field: 'id', flex: 1, hide: true },
                        { field: 'Name', flex: 1 },
                        { field: 'Email', flex: 3, headerAlign: 'center' },
                    ]}
                    deletedId={(id) => deletedCandidates(id)}
                />
            </CardElement>
            {/* <CardElement title={'Submitted Candidates report '}
                subheader={candidate[0]?.contest_id?.name}
                sx={{ maxWidth: 500, }} >
                <BasicTable export={true} height={654}
                    rows={candidate.map((el, index) => (
                        {
                            id: el.sub_id,
                            Name: el.name,
                            Email: el.email,
                            Contact: el.contact,
                            Code: el.script
                        }))}
                    columns={[
                        { field: 'id', flex: 1, hide: true },
                        { field: 'Name', flex: 3 },
                        { field: 'Email', flex: 2, sortable: false, disableColumnMenu: true, headerAlign: 'center' },
                        { field: 'Contact', flex: 2, sortable: false, disableColumnMenu: true, headerAlign: 'center' },
                        {
                            field: 'Code', flex: 1, sortable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center',
                            renderCell: (params: GridRenderCellParams<any>) => (
                                <IconButton color="primary" aria-label="download code"
                                    component="span" onClick={() => downloadCode(params.row.Name, params.value)}>
                                    <GetAppIcon /> </IconButton>)
                        },
                    ]}
                    deletedId={(id) => { }} />
            </CardElement> */}
        </Box>
    </div>
}
