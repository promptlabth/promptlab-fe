import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
import { useLanguage } from '@/language/ LanguageContext';
import { t } from '../language';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { urlLinks } from './constant';
import { useRouter } from 'next/router';
import LoginComponent from './LoginButton';
import { Noto_Sans_Thai } from 'next/font/google'
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })

export const AppNavbar: React.FC = () => {
    const { language } = useLanguage();
    const [titles, setTitles] = useState(urlLinks.map(({ titleKey }) => t(titleKey, language)));
    const router = useRouter()
    const [pathname, setPathname] = useState<string>("createSellingPost")
    const [profileImage, setProfileImage] = useState<string>("")
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        if (router.pathname === "/") {
            setPathname("/createSellingPost")
        } else {
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
        <Navbar className={`${noto_sans_thai.className} p-0`} bg="success" expand="lg" fixed="top">
            <Container fluid>
                <Navbar.Brand className="text-dark fs-3 p-1">
                    <b>Prompt Lab</b>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-mf`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end"
                    className={`${noto_sans_thai.className} bg-dark`}
                >
                    <Offcanvas.Header className={noto_sans_thai.className}>
                        <Offcanvas.Title className='w-100 p-0 d-flex justify-content-center'>
                            <h2 className='text-white'>
                                <b>Prompt Lab</b>
                            </h2>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='ps-2 p-0'>
                        <hr className="m-0 mb-2 bg-white" style={{ height: "2px" }} />
                        <Nav className='flex-grow-1'>
                            {urlLinks.map(({ href }, index) => (
                                <Nav.Link
                                    className='ps-2 category-list text-decoration-none'
                                    key={index}
                                    href={href}
                                    style={{
                                        background: href === pathname ? "rgb(255, 255, 255,0.8)" : "",
                                        color: "black"
                                    }}
                                >
                                    {titles[index]}
                                </Nav.Link>
                            ))}
                        </Nav>
                        <hr className="m-0 mb-2 bg-white" style={{ height: "2px" }} />
                        { !loginStatus &&
                            <div className='d-flex justify-content-center align-self-center'>
                                <LoginComponent onLogin={handleLogin} />
                            </div>
                        }
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                {loginStatus && <img className="rounded-circle" alt="avatarImage" src={profileImage} />}

            </Container>
        </Navbar>
    );
};

export default AppNavbar;
