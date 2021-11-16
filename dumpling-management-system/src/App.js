import './App.css';
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import Form2 from "./components/allForms/allForms";
import Email from "./components/email/email";
import CreateAccount from "./pages/create_account/create_account";
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Router>
    <div className="App">
      <Routes> 

      <Route path='/' element={<Login/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/create_account' element={<CreateAccount/>} />
      <Route path='/allForms' element={<Form2/>} />
      <Route path='/email' element={<Email/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
