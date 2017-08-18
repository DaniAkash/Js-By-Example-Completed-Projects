import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ErrorMessage from '../Common/ErrorMessage';
import apiCall from '../../services/api/apiCall';
import LoadingIndicator from '../Common/LoadingIndicator';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Post extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  constructor() {
    super();

    this.state = {
      post: {},
      loading: false,
      hasError: false,
    };
  }

  componentWillMount() {
    this.setState({loading: true});
    const postId = this.props.match.params.id;
    apiCall(`post/${postId}`, {}, 'GET')
    .then(post => {
      this.setState({post, loading: false});
    })
    .catch(error => {
      this.setState({hasError: true, loading: false});
      console.error(error);
    });
  }

  render() {
    return(
      <div className={`post-container container`}>
        {
          this.state.loading
          ?
            <LoadingIndicator />
          :
            null
        }
        {
          this.state.hasError
          ?
            <ErrorMessage title={'Error!'} message={`Unable to retrieve post!`} />
          :
            null
        }
        <h2>{this.state.post.title}</h2>
        <p>{this.state.post.author}</p>
        <p>{this.state.post.content}</p>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {

  return {
    post: state.posts.find(post => post.id === ownProps.match.params.id),
    loading: state.ajaxCalls.getAllPosts.loading,
    hasError: state.ajaxCalls.getAllPosts.hasError,
  };
}

export default withRouter(
  connect(mapStateToProps)(Post)
);
