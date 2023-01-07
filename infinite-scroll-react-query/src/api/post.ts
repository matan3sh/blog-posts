export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function getPosts(page: number, limit: number) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  return res.json();
}
