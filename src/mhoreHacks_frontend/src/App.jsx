import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import Payment from './components/Payment';
import Dashboard from './components/dashboard';
import Creator from './components/creator';
import Interface from './components/interface'




const App = () => {
  return (
    <Router>
      <Routes> 
        <Route exact path="" index element={<Login />} /> 
        <Route exact path="/Register" element={<Register />} /> 
        <Route exact path="/Payment" element={<Payment/>}/>
        <Route exact path="/creator" element={<Creator/>}/>     
      <Route exact path="/dashboard" element={<Dashboard/>}/>
      <Route exact path="/interface" element={<Interface/>}/>
      </Routes>
      
    </Router>
  );
}

export default App;
