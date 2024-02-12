import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import ScrollToTop from "./ScrollToTop";

import Login from './components/login/Login'

import './App.scss'


const App = () => {

  return (
    <>
      <Router history={history}>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={Login} />
          </Switch>
        </ScrollToTop>
      </Router>
    </>
  )
}

export default App
