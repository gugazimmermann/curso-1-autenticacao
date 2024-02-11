import {lazy, Suspense} from "react";
import {Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import {ROUTES} from "../common/constants";
import Layout from "../pages/layout/Layout";
import {Loading} from "../components";

const lazyLoad = (
  component: Promise<any>,
  componentName: string,
): {
  (props: any): JSX.Element;
  displayName: string;
} => {
  const LazyComponent = lazy(async () => await component);
  const LazyComponentWithDisplayName = (props: any): JSX.Element => (
    <Suspense fallback={<Loading />}>
      <LazyComponent {...props} />
    </Suspense>
  );

  LazyComponentWithDisplayName.displayName = componentName;
  return LazyComponentWithDisplayName;
};

const NoMatch = lazyLoad(import("../pages/layout/NoMatch"), "NoMatch");
const Home = lazyLoad(import("../pages/public/home/Home"), "Home");
const Blog = lazyLoad(import("../pages/public/blog/Blog"), "Blog");
const Login = lazyLoad(import("../pages/public/auth/Login"), "Login");

const Routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={`${ROUTES.BLOG}/:postId?`} element={<Blog />} />
        <Route path={`${ROUTES.BLOG}${ROUTES.BLOG_GENRE}/:genreId?`} element={<Blog />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </>,
  ),
);

export default Routes;
