import MainLayout from './layouts/MainLayout';
import MenuForm from './components/MenuForm';
import Menu from './components/Menu';
import "./App.css";
import { Route, Routes } from 'react-router';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />} >
        <Route index element={<Menu />} />
        <Route path='form'>
          <Route path='create' element={<MenuForm />} />
          <Route path=':id/edit' element={<MenuForm />} />
        </Route>
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
