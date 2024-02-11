import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Blog from "./Blog";
import Login from "./Login";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/entrar" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
