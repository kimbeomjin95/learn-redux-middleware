import React from 'react';
import PostContainer from '../containers/PostContainer';

function PostPage({ match }) {
  // match: 리액트 라우터에서 postpage를 라우터로 지정하게 됬을 때 받아오는 props
  const { id } = match.params; // url파리미터는 무조건 문자열

  // URL 파라미터 값은 문자열이기 때문에 parseInt 를 사용하여 숫자(10진수)로 변환해주어야 합니다.
  const postid = parseInt(id, 10);

  return <PostContainer postId={postid} />;
}

export default PostPage;
