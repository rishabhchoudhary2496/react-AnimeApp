import './App.css'
import Home from './screens/Home'
import AnimeDetail from './screens/AnimeDetail'
import NotFound from './screens/NotFound'
import CharacterDetail from './screens/CharacterDetail'
import SearchResult from './screens/SearchResult'
import Review from './screens/Review'

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
          <Route exact path='/reviews/:id' component={Review}></Route>
          <Route exact path='/searchResult' component={SearchResult}></Route>
          <Route path='/' component={NotFound}></Route>
          <Redirect from='/home' to='/'></Redirect>
        </Switch>
      </Router>
    </div>
  )
}

export default App
