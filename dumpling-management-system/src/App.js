
import './App.css';
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import Form2 from "./components/allForms/allForms";
import Email from "./components/email/email";
import Questions from './components/questions/questions';
import CreateAccount from "./pages/create_account/create_account";
import  BasicTable from './components/basicTable/basicTable.jsx';
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import ResetPw from "./components/resetpw/resetpw";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddToMenu from "./pages/addMenuItem/addMenuItem";
import UpdateDelEmp from "./pages/updateDelEmp/updateDelEmp";
import DynamicTable from "./pages/placeOrder/placeOrder";
import  BonusTable from './components/bonusTable/bonusTable.jsx';
import ViewOrders from './components/viewOrders/viewOrders.jsx';
import Table3 from "./components/removeMenu/removeMenu";
import Table4 from "./components/PlaceOrder/PlaceOrder";

const App = () => {
  
  return (
    <Router>
    <div className="App">
      <Routes> 
      <Route path='/' element={<Login/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/create_account' element={<CreateAccount/>} />
      <Route path='/allForms' element={<Form2/>} />
      <Route path='/resetpw' element={<ResetPw/>} />
      <Route path='/email' element={<Email/>} />
      <Route path='/questions' element={<Questions/>} />
      <Route path='/addToMenu' element={<AddToMenu/>} />
      <Route path='/updateSalaryOfEmployees' element={<BasicTable/>} />
      <Route path='/updateDelEmp' element={<UpdateDelEmp/>}/>
      <Route path='/placeOrder' element={<DynamicTable/>} />
      <Route path='/giveBonuses' element={<BonusTable/>} />
      <Route path='/viewPlacedOrders' element={<ViewOrders/>} />
      <Route path='/removeitem' element={<Table3/>}/>
      <Route path='/place' element={<Table4/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
