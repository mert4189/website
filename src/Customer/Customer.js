import React from "react";
import Office from '../İmages/Ofiice.jpg'
import { Navbar, Container, Nav } from 'react-bootstrap';
import {  NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

const Customer = () =>{
  const getRol = useSelector(state => state.getRol);
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
              <NavLink exact activeClassName="active" to="/Customer/YeniTalep" className="nav-link" >Yeni Talep</NavLink>
              <NavLink exact activeClassName="active" to="/Customer/GeçmişTalep" className="nav-link">Geçmiş Taleplerim</NavLink>
              <NavLink exact activeClassName="active" to="/Customer/AktifTalep" className="nav-link">Aktif Taleplerim</NavLink>
            </Nav>
            <Nav>
              <NavLink exact activeClassName="active" to="/Customer" className="nav-link">Anasayfa</NavLink>
              <NavLink exact activeClassName="active" to="/" className="nav-link">Çıkış Yap</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>  
      )
    :
    (<div></div>)
    }
      
    </>
  );
  
}
export default Customer;