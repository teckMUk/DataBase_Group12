import "./remoceMenuItem.css";
import React from "react";
import Nav from '../../components/nav/nav';

export default class MenuTable extends React.Component {
    constructor(props) {

        super(props);
  
   
  
        this.state = {
  
          data:[]
         
  
        }
  
      }


      componentDidMount()
      {
        fetchDishIds().then((response)=>{

            if(response.data.isSuccessful)
    
            {
    
                this.setState({

                    data: response.data.result
          
                  });
    
            }
    
        });
      }


      renderRows() {
          
        return(
        <div>
            {this.state.data.map(function(o,i) => {
                return(
                    <tr>
                        <h2> {dishInfo.dishName} </h2>
                        <td>

                            <Button onClick={context.handleItemDelete.bind(context, i)}>

                            Delete

                            </Button>

                        </td>
                    </tr>

                );

            }
            )
            }




        </div>
        );

      }


  
}



