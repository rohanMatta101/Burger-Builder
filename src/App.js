import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom';
import Layout from './components/Layout/layout';
import BurgerBuilder from './containers/Burgerbuilder/Burgerbuilder';
import Checkout from './containers/checkout/checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';

class App extends Component {
  
  render() {
    return (
      <div>
         <Layout>
           <Switch>
           <Route path="/checkout"  component={Checkout} />
           <Route path="/orders" component={Orders} />
           <Route path="/auth" component={Auth} />
           <Route path="/logout" component={Logout} />
           <Route path="/" exact component={BurgerBuilder} />
           </Switch>
           
         </Layout>
      </div>
    );
  }
}

export default App;
