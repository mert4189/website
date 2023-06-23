import './App.css';
import Login from './Login/Login'
import SuperuserAnasayfa from './SuperUser/SuperUser'
import Admin from './SuperUser/Admin'
import Adminolustur from './SuperUser/Adminolustur'
import AdminAnasayfa from './Admin/Admin'
import AdminKullanıcı from './Admin/AdminOlustur'
import SuperuserKullanıcı from './SuperUser/KullanıcıOlustur'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import KullanıcıOluştur from './SuperUser/KullanıcıOlustur';
import Parametreler from './Admin/ParametreTanımla';
import Customer from './Customer/Customer'
import YeniTalep from './Customer/YeniTalep';
import GecmisTalep from './Customer/GeçmişTalep';
import Dispatcher from './Dispatcher/Dispatcher';
import SuperUserTalep from './SuperUser/Talepler'
import Parametre from './SuperUser/Parametre'
import AktifTalep from './Customer/AktifTalepler'
import AdminTalep from './Admin/Talepler'
function App() {
    return (
        <Router>
               <ToastContainer/>
            <Routes>
              <Route path='/' element={<Login/>} />
 
            </Routes>
            <Routes>
              <Route path='/SuperUser' element={<SuperuserAnasayfa/>} />
 
            </Routes>

            <Routes>
              <Route path='/SuperUser/Admin' element={<Admin/>} />
 
            </Routes>
            <Routes>
              <Route path='/SuperUser/Admin/AdminOlustur' element={<Adminolustur/>} />
 
            </Routes>

            <Routes>
              <Route path='/Admin' element={<AdminAnasayfa/>} />
 
            </Routes>
            <Routes>
              <Route path='/Admin/KullanıcıOluştur' element={<AdminKullanıcı/>} />
 
            </Routes>
            <Routes>
              <Route path='/SuperUser/KullanıcıOluştur' element={<KullanıcıOluştur/>} />
 
            </Routes>
            <Routes>
              <Route path='/Admin/ParametreOluştur' element={<Parametreler/>} />
 
            </Routes>

            <Routes>
              <Route path='/Customer' element={<Customer/>} />
 
            </Routes>

            <Routes>
              <Route path='/Customer/YeniTalep' element={<YeniTalep/>} />
 
            </Routes>

            <Routes>
              <Route path='/Customer/GeçmişTalep' element={<GecmisTalep/>} />
 
            </Routes>

            <Routes>
              <Route path='/Dispatcher' element={<Dispatcher/>} />
 
            </Routes>
            <Routes>
              <Route path='/SuperUser/Talepler' element={<SuperUserTalep/>} />
 
            </Routes>
            <Routes>
              <Route path='/SuperUser/Parametre' element={<Parametre/>} />
 
            </Routes>
            <Routes>
              <Route path='/Customer/AktifTalep' element={<AktifTalep/>} />
 
            </Routes>
            <Routes>
              <Route path='/Admin/Talepler' element={<AdminTalep/>} />
 
            </Routes>
            
            
            
            
            
            
            

            
        </Router>
    )



}

export default App;
