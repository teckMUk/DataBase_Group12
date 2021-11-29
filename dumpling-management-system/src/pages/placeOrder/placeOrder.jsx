import "./placeOrder.css";

import React from "react";

import Nav from '../../components/nav/nav';

import {Container, Button,Form} from 'react-bootstrap';

import {placeOrder} from  '../../Services_API/api.js';


import {useNavigate} from 'react-router-dom';

import Dropdown from '../../components/dropdown/dropdown';







export default class DynamicTable extends React.Component {

    constructor(props) {

      super(props);

 

      this.state = {

        message: "",

        typeOfOrder: "",

        orderStatus: "placed",

        totalBill:0,

        items: [],

       

      }

    }

 

   

    handleClick(e) {

        e.preventDefault();

        var items = this.state.items;

        console.log(items);

     

        items.push(Number(this.state.message));

     

        this.setState({

          items: items

        });

      }

 

      handleItemDelete(i,event) {

          event.preventDefault();

        var items = this.state.items;

     

        items.splice(i, 1);

     

        this.setState({

          items: items

        });

      }

     onValueChange(event)

     {

        event.preventDefault();

         console.log(event);

         this.setState(

             {

                typeOfOrder:event.target.value

             }

         )

     }

 

      handleSubmit(e){

          e.preventDefault();

          let listOrders = {

              "dishIds":this.state.items

          }

          console.log(this.state);

          placeOrder(this.state.typeOfOrder, this.state.orderStatus, this.state.totalBill,listOrders).then((response)=>{

 

 

 

            if(response.data.isSuccessful)

 

            {

 

                alert(response.data.message);

 

                //navigate('/dashboard');

 

            }

 

            else{

 

                alert(response.data.message);

 

                //navigate('/dashboard');

 

            }

 

    });

 

      }

 

      renderRows() {

        var context = this;

     

        return this.state.items.map(function(o, i) {

            // console.log(o);

                  return (

                    <tr key={"item-" + i}>

                      <input

                        type="text"

                        value={o}

                        onChange={context.handleItemChanged.bind(context, i)}

                    />

                      <td>

                        <Button onClick={context.handleItemDelete.bind(context, i)}>

                          Delete

                        </Button>

                      </td>

                    </tr>

                  );

                });

      }




    updateMessage(event) {

        this.setState({

          message: event.target.value

        });

        // console.log(this);

      }

 

      handleItemChanged(i, event) {

        var items = this.state.items;

        // console.log(items);

        items[i] = event.target.value;

     

        this.setState({

          items: items

        });

      }





 

    render() {

      return (

        <Form>

        <Container id="main-container" className="d-grid h-100">

        <div>

        <h1> Place Orders </h1>

        <input type="text" onChange={this.updateMessage.bind(this)} />

      <Button onClick={this.handleClick.bind(this)}>

        Add Item

      </Button>

      <table>

        <thead>

          <tr>

            <th>Item</th>

          </tr>

        </thead>

        <tbody>

        {this.renderRows()}

        <div onChange={this.onValueChange.bind(this)}>  

            <input type="radio" value="DineIn" name="typeOfOrder" /> Dine In

            <input type="radio" value="TakeAway" name="typeOfOrder" /> Takaway

        </div>

        </tbody>

        <Button variant="primary" type="submit" onClick={this.handleSubmit.bind(this)}>

 

            Place Order

 

        </Button>

      </table>

      <hr/>

     

    </div>

    </Container>

    </Form>

      );

    }

  }