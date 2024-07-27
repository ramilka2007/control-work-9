import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import Categories from './containers/Categories/Categories';
import EditFormCategory from './containers/EditFormCategory/EditFormCategory';
import AddFormCategory from './containers/AddFormCategory/AddFormCategory';
import AddTransaction from './containers/AddTransactiom/AddTransaction';
import EditTransaction from './containers/EditTransaction/EditTransaction';

const App = () => {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/add-category" element={<AddFormCategory />} />
        <Route
          path="/categories/edit-category/:id"
          element={<EditFormCategory />}
        />
        <Route
          path="/transactions/add-transaction"
          element={<AddTransaction />}
        />
        <Route
          path="/transactions/edit-transaction/:id"
          element={<EditTransaction />}
        />
      </Routes>
    </>
  );
};

export default App;
