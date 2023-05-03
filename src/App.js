import "./App.css";
import {
  Search,
  CardsContainer,
  SingleRecordPage,
  MovieCard,
  Filter,
  UserProfile,
} from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./containers/Navbar";
import ContentContainer from "./containers/ContentContainer";

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ContentContainer></ContentContainer>
            </>
          }
        ></Route>
        <Route
          path="/:media_type/:id"
          element={<SingleRecordPage></SingleRecordPage>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
