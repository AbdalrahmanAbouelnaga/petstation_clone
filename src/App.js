import Header from "./components/Header";
import { Routes,Route,Router } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { Store } from "./pages/Store";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" Component={Homepage} />
        <Route exact path="/:animal_slug" Component={Store} />
        <Route exact path="/:animal_slug/:category_slug" Component={Store} />
        <Route exact path="/:animal_slug/:category_slug/:sub_category_slug" Component={Store} />
      </Routes>
    </div>
  );
}

export default App;