import React, { Component, Fragment } from 'react';
import { BrowserRouter,Switch } from 'react-router-dom';
import { NavTemplate } from './template/NavTemplate/NavTemplate';

import AddFood from './components/addFoodComponent';
import NewFood from './components/newFoodComponent';
import EditFood from './components/editFoodComponent';
import Home from './pages/Home'



export default class RouterMain extends Component {
  render() {
    return (
      <BrowserRouter> 
        <Fragment>
          <Switch>
            <NavTemplate exact path="/"  component={NewFood}/>
            <NavTemplate exact path="/myfood" component={NewFood}/>
            <NavTemplate exact path="/new"  component={AddFood}/>
            <NavTemplate exact path="/foods/:id" component={EditFood}/>
            <NavTemplate exact path="/home" component={Home}/>
          </Switch>
        </Fragment>
      </BrowserRouter>
    )
  }
}