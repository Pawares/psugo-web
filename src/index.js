import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './components/App';
import MissionsIndex from './components/missions_index'
import rootReducer from './reducers'
import { firestore } from './database/config'

const store = createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
        <div>
            <Route path="/missions" component={MissionsIndex} />
            <Route exact path="/" component={App} />
        </div>
    </BrowserRouter>
    </Provider>
, document.getElementById('root'));
