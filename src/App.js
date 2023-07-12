
import { Route, Router, Routes } from "react-router"
import RootLayout from "./components/RootLayout"
import HomePage from "./pages/HomePage"
import Search from "./pages/Search"
import PageMovie from "./pages/PageMovie"
import NotFound from "./components/NotFound"
import CategoryTvShows from "./pages/CategoryTvShows"
import CategoryMovie from "./pages/CategoryMovie"
import MovieDetails from "./pages/MovieDetails"
import PageTvShow from "./pages/PageTvShow"
import TvShowDetails from "./pages/TvShowDetails"
import PeopleDetail from "./pages/PeopleDetail"


const App = () => {



  return (
    <>

      <Routes>

        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/movie/:category" element={<CategoryMovie />} />
          <Route path="/movie/detail/:id" element={<MovieDetails />} />
          <Route path="/searchmovie/:search" element={<Search />} />
          <Route path="/pagemovie/:category/:page" element={<PageMovie />} />
          <Route path="/tv/:category" element={<CategoryTvShows />} />
          <Route path="/pagetvshow/:category/:page" element={<PageTvShow />} />
          <Route path="/tv/detail/:id" element={<TvShowDetails />} />
          <Route path="/person/detail/:id" element={<PeopleDetail />} />


          <Route path="*" element={<NotFound />} />



        </Route>


      </Routes>
    </>
  )
}

export default App
