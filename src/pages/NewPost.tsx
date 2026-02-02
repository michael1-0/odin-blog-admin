import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";

function NewPost() {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ msg: string }[]>([]);

  const [isLoggedIn] = useOutletContext<[boolean]>();
  const navigate = useNavigate();

  function handleNewTitleChange(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setNewTitle(e.target.value);
  }

  function handleNewContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewContent(e.target.value);
  }

  function handleIsDraftChange(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setIsDraft(e.target.checked);
  }

  function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = JSON.stringify({
      title: newTitle,
      content: newContent,
      published: !isDraft,
    });

    fetch(import.meta.env.VITE_API_URL + "posts", {
      method: "post",
      body: body,
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

  if (!isLoggedIn) {
    return <div>You are unauthorized</div>;
  }

  return (
    <div>
      <form
        className="border-2 p-4 flex flex-col items-stretch gap-4"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="text-4xl text-center">New Post</div>
        {errors &&
          errors.map((error, index) => (
            <div key={index} className="text-red-500">
              {error.msg}
            </div>
          ))}
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title:</label>
          <input
            className="border-b-2 flex flex-col gap-2 "
            type="text"
            name="title"
            value={newTitle}
            onChange={(e) => handleNewTitleChange(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="content">Content:</label>
          <textarea
            className="border-2 flex flex-col gap-2 min-h-96"
            name="content"
            contentEditable
            value={newContent}
            onChange={(e) => handleNewContentChange(e)}
          />
        </div>
        <div className="flex gap-1 items-center justify-center h-10">
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
    </div>
  );
}

export default NewPost;
