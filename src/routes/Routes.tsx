import {lazy, Suspense} from "react";
import {Route, createBrowserRouter, createRoutesFromElements, Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {ROUTES} from "../common/constants";
import Layout from "../pages/layout/Layout";
import ProtectedLayout from "../pages/protected/ProtectedLayout";
import {Loading} from "../components";

const ProtectedRoute = (): JSX.Element => {
  const {state} = useAuth();
  if (!state.token) return <Navigate to={ROUTES.LOGIN} replace />;
  return <Outlet />;
};

const PublicRoute = (): JSX.Element => {
  const {state} = useAuth();
  if (state.token) return <Navigate to={ROUTES.DASHBOARD} replace />;
  return <Outlet />;
};

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
const Register = lazyLoad(import("../pages/public/auth/Register"), "Register");
const VerifyEmail = lazyLoad(import("../pages/public/auth/VerifyEmail"), "VerifyEmail");
const ForgotPassword = lazyLoad(import("../pages/public/auth/ForgotPassword"), "ForgotPassword");
const NewPassword = lazyLoad(import("../pages/public/auth/NewPassword"), "NewPassword");
const Dashboard = lazyLoad(import("../pages/protected/Dashboard"), "Dashboard");
const Account = lazyLoad(import("../pages/protected/account/Account"), "Account");

const Routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={`${ROUTES.BLOG}/:postId?`} element={<Blog />} />
        <Route path={`${ROUTES.BLOG}${ROUTES.BLOG_GENRE}/:genreId?`} element={<Blog />} />
        <Route element={<PublicRoute />}>
          <Route path={`${ROUTES.LOGIN}/:email?`} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={`${ROUTES.VERIFY_EMAIL}/:email?`} element={<VerifyEmail />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={`${ROUTES.NEW_PASSWORD}/:email?`} element={<NewPassword />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.ACCOUNT} element={<Account />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NoMatch />} />
    </>,
  ),
);

export default Routes;
