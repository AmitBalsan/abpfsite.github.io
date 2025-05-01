import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/abpfsite.github.io">
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
