import React, { useEffect, useState } from "react";
import Office from '../İmages/Ofiice.jpg'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useSelector } from 'react-redux';
const Parametreler = () =>{
    const [gelencustomer, setGelencustomer] = useState("")
    const getRol = useSelector(state => state.getRol);
    const handleChange = (e) => {
        // Sadece sayısal değerleri kabul etmek için kontrol yapalım
        if (e.target.id === "fiyat") {
          const regex = /^[0-9\b]+$/; // Sadece sayısal değerleri kabul eden bir regex deseni
          if (!regex.test(e.target.value)) {
            toast.error("Lütfen Fiyat Değrini Doğru Giriniz.", {
                position: "top-right",
                autoClose:2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
         
          }
        }
      
        setData({ ...data, [e.target.id]: e.target.value });
        console.log(data);
      };
    useEffect(() => {

        const cekData = async (event) => {

            try {
                const response = await axios.get(`http://localhost:8080/alcustomer`);
                setGelencustomer(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        cekData();
    }, []);
    const [data, setData] = useState({
       fiyat:"",
       iliski:"",
       malzeme:""
    })
    const sumbitForm = (e) => {
        e.preventDefault();
        if (data.fiyat === "" || data.iliski === "" || data.malzeme === "") {
            toast.error("Lütfen tüm alanları doldurun.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return; // Fonksiyonu burada sonlandır
        }
        let senddata = {
          fiyat:data.fiyat,
          iliski:data.iliski,
          malzeme:data.malzeme
        }
        axios.post('http://localhost:8080/fiyatolustur', senddata)
            .then(res => {
                toast.success('Fiyat Olusturuldu', {
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
          {getRol === "admin" || getRol.rol === "admin" ? (
            <div style={{ position: "relative", minHeight: "100vh", backgroundImage: `url(${Office})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundAttachment: "fixed" }}>
                <Navbar bg="light" variant="light" expand="md">
                    <Container>
                        <Navbar.Brand></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink exact activeClassName="active" to="/Admin" className="nav-link"><BsArrowLeft /></NavLink>


                            </Nav>
                            <Nav>
                                <NavLink exact activeClassName="active" to="/Admin" className="nav-link">Anasayfa</NavLink>
                                <NavLink exact activeClassName="active" to="/" className="nav-link">Çıkış Yap</NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <form className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: "500px", height: "400px", marginLeft: "450px", borderRadius: "5px", marginTop: "70px" }}>
                    <div className="container1">
                        <div className="container">
                            <form className="row g-3">
                             
                               
                                <div style={{ marginTop: "10px", marginLeft: "px" }} className="col-md-4">
                                <label className="form-label">Parametre</label>
                                <input type="text" className="form-control" id="malzeme" onChange={handleChange} value={data.malzeme}/>
                                </div>
                                <div style={{ marginTop: "10px", marginLeft: "px" }} className="col-md-4">
                                <label className="form-label">Fiyat</label>
                                <input type="text" className="form-control" id="fiyat" onChange={handleChange} value={data.fiyat}/>
                                </div>
                               
                                    <div style={{ marginTop: "10px", marginLeft: "" }} className="col-md-4">
                                        <label className="form-label">Customer</label>
                                        <select id="iliski" className="form-select" onChange={handleChange} value={data.iliski}>
                                            <option defaultValue>Customer  Seçin</option>
                                            {gelencustomer.length > 0 && gelencustomer.map((customer) => (
                                                <option key={customer.ad} value={customer.ad}>{customer.ad}</option>
                                            ))}
                                        </select>
                                    </div>
                           
                                <div className="col-12">
                                    <button style={{ marginTop: "40px" }} onClick={sumbitForm} type="submit" className="btn btn-primary">Oluştur</button>
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
export default Parametreler;