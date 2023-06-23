import React, { useEffect, useState } from "react";
import Office from '../İmages/Ofiice.jpg'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

const Superuser = () => {
  const getRol = useSelector(state => state.getRol);
  const [initialLoad, setInitialLoad] = useState(true);
  console.log(getRol.rol);
 
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
                  <NavLink exact activeClassName="active" to="/Admin/Talepler" className="nav-link">Talepler</NavLink> 
                  <NavLink exact activeClassName="active" to="/Admin/ParametreOluştur" className="nav-link">Parametreler</NavLink> 
                  <NavLink exact activeClassName="active" to="/Admin/KullanıcıOluştur" className="nav-link">Kullanıcı Oluştur</NavLink>
                </Nav>
                <Nav>
                  <NavLink exact activeClassName="active" to="/Admin" className="nav-link">Anasayfa</NavLink>
                  <NavLink exact activeClassName="active" to="/" className="nav-link">Çıkış Yap</NavLink>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>  
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Superuser;
