import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";

import Community from "./pages/Community";
import Favourites from "./pages/Favourites";
import CreatePost from "./pages/CreatePost";
import FullPost from "./pages/FullPost";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";
import { AppProvider } from "./contexts/AppContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/community/:id" element={<Community />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/create-post/:directory" element={<CreatePost />} />
            <Route path="/full-post/:id" element={<FullPost />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
