import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";

function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ msg: string }[]>([]);

  const [isLoggedIn, setIsLoggedIn] =
    useOutletContext<
      [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    >();
  const navigate = useNavigate();

  function handleEmailChange(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setConfirmPassword(e.target.value);
  }

  function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors([...errors, { msg: "Password does not match" }]);
      return;
    }

    const body = JSON.stringify({
      email: email,
      password: password,
      confirmPassword: password,
    });

    fetch(import.meta.env.VITE_API_URL + "sign-up", {
      method: "post",
      body: body,
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.status === 401 || response.status === 404) {
          setErrors([{ msg: data.error }]);
          return null;
        }
        if (!response.ok) {
          setErrors(data.error);
          return null;
        }

        setErrors([]);
        return data;
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  }

  if (isLoggedIn) {
    return <div className="text-center">Already logged in</div>;
  }

  return (
    <div className="shadow-lg rounded-md p-6">
      <form
        action=""
        className="flex flex-col items-stretch content gap-6"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="text-center text-4xl">Sign Up</div>
        {errors &&
          errors.map((error, index) => (
            <div key={index} className="text-red-500">
              {error.msg}
            </div>
          ))}
        <div className="flex flex-col items-stretch">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="border-b-2"
            value={email}
            onChange={(e) => handleEmailChange(e)}
          />
        </div>
        <div className="flex flex-col items-stretch">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            className="border-b-2"
            value={password}
            onChange={(e) => handlePasswordChange(e)}
          />
        </div>
        <div className="flex flex-col items-stretch">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            className="border-b-2"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e)}
          />
        </div>
        <button type="submit" className="shadow-md rounded-md p-4">Submit</button>
      </form>
    </div>
  );
}

export default Register;
