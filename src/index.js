import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './components/App';
import MissionsIndex from './components/missions_index'
import rootReducer from './reducers'

const store = createStore(rootReducer)

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
