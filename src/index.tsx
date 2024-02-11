import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {AuthProvider} from "./context/AuthContext";
import Routes from "./routes/Routes";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <AuthProvider>
    <RouterProvider router={Routes} />
  </AuthProvider>,
);

reportWebVitals();
