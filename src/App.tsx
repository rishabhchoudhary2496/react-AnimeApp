import './App.css'
import Home from './screens/Home'
import AnimeDetail from './screens/AnimeDetail'
import NotFound from './screens/NotFound'
import CharacterDetail from './screens/CharacterDetail'

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
          <Route
            exact
            path='/characterDetails/:id'
            component={CharacterDetail}
          ></Route>
          <Route path='/' component={NotFound}></Route>
          <Redirect from='/home' to='/'></Redirect>
        </Switch>
      </Router>
    </div>
  )
}

export default App
