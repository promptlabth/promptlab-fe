import React, { useState, useEffect, } from 'react';
// import Link from 'next/link';
import { useLanguage } from '@/language/ LanguageContext';
import { t } from '../language';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { urlLinks } from './constant';
import { useRouter } from 'next/router';
import LoginComponent from './LoginButton';

export const AppNavbar: React.FC = () => {
    const { language } = useLanguage();
    const [titles, setTitles] = useState(urlLinks.map(({ titleKey }) => t(titleKey, language)));    
    const router = useRouter()
    const [pathname, setPathname] = useState<string>("createSellingPost")
    const [profileImage, setProfileImage] = useState<string>("")
    const [loginStatus , setLoginStatus] = useState(false);

    useEffect(() => {
        if(router.pathname === "/"){
            setPathname("/createSellingPost")
        } else{
            setPathname(router.pathname)
        }
        setTitles(urlLinks.map(({ titleKey }) => t(titleKey, language)));
    }, [language]);


    const handleLogin = (result: any) => {
        console.log("Login successful, do something with the result:", result);
        setProfileImage(result['user']['photoURL']);
        setLoginStatus(true);
        // You can use the result here or update the state of your parent component
      };


    return (
        <Navbar className="p-0" bg="success" expand="sm" fixed="top">
            <Container fluid>
                <Navbar.Brand href="#" className="text-dark fs-3 p-1">
                    <b>Prompt Lab</b>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="navbar-nav container">
                        {urlLinks.map(({ href }, index) => (
                            <Nav.Link 
                                key={index} 
                                href={href}
                                style={{ 
                                    background: href === pathname ? "rgb(255, 255, 255,0.8)" : "",
                                    color:"black"
                                }}
                            >
                                {titles[index]}
                            </Nav.Link>
                        ))}
                            
                    </Nav>
                    <div>
                        { !loginStatus && <LoginComponent onLogin={handleLogin}/> }
                    </div>
                </Navbar.Collapse>
                { loginStatus && <img src={profileImage}/> }
            
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
