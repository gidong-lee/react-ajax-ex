import React, { Component } from 'react';
import { PostWrapper, Navigate, Post} from '../../components';
import * as service from '../../service/post.js';

class PostContainer extends Component {

  componentDidMount() {
    this.fetchPostInfo(1);
  };

  fetchPostInfo = async (postId) => {
    const post = await service.getPost(postId);
    console.log(post);
    const comments = await service.getComments(postId);
    console.log(comments);
  };

  render() {
    return (
      <PostWrapper>
        <Navigate/>
        <Post/>
      </PostWrapper>
    );
  }
}

export default PostContainer;
