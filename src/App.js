import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import AuthService from './services/auth.service';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/HomePage/Home';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';
import Menu from './pages/Menu/Menu';
import Dashboard from './pages/Dashboard/Dashboard';
import NewRestaurant from './pages/Restaurant/NewRestaurant';
import NewCategorie from './pages/Categories/NewCategorie';
import GetAllProducts from './pages/Products/GetAllProducts';
import Rewards from './pages/Rewards/Rewards';
import NotFound from './pages/Other/NotFound';
import Footer from './components/Footer';
import EventBus from './common/EventBus';
import ProfileMore from './components/ProfileMore';
import Navbar from './components/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const location = useLocation();
  const logOut = () => {
    AuthService.logout();
  };

  useEffect(() => {
    EventBus.on('logout', () => {
      logOut();
    });
    return () => {
      EventBus.remove('logout');
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<ProfileMore />} />
        <Route exact path="/menu" element={<Menu />} />
        <Route exact path="/rewards" element={<Rewards />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/restaurant/new" element={<NewRestaurant />} />
        <Route exact path="/categorie/new" element={<NewCategorie />} />
        <Route exact path="/product/all" element={<GetAllProducts />} />
        <Route path="/user" element={<BoardUser />} />
        <Route path="/mod" element={<BoardModerator />} />
        <Route path="/admin" element={<BoardAdmin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
