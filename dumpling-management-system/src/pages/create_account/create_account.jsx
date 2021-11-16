import "./create_account.css";
import React from "react";
import Nav from '../../components/nav/nav';
import RegForm from '../../components/register_form/register_form';
//import { Search, Person, Chat, Notifications} from "@material-ui/icons";



export default function Create_account()
{
    return(
        
            <div>
                <> 
                 <Nav/>
                 <div className = 'heading'>
                 <h1> Create Employee Account</h1>
                 </div>
                 <div className= 'reg-mid'>
                    
                    <RegForm/>

                 </div>
                </>

            </div>   
    )
}
