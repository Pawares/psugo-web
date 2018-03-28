import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { Container } from 'semantic-ui-react'

import './styles/stylesheet.css'
import App from './components/App'
import MissionList from './components/MissionList'
import MissionNew from './components/MissionNew'
import MissionEdit from './components/MissionEdit'
import ItemList from './components/ItemList'
import ItemNew from './components/ItemNew'
import ItemEdit from './components/ItemEdit'
import NavBar from './components/NavBar'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <NavBar />
        <Container>
          <Switch>
            <Route path="/items/new" component={ItemNew} />
            <Route path="/items/:id" component={ItemEdit} />
            <Route path="/items" component={ItemList} />
            <Route path="/missions/new" component={MissionNew} />
            <Route path="/missions/:id" component={MissionEdit} />
            <Route path="/missions" component={MissionList} />
            <Route exact path="/" component={App} />
          </Switch>
        </Container>

      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
