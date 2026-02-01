import { Outlet, Link } from "react-router";

function App() {
  return (
    <>
      <div className="min-h-dvh flex flex-col justify-between items-stretch  bg-brand-secondary text-brand-main sm:px-30 md:px-50 lg:px-50 xl:px-60 2xl:px-160">
        <header className="flex justify-between p-4 sticky top-0 backdrop-blur-2xl">
          <div>Blog Admin</div>
          <Link to="/">Home</Link>
        </header>
        <main className="flex flex-col content-center justify-center p-4 py-20">
          <Outlet />
        </main>
        <footer className="p-4 text-center">odin-blog</footer>
      </div>
    </>
  );
}

export default App;
