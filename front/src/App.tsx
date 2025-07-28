import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfilePage';
import AdminProfiles from './pages/ManageProfilepage';
import SelectMoviePage from './pages/SelectMoviePage';
import Registration from './pages/signup/Registration';
import SelectPlan from './pages/signup/SelectPlan';
import PlanOptionsPage from './pages/signup/SelectPlanForm';
import PaymentPicker from './pages/signup/PaymentPicker';
import GiftOption from './pages/signup/PaymentOption/GiftOption';
import CreditOption from './pages/signup/PaymentOption/CreditOption';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profiles" element={<ProfilePage />} />
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path="/admin-profiles" element={<AdminProfiles />} />
      <Route path='/SelectMovie' element={<SelectMoviePage />} />
      <Route path="/Registration" element={<Registration />} />
      <Route path="/SelectPlan" element={<SelectPlan />} />
      <Route path="/plan-options" element={<PlanOptionsPage />} />
      <Route path="/PaymentPicker" element={<PaymentPicker />} />
      <Route path="/payment/gift" element={<GiftOption />} />
      <Route path="/payment/card" element={<CreditOption />} />
    </Routes>
  );
}

export default App;




