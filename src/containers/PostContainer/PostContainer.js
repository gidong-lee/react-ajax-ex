import React, { Component } from 'react';
import { PostWrapper, Navigate, Post} from '../../components';
import * as service from '../../service/post.js';

class PostContainer extends Component {

  constructor(props) {
    super();

    this.state = {
      postId: 1,
      fetching : false,
      post: {
        title: null,
        body: null
      },
      comments:[]
    };
  }

  componentDidMount() {
    this.fetchPostInfo(1);
  };

  handleNavigateClick = (type) => {
    const postId = this.state.postId;

    if(type === 'NEXT') {
      this.fetchPostInfo(postId + 1);
    } else {
      this.fetchPostInfo(postId - 1);
    }
  }

  fetchPostInfo = async (postId) => {
    this.setState({
      fetching: true
    });

    try {
      //wait for two promise work
      const info = await Promise.all([
        service.getPost(postId),
        service.getComments(postId)
      ]);

      const {title, body} = info[0].data;
      const comments = info[1].data;

      this.setState({
        postId,
        post: {
          title,
          body
        },
        comments,
        fetching : false
      });
    } catch (e) {
      this.setState({
        fetching: false
      });
      console.log('error', e);
    }
  };


  render() {
    const {postId, fetching, post, comments} = this.state;

    return (
      <PostWrapper>
        <Navigate postId={postId} disabled={fetching} onClick={this.handleNavigateClick}/>
        <Post title={post.title} body={post.body} comments={comments}/>
      </PostWrapper>
    );
  }
}

export default PostContainer;
