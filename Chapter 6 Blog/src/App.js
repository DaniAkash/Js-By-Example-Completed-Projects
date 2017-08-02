import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavLink className={'navbar-brand'} to="/home">Home</NavLink>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className={'nav-link'} activeClassName={'active'} to="/home">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={'nav-link'} activeClassName={'active'} to="/authors">Authors</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={'nav-link'} activeClassName={'active'} to="/new-post">New Post</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default App;
