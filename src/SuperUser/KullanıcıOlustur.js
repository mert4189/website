import React, { useEffect, useState } from "react";
import Office from '../İmages/Ofiice.jpg'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import axios from "axios";
const KullanıcıOluştur = () => {
    const [gelenadmin, setGelenadmin] = useState([]);

    const [gelenadmin1, setGelenadmin1] = useState("")
    const getRol = useSelector(state => state.getRol);
    const getUser = useSelector(state => state.getUser);
    const [data, setData] = useState({
        ad: "",
        soyad: "",
        kullanıcıadı: "",
        sifre: "",
        mail: "",
        telno: "",
        rol: "",
        olusturankisi:""

    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
        console.log(data)
    }
    useEffect(() => {

        const cekData = async (event) => {

            try {
                const response = await axios.get(`http://localhost:8080/aladmin`);
                setGelenadmin(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        cekData();
    }, []);
    useEffect(() => {

        const cekData = async (event) => {

            try {
                const response = await axios.get(`http://localhost:8080/aladminad/` + getUser.user);
                setGelenadmin1(response.data);
            } catch (error) {
                console.log(error);
            }

        };
        cekData();
    }, [getUser.user]);
    console.log(gelenadmin)
    const sumbitForm = (e) => {
        e.preventDefault();
        let senddata = {
            ad: data.ad,
            soyad: data.soyad,
            kullanıcıadı: data.kullanıcıadı,
            sifre: data.sifre,
            rol: data.rol,
            telno: data.telno,
            mail: data.mail,
            olusturankisi:data.olusturankisi

        }
        axios.post('http://localhost:8080/adminolustur', senddata)
            .then(res => {
                toast.success('Kullanıcı Kaydı Oluşturuldu', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(function () {
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
                                    <NavLink exact activeClassName="active" to="/SuperUser" className="nav-link"><BsArrowLeft /></NavLink>


                                </Nav>
                                <Nav>
                                    <NavLink exact activeClassName="active" to="/SuperUser" className="nav-link">Anasayfa</NavLink>
                                    <NavLink exact activeClassName="active" to="/" className="nav-link">Çıkış Yap</NavLink>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <form className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: "500px", height: "500px", marginLeft: "450px", borderRadius: "5px", marginTop: "50px" }}>
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
                                        <label className="form-label">Şifre</label>
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
                                    <div style={{ marginTop: "100px", marginLeft: "-310px" }} className="col-md-4">
                                        <label className="form-label">Rol</label>
                                        <select id="rol" className="form-select" onChange={handleChange} value={data.rol}>
                                            <option defaultValue>Rol Seçin</option>
                                            <option value="customer">customer</option>
                                            <option value="dispatcher">dispatcher</option>
                                        </select>
                                    </div>
                                    <div style={{ marginTop: "100px", marginLeft: "-10px" }} className="col-md-4">
                                        <label className="form-label">Bağlantı</label>
                                        <select id="olusturankisi" className="form-select" onChange={handleChange} value={data.olusturankisi}>
                                            <option defaultValue>Admin Seçin</option>
                                            {gelenadmin.map(admin => (
                                                <option value={admin.kullanıcıadı}>{admin.kullanıcıadı}</option>
                                            ))}
                                        </select>
                                    </div>


                                    <div className="col-12">
                                        <button style={{ marginTop: "-100px", marginLeft: "300px" }} type="submit" onClick={sumbitForm} className="btn btn-primary">Oluştur</button>
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
export default KullanıcıOluştur;