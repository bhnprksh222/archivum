import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import ScrollToTop from "./ScrollToTop";

import Login from './Pages/Login/Login'
import Landing from './Pages/Landing/Landing'

import './App.scss'


const App = () => {

  return (
    <>
      <Router history={history}>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/landing" exact component={Landing} />
          </Switch>
        </ScrollToTop>
      </Router>
    </>
  )
}

export default App
