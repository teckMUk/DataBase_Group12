import React,{useMemo} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import {useTable } from 'react-table';
import {fetchAllEmployee,fetchDishIds} from '../../Services_API/api';
import {useNavigate} from 'react-router-dom';
import COLUMNS from './columns.js'

export const BasicTable = ()=>{
    const columns = useMemo(()=>COLUMNS,[]);
    const data = useMemo(()=>fetchAllEmployee(),[]);
    const tableInstance = useTable({
        columns,
        data
    });
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance  
    return(
         <table {...getTableProps()}>
             <thead>
                 <tr>
                    <th></th>
                 </tr>
             </thead>
             <tbody>
                 <tr>
                    <td></td>
                 </tr>
             </tbody>
         </table>
    )
}