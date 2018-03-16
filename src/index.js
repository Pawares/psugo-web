import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import './styles/stylesheet.css'
import App from './components/App';
import MissionsIndex from './components/MissionsIndex'
import MissionsNew from './components/MissionsNew'
import MissionsShow from './components/MissionsShow'
import ItemsIndex from './components/ItemsIndex'
import ItemsNew from './components/ItemsNew';
import ItemsShow from './components/ItemsShow'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/items/new" component={ItemsNew} />
                    <Route path="/items/:id" component={ItemsShow} />
                    <Route path="/items" component={ItemsIndex} />
                    <Route path="/missions/new" component={MissionsNew} /> 
                    <Route path="/missions/:id" component={MissionsShow} />
                    <Route path="/missions" component={MissionsIndex} />
                    <Route exact path="/" component={App} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));
