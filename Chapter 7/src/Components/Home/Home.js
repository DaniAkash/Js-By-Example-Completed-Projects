import React, { Component } from 'react';
import PostSummary from '../Common/PostSummary';
import ErrorMessage from '../Common/ErrorMessage';

import apiCall from '../../services/api/apiCall';
import LoadingIndicator from '../Common/LoadingIndicator';

import { connect } from 'react-redux';

class Home extends Component {

  constructor() {
    super();

    this.state = {
      posts: [],
      loading: false,
      hasError: false,
    };
  }

  componentWillMount() {
    this.setState({loading: true});
    apiCall('posts', {}, 'GET')
    .then(posts => {
      this.setState({posts, loading: false});
    })
    .catch(error => {
      this.setState({hasError: true, loading: false});
      console.error(error);
    });
  }

  render () {
    return (
      <div className={`posts-container container`}>
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
            <ErrorMessage title={'Error!'} message={'Unable to retrieve posts!'} />
          :
            null
        }
        {
          this.state.posts.map(post => <PostSummary key={post.id} post={post}>Post</PostSummary>)
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    loading: state.ajaxCalls.getAllPosts.loading,
    hasError: state.ajaxCalls.getAllPosts.hasError,
  };
}

export default connect(mapStateToProps)(Home);
