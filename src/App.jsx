import MainLayout from './layouts/MainLayout';
import MenuForm from './components/MenuForm';
import Menu from './components/Menu';
import "./App.css";
import { SkeletonTheme } from 'react-loading-skeleton';
import { Route, Routes } from 'react-router';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <Routes>
        <Route element={<MainLayout />} >
          <Route index element={<Menu />} />
          <Route path='/form/:id?' element={<MenuForm />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </SkeletonTheme>
  );
}

export default App;
