
import {BrowserRouter as Router,Routes,Route}  from 'react-router-dom';
import LoginPage from "./screens/superadmin/LoginPage";
import Dashboard from "./screens/superadmin/Dashboard";
import AdminPage from './screens/admin/adminLogin';
import Admindashboard from './screens/admin/adminDashboard';
import Plusminus from './Plusminus/Plusminus';
import UserInterface from './components/UserInterfaceForBooking/UserInterface';
import FoodBookingforUserInterface from './components/UserInterfaceForBooking/FoodBookingforUserInterface';
import SimpleSlider from './components/UserInterfaceForBooking/SlickComponent';
import FilterComponent from './components/UserInterfaceForBooking/FillterComponent';
import ImgMediaCard from './components/UserInterfaceForBooking/ImgMediaCardComponent';
import Practice from './components/UserInterfaceForBooking/practice';
import TumharaComponent from './components/UserInterfaceForBooking/TumaharaComponent';
import MenuButton from './components/UserInterfaceForBooking/MenuButton';
import InterfaceCart from './components/UserInterfaceForBooking/InterfaceCart';
import MyComponent from './components/UserInterfaceForBooking/CheckConvertJsonToArray';

function App() {

  return (
    <div >
       <Router>
           <Routes>
               
                <Route  element={<LoginPage/>}  path='/loginpage'/>
                <Route  element={<Dashboard/>}  path='/dashboard/*' />
                <Route  element={<AdminPage/>}  path='/admin_login'/>
                <Route  element={<Admindashboard/>}  path='/admindashboard/*' />
                <Route  element={<Plusminus/>}  path='/plusminus' />
                <Route  element={<UserInterface/>}  path='/userinterface' />
                <Route  element={<FoodBookingforUserInterface/>}  path='/home' />
                <Route  element={<SimpleSlider/>}  path='/simpleslider' />
                <Route  element={<FilterComponent/>}  path='/filtercomponent' />
                <Route  element={<ImgMediaCard/>}  path='/imgmediacard' />
                <Route  element={<Practice/>}  path='/practice' />
                <Route  element={<TumharaComponent/>}  path='/tumaharacomponent' />
                <Route  element={<MenuButton/>}  path='/menubutton' />
                <Route  element={<InterfaceCart/>}  path='/cart' />
                <Route  element={<MyComponent/>}  path='/mycomponent' />

           </Routes>
       </Router>
    </div>
  );
}

export default App;
