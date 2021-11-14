import "./dashboard.css";
import Nav from '../../components/nav/nav';
import {Link} from 'react-router-dom';


export default function Home()
{
    return(
       
        <div>
          <Nav/>
          <button><Link to = '/create_account'>Create Account</Link></button>
        </div>
   
    )
}