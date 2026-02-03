import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router";
import type { Post } from "../types";

function Home() {
  const [isLoggedIn] = useOutletContext<[boolean]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.data.reverse()))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  function handlePublishClick(post: Post) {
    const postId = post.id;
    const body = JSON.stringify({
      title: post.title,
      content: post.content,
      published: !post.published,
    });

    fetch(import.meta.env.VITE_API_URL + `posts/${postId}`, {
      method: "put",
      body: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setPosts(
          [...(posts || [])].map((post) =>
            post.id === postId ? data.data : post,
          ),
        ),
      )
      .catch((error) => console.log(error));
  }

  function handleDeleteClick(postId: number) {
    fetch(import.meta.env.VITE_API_URL + `posts/${postId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(() =>
        setPosts([...(posts || [])].filter((post) => post.id !== postId)),
      )
      .catch((error) => console.log(error));
  }

  if (!isLoggedIn) {
    return (
      <div className="text-center">
        You are not logged in.{" "}
        <Link to="/log-in" className="underline">
          Log In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center">Loading..</div>;
  }

  return (
    <div className="flex flex-col items-stretch ">
      <Link to="/posts/new" className="underline text-center text-xl">
        New Post
      </Link>
      {posts?.map((post) => (
        <div key={post.id} className="p-2 my-2">
          <div className="p-2 flex justify-between items-center shadow-lg rounded-md gap-4">
            <div className="flex-2 max-w-xl">
              <h1 className="text-3xl">{post.title}</h1>
              <div>{post.content.slice(0, 14) + "..."}</div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Link to={`/posts/${post.id}/edit`}>edit</Link>
              <button onClick={() => handleDeleteClick(post.id)}>delete</button>
              {!post.published ? (
                <button onClick={() => handlePublishClick(post)}>
                  publish
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
