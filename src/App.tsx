import './App.css'
import Toolbar from "./components/Toolbar/Toolbar";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import Categories from "./containers/Categories/Categories";
import EditFormCategory from "./containers/EditFormCategory/EditFormCategory";
import AddFormCategory from "./containers/AddFormCategory/AddFormCategory";

const App = () => {
  return (
    <>
      <header><Toolbar/></header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/add-category" element={<AddFormCategory/>}/>
                <Route path="/categories/edit-category/:id" element={<EditFormCategory/>}/>
            </Routes>
    </>
  )
};

export default App
