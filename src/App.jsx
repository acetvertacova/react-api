import MenuItemList from './components/MenuItemList';
import { Route, Routes } from 'react-router';
import AboutPage from './components/AboutPage';
import Cart from './components/Cart';
import ProductPage from './components/ProductPage';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './components/NotFoundPage';

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />} >
        <Route index element={<MenuItemList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
