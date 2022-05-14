import * as React from 'react';
import { DataGrid, DataGridProps, GridActionsCellItem, GridColumns, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Paper, Popover } from '@mui/material';
import styled from "@emotion/styled";
import { TestCases } from '../model/CodingQuestion.model';

interface BasicTableProps extends DataGridProps {
    rows: any[],
    columns: GridColumns,
    export: boolean,
    height?: number,
    previewColumns?: 'all' | {}
    deletedId?: (id: number | string | undefined) => void,
}

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const Div = styled.div`
    padding: 0.6rem;
    margin: -1rem;
    >*{
        margin:0;
    }
    img{
        max-width: 58% !important;
}`;
function DataTable({ data }) {
    const keys: string[] = data[0] && Object.keys(data[0])
    keys.shift()
    //const columns = keys //.filter((key: string) => !key.includes('id'))

    return (
        <table style={{ borderCollapse: 'collapse' }} data-border={1}>
            <thead >
                <tr>
                    {data[0] && keys.map((heading: string) => <th style={{ padding: '0 3px' }} key={heading}>{heading.toUpperCase()}</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    data.map(row =>
                        <tr key={row.testcase_id} style={{ borderBottom: '2px solid black' }}>{
                            keys.map(column => <td key={column} style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{row[column].toString() ?? '-'}</td>)
                        }
                        </tr>)
                }
            </tbody>
        </table >
    )
}

const BasicTable: React.FC<BasicTableProps> = (props) => {

    //const rows1 = rows.map(row => { return { ...row, delete: '❌' } })
    const [rows, setRows] = React.useState(props.rows);
    const [poperData, setPoperData] = React.useState<any>(null);
    const anchorEl = React.useRef<HTMLDivElement>(null);
    const [PopoveranchorEl, setPopoverAnchorEl] = React.useState<null | HTMLElement>(null);
    const Oldkeys: string[] = Object.keys(props.rows[0] ?? '')
    // if (props.previewColumns) {
    //     Oldkeys = Object.keys(props.previewColumns ?? '')
    //     console.log(Oldkeys)
    // }
    let len: number = 0;
    const keys = Oldkeys.filter((key: string) => /*!key.includes('$') && */ !key.includes('id'))

    let ignoredKey: string;

    const handlePreview = (row: any, anchorEl: React.RefObject<HTMLDivElement>, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        keys.map(key => { if (len < row[key]?.length) { len = row[key].length } })

        setPoperData(row);
        setPopoverAnchorEl(anchorEl.current);
        let x = event.pageX;
        let y = event.pageY

        if (anchorEl.current) {
            anchorEl.current.style.position = 'absolute';
            anchorEl.current.style.left = ((x - len)) + 'px';
            anchorEl.current.style.top = (y + 12) + 'px';
        }

    }
    const handleDeleteRow = (id: number | string) => {
        setRows([...rows.filter((row: any) => row.id !== id)])
        if (props.deletedId)
            props.deletedId(id)
    }

    React.useEffect(() => {
        //if (props.rows.length > 0)
        setRows(props.rows)
    }, [props.rows])


    const columns: GridColumns = [
        ...props.columns,
        {
            field: 'preview', headerName: 'Preview', //flex: 1,
            hide: props.export,
            type: 'actions', cellClassName: 'actions',

            getActions: (param: any) => {
                const { row } = param;
                return [
                    <GridActionsCellItem
                        icon={<RemoveRedEyeIcon />}
                        label="Preview"
                        className="textPrimary"
                        onClick={(event) => handlePreview(row, anchorEl, event)}
                        color="inherit"
                    />
                ]
            }
        },
        {
            field: 'delete', headerName: 'Delete', //flex: 1, 
            hide: props.export,
            type: 'actions', cellClassName: 'actions',
            getActions: (param: any) => {
                const { id } = param;
                return [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleDeleteRow(id)}
                        color="primary"
                    />
                ]
            }
        },
    ]
    let height = props.export ? ((rows.length > 0 ? rows.length : 1) * 52.6) + 56 + 37 : ((rows.length > 0 ? rows.length : 1) * 52.3) + 56
    return (
        <div className='data-table' style={{ height: props.height ?? height, width: '100%', maxHeight: "29rem" }}>
            <DataGrid
                sx={{
                    '.MuiDataGrid-virtualScroller': { overflowX: 'hidden' }
                }}
                {...props}
                hideFooter
                rows={rows}
                columns={columns}
                components={props.export ? {
                    Toolbar: CustomToolbar,
                } : undefined}
            />
            <div ref={anchorEl} style={{ height: 0 }} />
            <Popover
                open={poperData !== null}
                anchorEl={PopoveranchorEl}
                onClose={() => setPoperData(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Paper sx={{ padding: '1rem', lineHeight: 3 }} elevation={1}>
                    {
                        keys.map((key: string) => {
                            if (key.includes('$')) {
                                ignoredKey = key;
                                return <Div key={key} className='editor' dangerouslySetInnerHTML={{ __html: poperData && poperData[key] }} />
                            }
                            if (ignoredKey !== undefined && key.search(ignoredKey) === 0) { return }
                            if (poperData && typeof poperData[key] === 'object') {
                                height = ((poperData[key].length > 0 ? poperData[key].length : 1) * 52.3) + 56
                                // return <DataGrid hideFooter key='Objects'
                                //     rows={poperData[key].map((k: TestCases, i) => ({
                                //         id: k.testcase_id,
                                //         input: k.input,
                                //         output: k.output
                                //     }))}
                                //     sx={{ height: { height }, minWidth: '11rem' }}
                                //     columns={[{ field: 'id', hide: true, }, { field: 'input', flex: 3 }, { field: 'output', flex: 3 }]} />
                                return <DataTable key='Objects' data={poperData[key]} />
                            }
                            if (key === 'JavaScript') {
                                return <pre key={key} > {poperData && poperData[key]}</pre>
                            }
                            return (<li style={{ listStyle: "none" }} key={key}> {key} <span style={{ color: "red", fontWeight: 900 }}>:</span> {poperData && poperData[key]}</li>)
                        })
                    }
                </Paper>
            </Popover>
        </div>
    );
}
export default BasicTable;