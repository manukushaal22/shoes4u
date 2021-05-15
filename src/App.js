import './App.css';
import Home from './components/home/Home'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Main from './components/main/Main'

function App() {
  return (
      <Router>
        <div className="App">
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path='/search/:query' component={Home}/>
                <Route exact path='/search' component={Home}/>
            </Switch>
        </div>
      </Router>
  );
}

export default App;
