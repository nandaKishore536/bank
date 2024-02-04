import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'

import Login from './components/Login'

import NotFound from './components/NotFound'

import Home from './components/Home'

const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
