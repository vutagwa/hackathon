import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import Payment from './components/Payment';
import userContent from './components/userContent';



const App = () => {
  return (
    <Router>
      <Routes> 
        <Route exact path="" element={<Login />} /> 
        <Route exact path="" element={<Register />} /> 
        <Route exact path="" element={<Payment/>}/>
        <Route exact path="" element={<userContent/>}/>

      </Routes>
    </Router>
  );
}

export default App;
