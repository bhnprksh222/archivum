import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

import Login from './Pages/Login/Login'
import Landing from './Pages/Landing/Landing'

import './App.scss'


const App = () => {

  return (
    <>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/landing" component={Landing} />
          </Switch>
        </ScrollToTop>
      </Router>
    </>
  )
}

export default App
