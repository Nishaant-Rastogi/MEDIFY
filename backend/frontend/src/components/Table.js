import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({ AcData, AccountNum }) {
    return (
        <>
            {AcData[AccountNum].length === 0 ? <h6>No transactions</h6> :
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" className="TABLE">
                        <TableHead className="WHITE">
                            <TableRow className="WHITE">
                                <TableCell><p className="WHITE">Payment ID</p></TableCell>
                                <TableCell align="right"><p className="WHITE">Date</p></TableCell>
                                <TableCell align="right"><p className="WHITE">Amount</p></TableCell>
                                <TableCell align="right"><p className="WHITE">Status</p></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {AcData[AccountNum].map((row) => (
                                <TableRow
                                    key={row.Payment_ID}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" >
                                        <p className="WHITE"> {row.Payment_ID}</p>
                                    </TableCell>
                                    <TableCell align="right"><p className="WHITE" >{row.Date}</p></TableCell>
                                    <TableCell align="right"><p className="WHITE">{row.Amount}</p></TableCell>
                                    <TableCell align="right"><p className="WHITE">{row.Status}</p></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
        </>
    );
}
