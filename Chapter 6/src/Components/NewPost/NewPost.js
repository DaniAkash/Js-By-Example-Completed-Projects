import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import apiCall from '../../services/api/apiCall';
import ErrorMessage from '../Common/ErrorMessage';
import SuccessMessage from '../Common/SuccessMessage';
import LoadingIndicator from '../Common/LoadingIndicator';
import PostInputField from './Components/PostInputField';

class NewPost extends Component {

  constructor() {
    super();

    this.state = {
      author: '',
      title: '',
      content: '',
      noOfLines: 0,
      loading: false,
      success: false,
      hasError: false,
    };
  }

  render() {

    return(
      <div className={'container'}>
        <h1>{`New Post page`}</h1>
      </div>
    );
  }
}

export default NewPost;
