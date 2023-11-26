import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CityList from './components/city-list/CityList';
import CountryList from './components/country-list/CountryList';
import Home from './pages/home/Home';
import AppLayout from './pages/layout/AppLayout';
import Login from './pages/login/Login';
import PageNotFound from './pages/page-not-found/PageNotFound';
import Pricing from './pages/pricing/Pricing';
import Product from './pages/product/Product';
import City from './components/city/City';
import Form from './components/form/Form';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product' element={<Product />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/app' element={<AppLayout />}>
              <Route index element={<Navigate to='cities' replace />} />
              <Route path='cities' element={<CityList />} />
              <Route path='cities/:id' element={<City />} />
              <Route path='countries' element={<CountryList />} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
