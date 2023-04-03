import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
import { useLanguage } from '@/language/ LanguageContext';
import { t } from '../language';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { urlLinks } from './constant';

export const AppNavbar: React.FC = () => {
  const { language } = useLanguage();
  const [titles, setTitles] = useState(urlLinks.map(({ titleKey }) => t(titleKey, language)));

  useEffect(() => {
    setTitles(urlLinks.map(({ titleKey }) => t(titleKey, language)));
  }, [language]);

  return (
    <Navbar 
      className="p-0"
      bg="success" 
      expand="sm" 
      fixed="top">
      <Container fluid>
        <Navbar.Brand href="#" className="text-dark fs-3 p-1">
          <b>Prompt Lab</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navbar-nav">
            {urlLinks.map(({ href }, index) => (
              <Nav.Link key={index} href={href} className="nav-link">
                {titles[index]}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
