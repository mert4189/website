import React, { useEffect, useState } from "react";
import Office from '../İmages/Ofiice.jpg'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
const GecmisTalep = () => {
    const [gelentalep, setGelentalep] = useState()
    const getUser = useSelector(state => state.getUser)
    const getAd = useSelector(state => state.getAd)
    const getRol = useSelector(state => state.getRol);

    useEffect(() => {

        const cekData = async (event) => {

            try {
                const response = await axios.get(`http://localhost:8080/altalep1/` + getAd.ad);
                setGelentalep(response.data);
              } catch (error) {
                console.log(error);
              }
            };
        cekData();
    }, [getAd]);
    const sumbitForm = (id) => {
        let senddata = {
            durum: "onaybekliyor"
        };
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
                console.log(id);
            });
    };
    const sumbitForm1 = (id) => {
        let senddata = {
            durum: "müşteritarafındanreddedildi"
        };
        axios.post(`http://localhost:8080/taleponayla/${id}`, senddata)
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
                console.log(id);
            });
    };
    console.log(gelentalep)
    return (
        <>
          {getRol === "customer" || getRol.rol === "customer" ?(
            <div style={{ position: "relative", minHeight: "100vh", backgroundImage: `url(${Office})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundAttachment: "fixed" }}>
                <Navbar bg="light" variant="light" expand="md">
                    <Container>
                        <Navbar.Brand></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink exact activeClassName="active" to="/Customer" className="nav-link"><BsArrowLeft /></NavLink>


                            </Nav>
                            <Nav>
                                <NavLink exact activeClassName="active" to="/Customer" className="nav-link">Anasayfa</NavLink>
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
                                        <th scope="col" style={{ backgroundColor: "black", color: "white" }}>Tarih</th>
                                        <th scope="col" style={{ backgroundColor: "black", color: "white" }}>Saat</th>
                                        <th scope="col" style={{ backgroundColor: "black", color: "white" }}>Açıklama</th>
                                        <th scope="col" style={{ backgroundColor: "black", color: "white" }}>Araçtipi</th>
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
                                                <td style={{ textAlign: "center" }}>{row.fiyat}TL</td>
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
                                                <td style={{ textAlign: "center" }}>
                                                    {row.fiyat != 0 ? ( // Only render buttons if price is not 0
                                                        <>
                                                            <IconButton id="onayla" color='primary'    onClick={() => sumbitForm(row.id)}
>
                                                                <CheckIcon />
                                                            </IconButton>
                                                            <IconButton color='error' id="reddet"  onClick={() => sumbitForm1(row.id)}>
                                                                <ClearIcon />
                                                            </IconButton>
                                                        </>
                                                    ) : null} {/* Render null if price is 0 */}

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
export default GecmisTalep;