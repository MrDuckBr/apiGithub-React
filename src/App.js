import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import {Layout} from 'antd';
import 'antd/dist/antd.css';


function App() {
  return (
     <Layout.Content style={{padding:20}}>
  <Router>
  <Link to="/">Home</Link> 
    <Switch>
    <Route exact path="/">
      <Home/>
    </Route>
    <Route exact path="/favorites">
    <Favorites/>
    </Route>
    </Switch>
  </Router>
  </Layout.Content>
)
}

export default App;
