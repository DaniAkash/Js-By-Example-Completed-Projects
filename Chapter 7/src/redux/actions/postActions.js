import actions from '../actionTypes/actionTypes';
import apiCall from '../../services/api/apiCall';


export const getAllPosts = () => {

  return dispatch => {

    dispatch(postsApiCallStart());

    apiCall('posts', {}, 'GET')
      .then(posts => {
        dispatch(postsApiCallSuccess());
        dispatch(getPosts(posts));
      })
      .catch(error => {
        dispatch(postsApiCallFailure());
        console.error(error);
      });

  };

};
