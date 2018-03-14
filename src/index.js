import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import './styles/stylesheet.css'
import App from './components/App';
import MissionsIndex from './components/missions_index'
import MissionsNew from './components/missions_new'
import MissionsShow from './components/missions_show'
import ItemsIndex from './components/items_index'
import rootReducer from './reducers'

const store = createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
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
