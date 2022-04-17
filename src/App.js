import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";

import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";

function App() {
  const [openNav, setOpenNav] = useState(false);

  const openNavHandler = () => {
    setOpenNav(true);
  };

  const closeNavHandler = () => {
    setOpenNav(false);
  };

  return (
    <>
      <Header onOpenNav={openNavHandler} />
      <Nav openNav={openNav} closeNav={closeNavHandler} />

      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="create-quiz" element={<CreateQuiz />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="favorites" element={<Favorites />}></Route>
          <Route path="leaderboard" element={<Leaderboard />}></Route>
          <Route path="settings" element={<Settings />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
