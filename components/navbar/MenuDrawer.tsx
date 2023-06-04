import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Noto_Sans_Thai } from 'next/font/google'
import LoginComponent from './LoginButton';
import { urlLinks } from "./constant";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from '../../languages/language';
import { useRouter } from 'next/router';
import Link from "next/link";


const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })

export const MenuDrawer = () => {
    const { language } = useLanguage();
    const [titles, setTitles] = useState(urlLinks.map(({ titleKey }) => translate(titleKey, language)));
    const [show, setShow] = useState(true);
    const [profileImage, setProfileImage] = useState<string>("")
    const router = useRouter()


    const handleLogin = (result: any) => {
        console.log("Login successful, do something with the result:", result);
        setProfileImage(result['user']['photoURL']);
        // setLoginStatus(true);
        // You can use the result here or update the state of your parent component
    };
    
    useEffect(() => {
        setTitles(urlLinks.map(({ titleKey }) => translate(titleKey, language)));
    }, [language]);


    return (
        <div>
            <Offcanvas
                className={`${noto_sans_thai.className} bg-dark`}
                show={show}
            >   
                <Offcanvas.Header className='border p-2' closeButton>
                    <Offcanvas.Title className='container d-flex justify-content-center'>
                        <h2 className='text-white'>
                            <b>Prompt Lab</b>
                        </h2>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='p-0'>
                    <Container fluid="true" className='description border d-flex justify-content-center'>
                        <h5 className='text-white'>
                            ล็อกอินเพื่อลองสนุกกับ Prompt Lab กัน!
                        </h5>
                    </Container>
                    <Container className='p-2 border d-flex justify-content-center'>
                        <LoginComponent />
                    </Container>
                    <Container className='border p-0'>
                        <ul className="list-group">
                            {urlLinks.map(({ href }, index) => (
                                <Link
                                    key={index}
                                    href={href}
                                    className="fs-6 category-list text-decoration-none"
                                    style={{
                                        background: href === router.pathname ? "rgb(255, 255, 255,0.8)" : "",
                                        color: href === router.pathname ? "black" : ""
                                    }}
                                >
                                    {titles[index]}
                                </Link>
                            ))}
                        </ul>

                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}