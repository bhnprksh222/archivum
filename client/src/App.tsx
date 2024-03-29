import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import Login from './Pages/Login/Login'
import Landing from './Pages/Landing/Landing'
import Button from './components/Button/Button'
import './App.scss'


const App = () => {

  return (
    <>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={Login} />
<<<<<<< Updated upstream
            <Route path="/landing" component={Landing} />
          </Switch>
=======
            <Route path="/landing" exact component={Landing} />
            <Route component={PageNotFound} />
            <Route path="/" component={Button} />   
          </Switch> 
>>>>>>> Stashed changes
        </ScrollToTop>
      </Router>
    </>
  )
}

export default App
