const sleep = n => new Promise(resolve => setTimeout(resolve, n));
sleep(1000).then(() => console.log('Hello world'));

// { id, title, body }
const posts = [
  {
    id: 1,
    title: '리덕스 미들웨어를 배워봅시다.',
    body: '리덕스 미들웨어를 직접 만들어보면 이해하기가 쉽죠',
  },
  {
    id: 2,
    title: '자바를 배워봅시다.',
    body: '자바를 직접 만들어보면 이해하기가 쉽죠',
  },
  {
    id: 3,
    title: '리액트를 배워봅시다.',
    body: '리액트를 직접 만들어보면 이해하기가 쉽죠',
  },
];

// 가짜 API 함수
export const getPosts = async () => {
  await sleep(500);
  return posts;
};

export const getPostById = async id => {
  await sleep(500);
  return posts.find(post => post.id === id);
};
