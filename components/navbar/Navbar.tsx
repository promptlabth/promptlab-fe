import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/language/ LanguageContext';
import { t } from '../language';
import { Noto_Sans_Thai } from 'next/font/google'
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { urlLinks } from './constant';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import { RiMenu4Fill } from "react-icons/ri"


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
        <Navbar className="pt-3" expand="lg" fixed="top">
            <Container className="">
                <div className={styles.navbar_header}>
                    <h3>Prompt Lab</h3>
                </div>
                <Navbar.Toggle className={styles.offcanvas_toggler} aria-controls="offcanvasNavbar-expand-md">
                    <RiMenu4Fill className={styles.offcanvas_menu}/>
                </Navbar.Toggle>
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-mf`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end"
                    className="bg-dark"
                >
                    <Offcanvas.Header className="">
                        <Offcanvas.Title className='p-0 d-flex justify-content-center'>
                            <h2 className='text-white'>
                                <b>Prompt Lab</b>
                            </h2>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='ps-5 pe-5'>
                        <Nav className="justify-content-end flex-grow-1">
                            <div className={styles.container}>
                                <div className="ms-3 me-3">
                                    <button className={styles.navbar_help_button}>
                                        ศูนย์ช่วยเหลือ
                                    </button>
                                </div>
                                <div className="ms-3 me-3">
                                    <button className={styles.navbar_login_button}>
                                        เข้าสู่ระบบ
                                    </button>
                                </div>
                            </div>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>

        </Navbar>
    );
};

export default AppNavbar;
