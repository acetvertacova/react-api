import MenuItemList from './components/MenuItemList';
import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import { SkeletonTheme } from 'react-loading-skeleton';
import "./App.css";
import MenuItemForm from './components/MenuItemForm';

function App() {

  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
    <Routes>
      <Route element={<MainLayout />} >
        <Route path='/menu' element={<MenuItemList />} />
        <Route path='/form/:id?' element={<MenuItemForm />} />
      </Route>
    </Routes>
    </SkeletonTheme>
  );
}

export default App;
