import React, { useState, useEffect } from "react";
import Office from '../İmages/Ofiice.jpg'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BsArrowLeft } from "react-icons/bs";
import { useSelector } from 'react-redux';


const Dispatcher = () => {
    const [gelentalep, setGelentalep] = useState()
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const getRol = useSelector(state => state.getRol);

 


    useEffect(() => {

        const cekData = async (event) => {

            try {
                const response = await axios.get(`http://localhost:8080/aldispatchertalep`);
                setGelentalep(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        cekData();
    }, []);
    console.log(gelentalep)
    const sumbitForm = ( id) => {
        
        
        
        let senddata = {
            durum: "onaylandı"
        }
        axios.post(`http://localhost:8080/taleponayla/${id}`, senddata)
            .then(res => {
                toast.success('Talep Onaylandı', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
              
            })
            .catch(error => {
                console.log(error);
                toast.error('Talep Onaylanırken bir hata oluştu.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                console.log(id)
           
            });
    }
    const sumbitForm1 = ( id) => {
        
        
        
        let senddata = {
            durum: "reddedildi"
        }
        axios.post(`http://localhost:8080/talepreddet/${id}`, senddata)
            .then(res => {
                toast.success('Talep Reddedildi', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(function () {
                    window.location.reload();
                }, 500);
            })
            .catch(error => {
                console.log(error);
                toast.error('Talep Onaylanırken bir hata oluştu.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                console.log(id)
           
            });
    }
    
    return (
        <> 
            {getRol === "superuser" || getRol.rol === "superuser"  ? (     
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
                                        <th scope="col" style={{ backgroundColor: "black", color: "white" }}>Malzeme</th>
                                        <th scope="col" style={{ backgroundColor: "black", color: "white" }}>Fiyat</th>
                                        <th scope="col"style={{ backgroundColor: "black", color: "white" }}>Tarih</th>
                                        <th scope="col" style={{ backgroundColor: "black", color: "white" }}>Saat</th>
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
                                                <td style={{ textAlign: "center" }}>{row.fiyat}TL</td>
                                                <td style={{ textAlign: "center" }}>{yeniTarih}</td>
                                                <td style={{ textAlign: "center" }}>{row.saat}</td>
                                                <td style={{ textAlign: "center" }}>{row.durum}</td>
                                                <td style={{ textAlign: "center" }}>{row.olusturankisi}</td>
                                                <td style={{ textAlign: "center" }}>
                                                    <IconButton id="onayla" color='primary' onClick={() => {
                                                        sumbitForm(row.id)
                                                     
                                                        
                                                    }}>
                                                        <CheckIcon />
                                                    </IconButton>

                                                    <IconButton color='error' id="reddet" onClick={() => sumbitForm1(row.id)}  >
                                                        <ClearIcon />
                                                    </IconButton>


                                                </td>

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

}
export default Dispatcher;