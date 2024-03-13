import { BrowserRouter as Router, Route } from 'react-router-dom';
import login from './components/login'

const App = () =>{
  return (
    <Router>
      <div>
          <Route exact path="/login" component={login} />
          <Route exact path="/regester" component={rejester} />
      
      </div>
    </Router>
  );
}

export default App;
