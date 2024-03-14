import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import Payment from './components/Payment';
import Dashboard from './components/dashboard';
import Creator from './components/creator';
import Interface from './components/interface';
import Home from './components/home';


const App = () => {
  return (
    <Router>
      <Routes> 
        <Route exact path="/Login" element={<Login />} /> 
        <Route exact path="/Register" element={<Register />} /> 
        <Route exact path="/Payment" element={<Payment/>}/>
        <Route exact path="/creator" element={<Creator/>}/>     
      <Route exact path="/Interface" element={<Interface/>}/>
      <Route exact path=""  index element={<Home/>}/>

      </Routes>
      
    </Router>
  );
}

export default App;
