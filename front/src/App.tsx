import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfilePage';
import SelectMoviePage from './pages/ProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profiles" element={<ProfilePage />} />
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path='/SelectMovie' element={<SelectMoviePage />} />
    </Routes>
  );
}

export default App;