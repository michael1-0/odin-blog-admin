import { useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router";
import type { Post, Comment } from "../types";

function EditPost() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<{ msg: string }[]>([]);

  const [comments, setComments] = useState<Comment[]>([]);

  const { postId } = useParams();
  const [isLoggedIn] = useOutletContext<[boolean]>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        const post: Post = data.data;
        setTitle(post.title);
        setContent(post.content);
        setIsDraft(!post.published);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    fetch(import.meta.env.VITE_API_URL + `comments?postId=${Number(postId)}`)
      .then((response) => response.json())
      .then((data) => setComments(data.data.reverse()))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [postId]);

  function handleTitleChange(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setTitle(e.target.value);
  }

  function handleContentChange(
    e: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) {
    setContent(e.target.value);
  }

  function handleIsDraftChange(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setIsDraft(e.target.checked);
  }

  function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = JSON.stringify({
      title: title,
      content: content,
      published: !isDraft,
    });

    fetch(import.meta.env.VITE_API_URL + `posts/${postId}`, {
      body: body,
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          navigate("/");
        }
        if (response.status === 400) {
          const data = await response.json();
          setErrors(data.error);
        }
      })
      .catch((error) => console.log(error));
  }

  function handleCommentDeleteClick(commentId: number) {
    fetch(import.meta.env.VITE_API_URL + `comments/${commentId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(() =>
        setComments(
          [...(comments || [])].filter((comment) => comment.id !== commentId),
        ),
      )
      .catch((error) => console.log(error));
  }

  if (!isLoggedIn) {
    return <div className="text-center">You are unauthorized</div>;
  }

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="border-2 p-4 flex flex-col items-stretch gap-4"
      >
        <div className="text-2xl text-center">Edit Post</div>
        {errors &&
          errors.map((error, index) => (
            <div key={index} className="text-red-500">
              {error.msg}
            </div>
          ))}
        <div className="flex flex-col items-stretch gap-1">
          <label htmlFor="title">Title:</label>
          <input
            className="border-b-2"
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e)}
          />
        </div>
        <div className="flex flex-col items-stretch gap-1">
          <label htmlFor="content">Content:</label>
          <textarea
            className="border-2 min-h-96"
            value={content}
            onChange={(e) => handleContentChange(e)}
          />
        </div>
        <div className="flex gap-1 justify-center items-center min-h-10">
          <input
            type="checkbox"
            name="draft"
            defaultChecked={isDraft}
            onChange={(e) => handleIsDraftChange(e)}
          />
          <label htmlFor="draft">Draft</label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {comments?.map((comment) => (
        <div
          className="shadow-xs shadow-brand-main p-2 rounded-md flex flex-col"
          key={comment.id}
        >
          <div className="text-2xl">{comment.username} says:</div>
          <div>{comment.content}</div>
          <button
            className="self-end"
            onClick={() => handleCommentDeleteClick(comment.id)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
}
export default EditPost;
