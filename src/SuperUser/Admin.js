import React, { useEffect, useState } from "react";
import Office from '../İmages/Ofiice.jpg'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useSelector } from 'react-redux';

const Admin = () => {
  const [gelenadmin, setGelenadmin] = useState("")

  const getRol = useSelector(state => state.getRol);
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
  const handleDelete = (id) => {

    axios.post(`http://localhost:8080/adminsil/` + id)
      .then(response => {
        console.log(response.data);
        setTimeout(function () {
          window.location.reload();
        }, 100);
      })
      .catch(error => {
        console.log(error);
      });
  };

  console.log(gelenadmin)

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
                  <NavLink exact activeClassName="active" to="/SuperUser/Admin/AdminOlustur" className="nav-link" >Admin Oluştur</NavLink>

                </Nav>
                <Nav>
                  <NavLink exact activeClassName="active" to="/SuperUser" className="nav-link">Anasayfa</NavLink>
                  <NavLink exact activeClassName="active" to="/" className="nav-link">Çıkış Yap</NavLink>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {gelenadmin.length > 0 && (
            <div id='tablo' className="tabloyapı" style={{ marginTop: "10%", marginLeft: "5%", overflowX: "auto", maxHeight: "400px", maxWidth: "90%", background: "white" }}>
              <div >

                <table className="table table-bordered table-sm ">

                  <thead className="thead-dark" style={{ position: "sticky", top: 0, }}>
                    <tr>

                      <th scope="col" style={{ backgroundColor: "black", color: "white" }}>Ad</th>
                      <th scope="col" style={{ backgroundColor: "black", color: "white" }}>Soyad</th>
                      <th scope="col" style={{ backgroundColor: "black", color: "white" }}>KullanıcıAdı</th>
                      <th scope="col" style={{ backgroundColor: "black", color: "white" }}>Şifre</th>
                      <th scope="col" style={{ backgroundColor: "black", color: "white" }}>Rol</th>
                      <th scope="col" style={{ backgroundColor: "black", color: "white" }}>Eposta</th>
                      <th scope="col" style={{ backgroundColor: "black", color: "white" }}>Tel No</th>
                      <th scope="col" style={{ backgroundColor: "black", color: "white" }}>Yönet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gelenadmin.map((row) => (
                      <tr key={row.id}>
                        <td style={{ textAlign: "center" }}>{row.ad}</td>
                        <td style={{ textAlign: "center" }}>{row.soyad}</td>
                        <td style={{ textAlign: "center" }}>{row.kullanıcıadı}</td>
                        <td style={{ textAlign: "center" }}>{row.sifre}</td>
                        <td style={{ textAlign: "center" }}>{row.rol}</td>
                        <td style={{ textAlign: "center" }}>{row.mail}</td>
                        <td style={{ textAlign: "center" }}>{row.telno}</td>


                        <td style={{ textAlign: "center" }}>
                          <IconButton color='error' aria-label="delete" size="large" onClick={() => handleDelete(row.id)} className="btn btn-danger" style={{ marginLeft: "5px" }} >
                            <DeleteIcon />
                          </IconButton>


                        </td>
                      </tr>
                    ))}
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
export default Admin;