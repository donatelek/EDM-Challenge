import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import { createStore,compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import thunk from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom';
const logger = store=>{
    return next=>{
        return action=>{
            const result = next(action)
            return result
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(reducer,composeEnhancers(applyMiddleware(logger,thunk)))

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
