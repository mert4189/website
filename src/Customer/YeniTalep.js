import React, { useEffect, useState } from "react";
import Office from '../İmages/Ofiice.jpg'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useSelector } from 'react-redux';


const YeniTalep = () => {

    const [malzemeler, setMalzemeler] = useState();
    const [fiyat, setFiyat] = useState(0);
    const [yolcuSayisi, setYolcuSayisi] = useState(1); // Başlangıçta varsayılan olarak 1 yolcu
    const [randomTalepNo, setRandomTalepNo] = useState("");



    const getUser = useSelector(state => state.getUser);
    const getRol = useSelector(state => state.getRol);
    const getAd = useSelector(state => state.getAd);

    useEffect(() => {
        const cekData = async () => {
            try {
                if (getAd.ad !== undefined) {
                    const response = await axios.get(`http://localhost:8080/alfiyat?getAd=${getAd.ad}`);
                    setMalzemeler(response.data);
                } else {
                    const response = await axios.get(`http://localhost:8080/alfiyat?getAd=${getAd}`);
                    setMalzemeler(response.data);
                    // getAd.ad undefined ise burada istediğiniz işlemi gerçekleştirin
                }
            } catch (error) {
                console.log(error);
            }
        };
        cekData();
    }, [getAd]);








    const [data, setData] = useState({
        ad: "",
        tarih: "",
        saat: "",
        secilenmalzeme: "",
        fiyat: "",
        durum: "onaybekliyor",
        odeme: "",
        bagajsayısı: "",
        acıklama: "",
        aractipi: "",
        odanumarası: "",
        ucuskodu: "",
        olusturankisi: "",
        olusturanadmin: "",

    });
    const handleChangeYolcu = (e, index) => {
        const yolcuadi = e.target.value;
        setData((prevData) => ({
            ...prevData,
            [`yolcuadi_${index + 1}`]: yolcuadi,
        }));
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
        console.log("asthjsth", e.target.value);
    };

    const handleChangeDropdown = (e) => {
        const selectedMalzeme = malzemeler.find((d) => d.malzeme === e.target.value);
        let aciklama = data.acıklama;
        let durum = data.durum;

        if (e.target.value === "Diğer") {
            aciklama = `Ürün Açıklaması: ${aciklama}`;
            durum = "beklemede";
        }

        setData({
            ...data,
            [e.target.id]: e.target.value,
            acıklama: aciklama,
            durum: durum,
        });

        if (selectedMalzeme) {
            setFiyat(selectedMalzeme.fiyat);
        } else {
            setFiyat(0);
        }
    };

    const handleYolcuSayisiChange = (e) => {
        setYolcuSayisi(parseInt(e.target.value));
    };
    console.log(data)
    const sumbitForm = (e) => {
        e.preventDefault();
        if (!data.ad || !data.tarih || !data.saat || !data.secilenmalzeme || !data.aractipi || !data.odanumarası || !data.ucuskodu || !data.odeme || !yolcuSayisi) {
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


        let senddata = {
            ad: data.ad,
            tarih: data.tarih,
            saat: data.saat,
            secilenmalzeme: data.secilenmalzeme,
            fiyat: fiyat,
            durum: data.durum,
            odeme: data.odeme,
            yolcusayısı: yolcuSayisi,
            bagajsayısı: data.bagajsayısı,
            acıklama: data.acıklama,
            aractipi: data.aractipi,
            odanumarası: data.odanumarası,
            ucuskodu: data.ucuskodu,
            olusturankisi: getAd.ad !== undefined ? getAd.ad : getAd,
            olusturanadmin: getUser.user !== undefined ? getUser.user : getUser,
        };

        let yolcuadlari = [];
        for (let i = 1; i <= yolcuSayisi; i++) {
            yolcuadlari.push(data[`yolcuadi_${i}`]);
        }
        const yolcuAdlari = yolcuadlari.join(",");
        const senddata1 = {
            ...data,
            yolcuadlari: yolcuAdlari,

        };


        axios.post('http://localhost:8080/talepolustur', senddata)
            .then(res => {

                axios.post('http://localhost:8080/yolcugonder', senddata1)

                toast.success('Talep Başarıyla Oluşturuldu', {
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
                }, 800);
            });
    };

    console.log(malzemeler);
    console.log(data);
    console.log(data.secilenmalzeme);
    console.log(data.bagajsayısı)

    const yolcuInputs = Array.from({ length: yolcuSayisi }, (_, index) => (
        <div key={index} style={{ marginTop: "10px", marginLeft: "" }} className="col-md-4">
            <label className="form-label">Yolcu {index + 1}</label>
            <input
                type="text"
                className="form-control"
                id={`yolcu_${index + 1}`}
                onChange={(e) => handleChangeYolcu(e, index)}
                value={data[`yolcuadi_${index + 1}`]}
            />
        </div>
    ));



    return (

        <>
            {getRol === "customer" || getRol.rol === "customer" ? (
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
                    <form className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: "800px", height: "560px", marginLeft: "550px", borderRadius: "5px", marginTop: "20px" }}>
                        <div className="container">
                            <div className="container1">
                                <form className="row g-3">
                                    <div className="col-md-12">
                                        <label className="form-label">Ad Soyad</label>
                                        <input type="text" className="form-control" id="ad" onChange={handleChange} value={data.ad} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Tarih</label>
                                        <input type="text" className="form-control" id="tarih" onChange={handleChange} value={data.tarih} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Saat</label>
                                        <input type="text" className="form-control" id="saat" onChange={handleChange} value={data.saat} />
                                    </div>



                                    <div style={{ marginTop: "10px", marginLeft: "" }} className="col-md-4">
                                        <label className="form-label">Yolcu Sayısı</label>
                                        <select className="form-select" onChange={handleYolcuSayisiChange} value={yolcuSayisi}>
                                            {[1, 2, 3, 4, 5, 6, 7].map((count) => (
                                                <option key={count} value={count}>{count}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div style={{ marginTop: "10px", marginLeft: "" }} className="col-md-4" >
                                        <label className="form-label">Bagaj Sayısı</label>
                                        <select id="bagajsayısı" className="form-select" onChange={handleChange} value={data.bagajsayısı}>
                                           
                                                <option  >1</option>
                                                <option  >2</option>
                                                <option  >2</option>
                                                <option  >3</option>
                                                <option  >4</option>
                                                <option  >5</option>
                                                <option  >6</option>
                                                <option  >7</option>
                                          
                                        </select>
                                    </div>
                                    <div style={{ marginTop: "10px", marginLeft: "" }} className="col-md-4" >
                                        <label className="form-label">Araç Tipi</label>
                                        <select id="aractipi" className="form-select" onChange={handleChange} value={data.aractipi}>

                                            <option selected >Araç Tipi</option>
                                            <option>Transit</option>
                                            <option>Vito</option>
                                            <option>Transporter</option>

                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">Oda Numarası</label>
                                        <input type="text" className="form-control" id="odanumarası" onChange={handleChange} value={data.odanumarası} />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">Uçuş Kodu</label>
                                        <input type="text" className="form-control" id="ucuskodu" onChange={handleChange} value={data.ucuskodu} />
                                    </div>
                                    <div className="col-md-4" >
                                        <label className="form-label">Ödeme Durumu</label>
                                        <select id="odeme" className="form-select" onChange={handleChange} value={data.odeme}>

                                            <option selected >Ödeme Durumu Seçiniz</option>
                                            <option>Tahsil Edildi</option>
                                            <option>Tahsil Eilecek</option>
                                            <option>Bedelsiz</option>

                                        </select>
                                    </div>







                                    <div class="mb-3">
                                        <label class="form-label">Açıklama</label>
                                        <textarea class="form-control" id="acıklama" rows="3" onChange={handleChange} value={data.acıklama}></textarea>
                                    </div>


                                    <div style={{ marginTop: "150px", marginLeft: "-750px" }} className="col-md-4">
                                        <label className="form-label">Malzeme</label>
                                        {malzemeler && malzemeler.length > 0 ? (
                                            <select id="secilenmalzeme" className="form-select" onChange={handleChangeDropdown} value={data.secilenmalzeme}>
                                                <option value="">Seçin</option>
                                                {malzemeler.map((row) => (
                                                    <option key={row.malzeme} value={row.malzeme}>{row.malzeme}</option>

                                                ))}
                                                <option>Diğer</option>
                                            </select>
                                        ) : (
                                            <p>Yükleniyor...</p>
                                        )}
                                    </div>
                                    <label style={{ marginLeft: "300px", marginTop: "-30px" }} >{fiyat}TL</label>

                                    <div className="col-md-12">
                                        <button style={{ marginTop: "-100px", marginLeft: "450px" }} onClick={sumbitForm} type="submit" className="btn btn-primary">Talep Oluştur</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </form>
                    <form className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: "400px", height: "560px", marginLeft: "100px", borderRadius: "5px", marginTop: "-610px" }}>
                        <div  >


                            <div style={{ marginTop: "-20px" }}> {yolcuInputs}</div>




                        </div>
                    </form>
                </div>
            )
                :
                (<div></div>)
            }
        </>
    );
};

export default YeniTalep;
