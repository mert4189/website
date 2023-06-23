import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Logo from '../İmages/logo.png'
import Office from '../İmages/Ofiice.jpg'
import { setUser,setRol,setAd,setKullanıcı,setAdmin} from "../redux/actions/userActions";
import { useDispatch } from 'react-redux';


const Login = () => {
    const [kullanıcıadı, setKullanıcıadı] = useState('')
    const [sifre, setSifre] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    


    function handleSumbit(event) {
        event.preventDefault();
        axios.post('http://localhost:8080/login', { kullanıcıadı, sifre })
          .then(res => {
            console.log(res.data)
            if (res.data.rol === 'superuser') {
              console.log("giriş superuser")
              toast.success('Giriş Başarılı', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              navigate('/SuperUser')
              dispatch(setRol("superuser"))
              dispatch(setUser(res.data.ad))
            }
            if (res.data.rol === 'admin') {
              console.log("giriş admin")
              toast.success('Giriş Başarılı', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              navigate('/Admin')
              dispatch(setRol("admin"))
            
              
              const adminFullName = res.data.ad  + res.data.soyad;
              dispatch(setAdmin(adminFullName));
            
              dispatch(setUser(res.data.id))
              dispatch(setAd(res.data.ad , res.data.soyad))
            }
            
            if (res.data.rol === 'customer') {
              console.log("giriş customer")
              toast.success('Giriş Başarılı', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              dispatch(setUser(res.data.olusturankisi))
              dispatch(setAd(res.data.ad))
              dispatch(setKullanıcı(res.data.kullanıcıadı))
             
              dispatch(setRol("customer"))
              navigate("/Customer")
              
            }
            if (res.data.rol === 'dispatcher') {
              console.log("giriş dispatcher")
              toast.success('Giriş Başarılı', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              navigate("/Dispatcher")
              dispatch(setRol("dispatcher"))
              dispatch(setUser(res.data.olusturankisi))
            }
          })
          .catch(error => {
            console.error("Hata oluştu:", error);
          });
      }
      

    return (
        <>
            <div style={{ position: "relative", height: "100vh", backgroundImage: `url(${Office})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", filter: "blur(10px)" }}>
            </div>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "30%", borderRadius: "10px" }}>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <img src={Logo} alt="Logo" style={{ width: "100px", height: "100px", borderRadius: "50%", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)" }} />
                </div>
                <form onSubmit={handleSumbit} >
                    <div className="mb-3">
                        <label>Kullanıcı Adı</label>
                        <input
                            type="text"
                            className="form-control"
                            id="kullanıcıadı"
                            onChange={e => setKullanıcıadı(e.target.value)}
                            style={{ borderRadius: "10px", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)" }} />
                    </div>
                    <div className="mb-3">
                        <label>Şifre</label>
                        <input
                            type="password"
                            className="form-control"
                            id="sifre"
                            onChange={e => setSifre(e.target.value)}
                            style={{ borderRadius: "10px", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)" }} />
                    </div>
                    <div className="mb-3">
                        <div className="custom-control custom-checkbox">
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary" style={{ borderRadius: "10px", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)" }}>
                            Giriş Yap
                        </button>
                    </div>
                </form>
            </div>
        </>
    );



}
export default Login;