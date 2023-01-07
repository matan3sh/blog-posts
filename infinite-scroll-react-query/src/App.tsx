import { getPosts, Post } from "./api/post";
import { Posts } from "./components/Posts";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";

function App() {
  const { data, isLoading, isError, error } = useInfiniteScroll<Post>({
    key: "posts",
    fetchFn: getPosts,
    limitItems: 5,
    totalItems: 100,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>{error?.message}</div>;
  }

  return (
    <div className="App">
      <h2>Infinite Scroll</h2>
      {data.pages.map((page, index) => (
        <Posts posts={page} key={index} />
      ))}
    </div>
  );
}

export default App;
