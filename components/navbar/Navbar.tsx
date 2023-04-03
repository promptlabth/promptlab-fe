import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/language/ LanguageContext';
import { t } from '../language';

import { Navbar, Nav, Container } from 'react-bootstrap';

const navbarLinks = [
  { titleKey: 'navbar.title.sellingPost', href: '/createSellingPost' },
  { titleKey: 'navbar.title.createEmail', href: '/createEmail' },
  { titleKey: 'navbar.title.createArticle', href: '/createArticle' },
  { titleKey: 'navbar.title.createScripts', href: '/createShortVideoScripts' },
  { titleKey: 'navbar.title.createImage', href: '/createImage' },
];

export const AppNavbar: React.FC = () => {
  const { language } = useLanguage();
  const [titles, setTitles] = useState(
    navbarLinks.map(({ titleKey }) => t(titleKey, language))
  );

  useEffect(() => {
    setTitles(navbarLinks.map(({ titleKey }) => t(titleKey, language)));
  }, [language]);

  return (
    <Navbar bg="success" expand="sm" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#" className="text-dark">
          <b>Prompt Lab</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navbar-nav">
            {navbarLinks.map(({ href }, index) => (
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
