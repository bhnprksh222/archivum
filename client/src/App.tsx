import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PageNotFound from './Pages/PageNotFound/PageNotFound';
import Login from './Pages/Login/Login'
import Landing from './Pages/Landing/Landing'
import Developers from './Pages/Developers/Developers'

import './App.scss'


const App = () => {

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/landing" component={Landing} />
          <Route path="/developers" component={Developers} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>

    </>
  )
}

export default App
