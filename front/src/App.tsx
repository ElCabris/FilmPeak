import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfilePage';
import SelectMoviePage from './pages/SelectMoviePage';
import Registration from './pages/signup/Registration';
import SelectPlan from './pages/signup/SelectPlan';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profiles" element={<ProfilePage />} />
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path='/SelectMovie' element={<SelectMoviePage />} />
      <Route path="/Registration" element={<Registration />} />
      <Route path="/SelectPlan" element={<SelectPlan />} />
    </Routes>
  );
}

export default App;