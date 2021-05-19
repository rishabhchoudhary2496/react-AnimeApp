import React from 'react'
import logo from './logo.svg'
import './App.css'
import Home from './screens/Home'
import AnimeDetail from './screens/AnimeDetail'
import NotFound from './screens/NotFound'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/animeDetails/:id' component={AnimeDetail}></Route>
          <Route path='/' component={NotFound}></Route>
          <Redirect from='/home' to='/'></Redirect>
        </Switch>
      </Router>
    </div>
  )
}

export default App
