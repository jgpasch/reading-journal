import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateBook from './components/CreateBook';
import Wishlist from './components/Wishlist';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{height: '100%'}}>
          <Header />
          <div className="content-wrapper">
            <Switch>
              <Route path='/create' component={CreateBook} />
              <Route path='/wishlist' component={Wishlist} />
              <Route path='/' component={Dashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
