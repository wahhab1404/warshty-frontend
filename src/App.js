import React, { Component } from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./auth/components/AuthenticatedRoute";
import Header from "./header/Header";
import SignUp from "./auth/components/SignUp";
import SignIn from "./auth/components/SignIn";
import SignOut from "./auth/components/SignOut";
import ChangePassword from "./auth/components/ChangePassword";
import AddCustomer from "./auth/components/AddCustomer";
import AlertDismissible from "./auth/components/AlertDismissible";
import Customers from "./auth/components/Customers";
import Cars from "./auth/components/carComponent/Cars";
import AddCar from "./auth/components/carComponent/AddCar";
import LandingPage from "./LandingPage";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      alerts: [],
      showSingUp: false,
      showSignIn: false,
      customersList: [],
      carsList: []
    };
  }

  setUser = user => this.setState({ user });

  setCarList = cars => {
    this.setState({ carsList: cars });
  };
  setCustomerList = customers => {
    this.setState({ customersList: customers });
  };
  clearUser = () => this.setState({ user: null });

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] });
  };
  showSignUp = e => {
    e.preventDefault();
    this.setState({
      showSingUp: true,
      showSignIn: false
    });
  };
  showSignIn = e => {
    e.preventDefault();
    this.setState({
      showSingUp: false,
      showSignIn: true
    });
  };
  render() {
    const { alerts, user } = this.state;
    return (
      <React.Fragment>
        
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AlertDismissible
            key={index}
            variant={alert.type}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Switch>
          <Route
            path="/sign-up"
            render={() => <SignUp alert={this.alert} setUser={this.setUser} />}
          />
          <Route
            path="/landingpage"
            render={() => (
              <LandingPage alert={this.alert} setUser={this.setUser} />
            )}
          />
          <Route
            path="/sign-in"
            render={() => <SignIn alert={this.alert} setUser={this.setUser} />}
          />
          <AuthenticatedRoute
            user={user}
            path="/sign-out"
            render={() => (
              <SignOut
                alert={this.alert}
                clearUser={this.clearUser}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path="/change-password"
            render={() => <ChangePassword alert={this.alert} user={user} />}
          />
          <AuthenticatedRoute
            user={user}
            path="/add-customer"
            render={() => (
              <AddCustomer
                alert={this.alert}
                user={user}
                customers={this.state.customersList}
                setCustomerList={this.setCustomerList}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path="/add-car"
            render={() => (
              <AddCar
                alert={this.alert}
                user={user}
                cars={this.state.carsList}
                setCarList={this.setCarList}
              />
            )}
          />
          </Switch>
        </main>
        <div>
          <AuthenticatedRoute
            user={user}
            path="/"
            render={() => (
              <div class="pool">
                <div class="main-container">
                  <React.Fragment>
                    <div class="customers-container">
                      <Customers
                        user={user}
                        customers={this.state.customersList}
                        setCustomerList={this.setCustomerList}
                        setCarList={this.setCarList}
                        cars={this.state.carsList}
                      />
                    </div>
                    <div class="cars-container">
                      <Cars
                        user={user}
                        cars={this.state.carsList}
                        setCarList={this.setCarList}
                      />
                    </div>
                  </React.Fragment>
                </div>
              </div>
            )}
          />}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
