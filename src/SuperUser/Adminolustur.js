import React, {  useState } from "react";
import Office from '../İmages/Ofiice.jpg'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import {  toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const Adminolustur = () => {
    const getRol = useSelector(state => state.getRol);
    const getUser = useSelector(state => state.getUser);
    const [data, setData] = useState({
        ad: "",
        soyad: "",
        kullanıcıadı: "",
        sifre: "",
        mail:"",
        telno:"",
        rol:"admin"
    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
        console.log(data)
    }
   
    const sumbitForm = (e) => {
        e.preventDefault();
        const { ad, soyad, kullanıcıadı, sifre, mail, telno, rol } = data;
        if (!ad || !soyad || !kullanıcıadı || !sifre || !mail || !telno) {
            toast.error("Lütfen tüm alanları doldurunuz.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            return;
          }
          if (sifre.length < 8 || sifre.length > 16) {
            toast.error("Şifreniz 8 ile 16 karakter arasında olmalıdır.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            return;
          }
      
          if (!/[A-Z]/.test(sifre)) {
            toast.error("Şifrenizde en az bir büyük harf bulunmalıdır.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            return;
          }
          if (!mail.includes("@") ) {
            toast.error("Lütfen geçerli bir e-posta adresi giriniz.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            return;
          }
          if (telno.length !== 11 || !telno.startsWith("0")) {
            toast.error("Telefon numaranızı doğru bir şekilde giriniz.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            return;
          }
        let senddata = {
            ad:data.ad,
            soyad:data.soyad,
            kullanıcıadı:data.kullanıcıadı,
            sifre:data.sifre,
            mail:data.mail,
            telno:data.telno,
            rol:data.rol,
            olusturankisi:getUser
        }
        axios.post('http://localhost:8080/adminolustur', senddata)
            .then(res => {
                toast.success('Admin Kaydı Oluşturuldu', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                    setTimeout(function(){
                        window.location.reload();
                     }, 1200);
            })
    }

    return (
        <>
           {getRol === "superuser" || getRol.rol === "superuser" ? (
            <div style={{ position: "relative", minHeight: "100vh", backgroundImage: `url(${Office})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundAttachment: "fixed" }}>
                <Navbar bg="light" variant="light" expand="md">
                    <Container>
                        <Navbar.Brand></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink exact activeClassName="active" to="/SuperUser/Admin" className="nav-link"><BsArrowLeft /></NavLink>


                            </Nav>
                            <Nav>
                                <NavLink exact activeClassName="active" className="nav-link">Anasayfa</NavLink>
                                <NavLink exact activeClassName="active" to="/" className="nav-link">Çıkış Yap</NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <form class="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: "500px", height: "500px", marginLeft: "450px", borderRadius: "5px", marginTop: "70px" }}>
                    <div className="container1">
                        <div className="container">
                            <form className="row g-3">
                                <div style={{ marginTop: "30px" }} className="col-md-6">
                                    <label className="form-label">Ad</label>
                                    <input type="text" className="form-control" id="ad" onChange={handleChange} value={data.ad} />
                                </div>
                                <div style={{ marginTop: "30px" }} className="col-md-6">
                                    <label className="form-label">Soyad</label>
                                    <input type="text" className="form-control" id="soyad" onChange={handleChange} value={data.soyad} />
                                </div>




                                <div style={{ marginTop: "30px", marginLeft: "" }} className="col-md-6">
                                    <label className="form-label">Kullanıcı Adı</label>
                                    <input type="text" className="form-control" id="kullanıcıadı" onChange={handleChange} value={data.kullanıcıadı} />
                                </div>
                                <div style={{ marginTop: "30px", marginLeft: "" }} className="col-md-4">
                                    <label className="form-label">Sifre</label>
                                    <input type="text" className="form-control" id="sifre" onChange={handleChange} value={data.sifre} />
                                </div>
                                <div style={{ marginTop: "30px", marginLeft: "" }} className="col-md-8">
                                    <label className="form-label">Eposta</label>
                                    <input type="mail" className="form-control" id="mail" onChange={handleChange} value={data.mail} />
                                </div>
                                <div style={{ marginTop: "30px", marginLeft: "" }} className="col-md-8">
                                    <label className="form-label">Telefon Numarası</label>
                                    <input type="text" className="form-control" id="telno" onChange={handleChange} value={data.telno} />
                                </div>
                                <div className="col-12">
                                    <button style={{ marginTop: "40px" }} type="submit" onClick={sumbitForm} className="btn btn-primary">Oluştur</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </form>



            </div>
            )
        :
        (<div></div>)
        }

        </>
    );

}
export default Adminolustur;