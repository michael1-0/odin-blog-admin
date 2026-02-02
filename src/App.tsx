import { useState } from "react";
import { Outlet, Link } from "react-router";
import { jwtDecode } from "jwt-decode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const decodedToken = jwtDecode(token);
    const expiry = decodedToken.exp;
    if (!expiry) return false;
    if (expiry < Math.floor(Date.now() / 1000)) {
      localStorage.removeItem("token")
      return false;
    }

    return true;
  });

  function handleLogOutClick() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <>
      <div className="min-h-dvh flex flex-col justify-between items-stretch  bg-brand-secondary text-brand-main sm:px-30 md:px-50 lg:px-50 xl:px-60 2xl:px-160">
        <header className="flex justify-between p-4 sticky top-0 backdrop-blur-2xl">
          <div>Blog Admin</div>
          <div className="flex gap-4">
            <Link to="/">Home</Link>
            {!isLoggedIn ? (
              <>
                <Link to="/log-in">Log In</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <button onClick={handleLogOutClick}>Log Out</button>
            )}
          </div>
        </header>
        <main className="flex flex-col content-center justify-center p-4 py-20">
          <Outlet context={[isLoggedIn, setIsLoggedIn]} />
        </main>
        <footer className="p-4 text-center">odin-blog-admin</footer>
      </div>
    </>
  );
}

export default App;
