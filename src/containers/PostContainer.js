import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';
import { clearPost, getPost } from '../modules/posts';

function PostContainer({ postId }) {
  // postId: 라우터 파라미터를 통해 받아 올 것

  const { data, loading, error } = useSelector(state => state.posts.post);
  const dispatch = useDispatch();

  // 컴포넌트가 처음 렌더링될 때 thunk생성함수(getPost )를 사용하기 위해서 useEffect를 사용
  useEffect(() => {
    dispatch(getPost(postId));
    return () => {
      // cleanup: 업데이트 되기 직전 호출(컴포넌트가 화면에서 사라질때, postId가 바뀔 때
      dispatch(clearPost());
    };
  }, [postId, dispatch]);

  // 결과에 따라 다른 화면
  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <Post post={data} />;
}

export default PostContainer;
