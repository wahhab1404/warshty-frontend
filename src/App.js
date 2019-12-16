import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import AddCustomer from './auth/components/AddCustomer'
import AlertDismissible from './auth/components/AlertDismissible'
import Customers from './auth/components/Customers'
import Cars from './auth/components/carComponent/Cars'

class App extends Component {
  constructor() {
    super()

    this.state = {
      user: null,
      alerts: [],
      showSingUp: false,
      showSignIn: false,
      customersList: [],
      carsList: []
    }
  }

  setUser = user => this.setState({ user })

  setCustomerList = customers => {
    this.setState({ customersList: customers })
  }
  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }
  showSignUp = (e) => {
    e.preventDefault()
    this.setState({
      showSingUp: true,
      showSignIn: false,
    })
  }
  showSignIn = (e) => {
    e.preventDefault()
    this.setState({
      showSingUp: false,
      showSignIn: true,
    })
  }
  render() {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AlertDismissible key={index} variant={alert.type} message={alert.message} />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/add-customer' render={() => (
            <AddCustomer alert={this.alert} user={user} customers={this.state.customersList} setCustomerList={this.setCustomerList} />
          )} />
        </main>
        <div>
          <AuthenticatedRoute user={user} path='/' render={() => (
            <Customers user={user} customers={this.state.customersList} setCustomerList={this.setCustomerList} /> ,
            <Cars cars={this.state.carsList} setCarList={this.setCarList} />
          )} />
          {/* <input type="submit" value="Sign Up" onClick={this.showSignUp} />
         <input type="submit" value="Sing In" onClick={this.showSignIn} />
          { this.state.showSingUp ? <SignUp alert={this.alert} setUser={this.setUser} /> : null }
          { this.state.showSignIn ? <SignIn alert={this.alert} setUser={this.setUser} /> : null } */}
        </div>
      </React.Fragment>

    )
  }
}

export default App
