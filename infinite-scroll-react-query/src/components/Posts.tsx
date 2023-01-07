import { Post } from "../api/post";

interface Props {
  posts: Post[];
}

export function Posts({ posts }: Props) {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h5>
            <span>{post.id}.</span>
            {post.title}
          </h5>
          <p>{post.body}</p>
        </div>
      ))}
    </>
  );
}
