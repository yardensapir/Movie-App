import HomePage from "./pages/home-page/HomePage";
import MoviePage from "./pages/movie-page/MoviePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='/:movieID' element={<MoviePage />} />
        <Route path='*' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
