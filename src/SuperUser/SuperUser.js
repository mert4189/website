import React from "react";
import Office from '../İmages/Ofiice.jpg'
import { Navbar, Container, Nav } from 'react-bootstrap';
import {  NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import '../App.css';


const Superuser = () =>{
  const getRol = useSelector(state => state.getRol);
  
  console.log(getRol)
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
              <NavLink exact activeClassName="active" to="/SuperUser/Admin" className="nav-link" >Admin</NavLink>
              <NavLink exact activeClassName="active" to="/SuperUser/Talepler" className="nav-link">Talepler</NavLink>
              <NavLink exact activeClassName="active" to="/SuperUser/KullanıcıOluştur" className="nav-link">Kullanıcı Oluştur</NavLink>
              <NavLink exact activeClassName="active" to="/SuperUser/Parametre" className="nav-link">Parametreler</NavLink>
            </Nav>
            <Nav>
              <NavLink exact activeClassName="active" to="/SuperUser" className="nav-link">Anasayfa</NavLink>
              <NavLink exact activeClassName="active" to="/" className="nav-link">Çıkış Yap</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>  
      )
    :
    (<div ></div>)
    }
      
    </>
  );
  
}
export default Superuser;