import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "bootstrap/dist/css/bootstrap.min.css";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { NavLink, Route, withRouter } from 'react-router-dom';

import './App.css';
import routes from './routes';
import Home from './Components/Home/Home';
import Post from './Components/Post/Post';
import AuthorList from './Components/Author/AuthorList';
import AuthorPosts from './Components/Author/AuthorPosts';
import NewPost from './Components/NewPost/NewPost';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentWillMount() {
    if(this.props.location.pathname === '/') {
      this.props.history.push(routes.home);
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <a className="navbar-brand" href="home">Home</a>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <a className="nav-link" href="home">Home</a>
              </NavItem>
              <NavItem>
                <a className="nav-link" href="authors">Authors</a>
              </NavItem>
              <NavItem>
                <a className="nav-link" href="new-post">New Post</a>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.post} component={Post} />
        <Route exact path={routes.authors} component={AuthorList} />
        <Route exact path={routes.author} component={AuthorPosts} />
        <Route exact path={routes.newPost} component={NewPost} />
      </div>
    );
  }
}

export default withRouter(App);
