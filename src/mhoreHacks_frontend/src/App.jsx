import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import Payment from './components/Payment';
import Dashboard from './components/dashboard';
import Creator from './components/creator';




const App = () => {
  return (
    <Router>
      <Routes> 
        <Route exact path="" element={<Login />} /> 
        </Routes>
        <Routes>
        <Route exact path="" element={<Register />} /> 
        </Routes>
        <Routes>
        <Route exact path="" element={<Payment/>}/>
        </Routes>
        <Routes>
        <Route exact path="" element={<Creator/>}/>
      </Routes>
      <Routes>
      <Route exact path="" element={<Dashboard/>}/>
      </Routes>
      <Routes>
      <Route exact path="" element={<creatorlogin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
