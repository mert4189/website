import React, { useState, useEffect } from "react";
import Office from '../İmages/Ofiice.jpg'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { BsArrowLeft } from "react-icons/bs";



const Dispatcher = () => {
    const [gelentalep, setGelentalep] = useState([]);
    const getRol = useSelector(state => state.getRol);
    const getUser = useSelector(state => state.getUser);
    const getAdmin = useSelector(state => state.getAdmin);
    const [data, setData] = useState({
        fiyat: ""
    })
    console.log(getAdmin)

    useEffect(() => {
        const cekData = async () => {
          try {
            
            const response = await axios.get(`http://localhost:8080/altalep2?getAdmin=${getAdmin}`);
            setGelentalep(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        cekData();
      }, [getAdmin]);
      

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    }

  
  

    return (
        <>
           {getRol === "admin" || getRol.rol === "admin" ?(
            <div style={{ position: "relative", minHeight: "100vh", backgroundImage: `url(${Office})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundAttachment: "fixed" }}>
                <Navbar bg="light" variant="light" expand="md">
                    <Container>
                        <Navbar.Brand></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <NavLink exact activeClassName="active" to="/Admin" className="nav-link"><BsArrowLeft /></NavLink>
                            <Nav className="me-auto"></Nav>
                          
                            <Nav>
                                
                                <NavLink exact activeClassName="active" to="/" className="nav-link">Çıkış Yap</NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {gelentalep && gelentalep.length > 0 && (
                    <div
                        id='tablo'
                        className="tabloyapı"
                        style={{
                            marginTop: "10%",
                            marginLeft: "5%",
                            overflowX: "auto",
                            maxHeight: "400px",
                            maxWidth: "90%",
                            background: "white"
                        }}
                    >
                        <div>
                            <table className="table table-bordered table-sm">
                                <thead
                                    className="thead-dark"
                                    style={{ position: "sticky", top: 0, }}
                                >
                                    <tr>
                                        <th scope="col" style={{ backgroundColor: "black", color: "white" }}>Ad</th>
                                        <th scope="col"style={{ backgroundColor: "black", color: "white" }}>Malzeme</th>
                                        <th scope="col"style={{ backgroundColor: "black", color: "white" }}>Fiyat</th>
                                        <th scope="col"style={{ backgroundColor: "black", color: "white" }}>Tarih</th>
                                        <th scope="col"style={{ backgroundColor: "black", color: "white" }}>Saat</th>
                                        <th scope="col"style={{ backgroundColor: "black", color: "white" }}>Açıklama</th>
                                        <th scope="col"style={{ backgroundColor: "black", color: "white" }}>Araçtipi</th>
                                        <th scope="col"style={{ backgroundColor: "black", color: "white" }}>Yolcu Sayısı</th>
                                        <th scope="col"style={{ backgroundColor: "black", color: "white" }}>Bagaj Sayısı</th>
                                        <th scope="col"style={{ backgroundColor: "black", color: "white" }}>Oda Numarası</th>
                                        <th scope="col"style={{ backgroundColor: "black", color: "white" }}>Uçuş Kodu</th>
                                        <th scope="col"style={{ backgroundColor: "black", color: "white" }}>Durum</th>
                                        <th scope="col"style={{ backgroundColor: "black", color: "white" }}>Oluşturan Kişi</th>
                                        <th scope="col"style={{ backgroundColor: "black", color: "white" }}>Yönet</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gelentalep.map((row) => {
                                        const tarih = new Date(row.tarih);
                                        tarih.setDate(tarih.getDate() + 1);
                                        const yeniTarih = tarih.toISOString().split('T')[0];

                                        return (
                                            <tr key={row.id}>
                                                <td style={{ textAlign: "center" }}>{row.ad}</td>
                                                <td style={{ textAlign: "center" }}>{row.secilenmalzeme}</td>
                                                <td style={{ textAlign: "center" }}>{row.fiyat}</td>
                                                <td style={{ textAlign: "center" }}>{yeniTarih}</td>
                                                <td style={{ textAlign: "center" }}>{row.saat}</td>
                                                <td style={{ textAlign: "center" }}>{row.acıklama}</td>
                                                <td style={{ textAlign: "center" }}>{row.aractipi}</td>
                                                <td style={{ textAlign: "center" }}>{row.yolcusayısı}</td>
                                                <td style={{ textAlign: "center" }}>{row.bagajsayısı}</td>
                                                <td style={{ textAlign: "center" }}>{row.odanumarası}</td>
                                                <td style={{ textAlign: "center" }}>{row.ucuskodu}</td>
                                                <td style={{ textAlign: "center" }}>{row.durum}</td>
                                                <td style={{ textAlign: "center" }}>{row.olusturankisi}</td>
                                             
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            )
        :
        (<div></div>)
        }
        </>
    );
};

export default Dispatcher;


