import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore,applyMiddleware,compose,combineReducers }  from 'redux';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
//import reducer from './Store/Reducers/burgerBuilder';
import burgerReducer from './Store/Reducers/burgerBuilder';
import orderReducer from './Store/Reducers/order';
import AuthReducer from './Store/Reducers/auth';
const rootReducer=combineReducers({
  burger:burgerReducer,
  order:orderReducer,
  auth:AuthReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
const app=(
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
