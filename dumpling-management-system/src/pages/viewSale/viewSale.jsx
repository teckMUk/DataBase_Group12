import React from 'react';
import SaleTable from '../../components/saleTable/saleTable';
import Nav2 from '../../components/nav/nav';
import { useState, useEffect } from "react";
import { Container, Dropdown, Form, Button} from 'react-bootstrap';
//import { Button, FormGroup, Label, Input, FormText } from 'reactstrap';
import {getSales, getSalesDaily} from  '../../Services_API/api.js';

const initialState = {
    saleType: "",
    month:"",
    year:"",
    isTable: "",
    sales:""
};
export default function Sale()
{
   
    const [newEmploye, setNewEmploye] = useState(initialState);
    
    useEffect(() => {}, [newEmploye]);
    let check = 0;
  
    const handle = (e)=>
    {   
        const {name, value} = e.target;
        
        setNewEmploye({...newEmploye, [name]: value});
    }   

    const checkHandle = () => {
        if(newEmploye.saleType=== "yearly")
        {
            check = 1;
            console.log('check 1', check);
        }
        else if(newEmploye.saleType === "monthly")
        {
            check = 2;
            console.log('check 2', check);
        }  
        return check;
    }

    const retMonth = () => {
        return  <div>
        <Dropdown>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
            Choose Month
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
            <Dropdown.Item as="button" onClick= {handle} name= "month" value = "1" active>January</Dropdown.Item>
            <Dropdown.Item as="button" onClick= {handle} name= "month" value = "2" active>February</Dropdown.Item>
            <Dropdown.Item as="button" onClick= {handle} name= "month" value = "3" active>March</Dropdown.Item>
            <Dropdown.Item as="button" onClick= {handle} name= "month" value = "4" active>April</Dropdown.Item>
            <Dropdown.Item as="button" onClick= {handle} name= "month" value = "5" active>May</Dropdown.Item>
            <Dropdown.Item as="button" onClick= {handle} name= "month" value = "6" active>June</Dropdown.Item>
            <Dropdown.Item as="button" onClick= {handle} name= "month" value = "7" active>July</Dropdown.Item>
            <Dropdown.Item as="button" onClick= {handle} name= "month" value = "8" active>August</Dropdown.Item>
            <Dropdown.Item as="button" onClick= {handle} name= "month" value = "9" active>September</Dropdown.Item>
            <Dropdown.Item as="button" onClick= {handle} name= "month" value = "10" active>October</Dropdown.Item>
            <Dropdown.Item as="button" onClick= {handle} name= "month" value = "11" active>November</Dropdown.Item>
            <Dropdown.Item as="button" onClick= {handle} name= "month" value = "12" active>December</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </div>
    }

    const retYear = () =>
    {
        return <div>
           
            <Container id="main-container" className="d-grid h-100">
                <Form className= 'text-center'>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Enter Year</Form.Label>
                        <Form.Control type="text" placeholder="Enter Year" name ="year"
                        value = {newEmploye.year} onChange = {handle}/>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    }

    const getAllSales = () =>
    {
        let month = Number(newEmploye.month);
        let year = Number(newEmploye.year);
        // let month = newEmploye.month;
        // let year = newEmploye.year;
        if(year !== undefined)
        {
            getSales(year, month).then((response)=>{
                    console.log(response.data.result);
                    if(response.data.isSuccessful)
                    {
                        
                        setNewEmploye({...newEmploye, isTable: "1", sales: response.data.result});
                        alert(response.data.message);
                    }
                    else{
                        console.log('sale is 1', response.data.message);
                        alert(response.data.message);
                        setNewEmploye({...newEmploye, isTable: "0"});       
                    }
            }); 
        }
    }

    const getDailySales = () =>
    {
        
        getSalesDaily().then((response)=>{
                console.log(response.data.result);
                if(response.data.isSuccessful)
                {
                    setNewEmploye({...newEmploye, isTable: "1", sales: response.data.result});
                    alert(response.data.message);
                }
                else{
                    //console.log('sale is 1', response.data.message);
                    alert(response.data.message);
                    setNewEmploye({...newEmploye, isTable: "0"});       
                }
        }); 
    
    }


    console.log('sale is 1', newEmploye.sales);
    console.log(newEmploye);
    return (
        <>
            <div>
                <div>
                    <Nav2/>
                </div>
            
                <div onChange={handle}>  
                    <h1>Select The Sale Type</h1>
                    <p><input type="radio" name = "saleType" value="yearly"/>Yearly Sales</p>
                    <p><input type="radio" name = "saleType" value="monthly"/>Monthly Sales</p>
                    <p><input type="radio" name = "saleType" value="daily"/>Today's Sales</p>
                </div>

                {(checkHandle()=== 1)&& retYear()}
                {(checkHandle()=== 2)&& <div> {retMonth()} <br></br> {retYear()}</div>}

                <Button onClick = {newEmploye.saleType !== "daily"?() => getAllSales(): () => {getDailySales()}}>Done</Button>

                
                {(newEmploye.isTable === "1") &&
                    <div>
                    <SaleTable saleData = {newEmploye.sales}/></div>}
                    
                {(newEmploye.isTable === "0") && <div> <br></br><h4>No sales in this period</h4></div>}
           
            </div>
        </>
    )
}