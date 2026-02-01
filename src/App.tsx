import { useState } from "react";
import { Outlet, Link } from "react-router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
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
