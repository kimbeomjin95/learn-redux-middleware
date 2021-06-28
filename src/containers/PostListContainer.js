import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../components/PostList';
import { getPosts } from '../modules/posts';

function PostListContainer() {
  const { data, loading, error } = useSelector(state => state.posts.posts); // posts reducer 안에 initialState.posts
  // API 호출 하기 위한 dispatch
  const dispatch = useDispatch();

  // 컴포넌트가 처음 렌더링될 때 API요청을 하기 위해서 useEffect를 사용
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]); // []:배열이 비어있으면 컴포넌트가 처음 렌더링될 때만 호출이 됨

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <PostList posts={data} />;
}

export default PostListContainer;
