import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Routes from "./routes/Routes";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<RouterProvider router={Routes} />);

reportWebVitals();
