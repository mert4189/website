import React, { useState, useEffect } from "react";
import Office from '../İmages/Ofiice.jpg'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';



const Dispatcher = () => {
    const [gelentalep, setGelentalep] = useState([]);
    const getRol = useSelector(state => state.getRol);
    const getUser = useSelector(state => state.getUser);
    const [data, setData] = useState({
        fiyat: ""
    })

    useEffect(() => {
        const cekData = async () => {
          try {
            const user = getUser.user !== undefined ? getUser.user : getUser;
            const response = await axios.get(`http://localhost:8080/altalep1?getUser=${user}`);
            setGelentalep(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        cekData();
      }, []);
      

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    }

    const sumbitForm = (id) => {
        let senddata = {
            durum: "onaylandı"
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
            durum: "reddedildi"
        };
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
                console.log(id);
            });
    };

    const sumbitForm2 = (id) => {
        let senddata = {
            fiyat: data.fiyat
        };
        axios.post(`http://localhost:8080/talepfiyat/${id}`, senddata)
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
              
                console.log(id);
            });
    };


    const handlePriceChange = (id, event) => {
        const updatedTalepler = gelentalep.map(row => {
            if (row.id === id) {
                return {
                    ...row,
                    fiyat: parseFloat(event.target.value) || 0
                };
            }
            return row;
        });
        setGelentalep(updatedTalepler);
    };

    return (
        <>
           {getRol === "dispatcher" || getRol.rol === "dispatcher" ?(
            <div style={{ position: "relative", minHeight: "100vh", backgroundImage: `url(${Office})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundAttachment: "fixed" }}>
                <Navbar bg="light" variant="light" expand="md">
                    <Container>
                        <Navbar.Brand></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
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
                                    style={{ position: "sticky", top: 0, background: "rgba(0, 0, 0, 0.05)" }}
                                >
                                    <tr>
                                        <th scope="col">Ad</th>
                                        <th scope="col">Malzeme</th>
                                        <th scope="col">Fiyat</th>
                                        <th scope="col">Tarih</th>
                                        <th scope="col">Saat</th>
                                        <th scope="col">Açıklama</th>
                                        <th scope="col">Araçtipi</th>
                                        <th scope="col">Yolcu Sayısı</th>
                                        <th scope="col">Bagaj Sayısı</th>
                                        <th scope="col">Oda Numarası</th>
                                        <th scope="col">Uçuş Kodu</th>
                                        <th scope="col">Durum</th>
                                        <th scope="col">Oluşturan Kişi</th>
                                        <th scope="col">Yönet</th>
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
                                                <td style={{ textAlign: "center" }}>
                                                    {row.fiyat === "0" ? (
                                                        <div className="col-md-6">

                                                            <input type="text" className="form-control" id="fiyat" onChange={handleChange} value={data.fiyat} />
                                                        </div>
                                                    ) : (
                                                        `${row.fiyat}TL`
                                                    )}
                                                </td>
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
                                                    {row.durum === "onaybekliyor" ? (
                                                        <IconButton
                                                            id="onayla"
                                                            color="primary"
                                                            onClick={() => sumbitForm(row.id)}

                                                        >
                                                            <CheckIcon />
                                                        </IconButton>
                                                    ) : null}
                                                    {row.durum === "onaybekliyor" ? (
                                                        <IconButton
                                                            color="error"
                                                            id="reddet"
                                                            onClick={() => sumbitForm1(row.id)}

                                                        >
                                                            <ClearIcon />
                                                        </IconButton>
                                                    ) : null}
                                                    {row.durum === "beklemede" && row.fiyat === "0" ? (
                                                        <IconButton
                                                            color="success"
                                                            id="gönder"
                                                            onClick={() => sumbitForm2(row.id)}

                                                        >
                                                            <Button>Güncelle</Button>
                                                        </IconButton>
                                                    ) : null}
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
};

export default Dispatcher;


