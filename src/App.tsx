import './App.css'
import Toolbar from "./components/Toolbar/Toolbar";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import Categories from "./containers/Categories/Categories";

const App = () => {
  return (
    <>
      <header><Toolbar/></header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
            </Routes>
    </>
  )
};

export default App
