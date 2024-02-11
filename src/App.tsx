import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ROUTES} from "./common/constants";
import Layout from "./pages/layout/Layout";
import Home from "./pages/public/home/Home";
import Blog from "./pages/public/blog/Blog";
import Post from "./pages/public/blog/Post";
import Login from "./pages/public/auth/Login";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.BLOG} element={<Blog />} />
          <Route path={`${ROUTES.BLOG}/:postId?`} element={<Post />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
