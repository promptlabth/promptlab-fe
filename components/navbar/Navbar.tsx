/**
 * Navigation Bar using Bootstrap 5
 */

import Link from "next/link"
import { t } from "../language"
import { navbarConstans } from "./constant"
import { useLanguage } from "@/language/ LanguageContext";
import { useEffect, useState } from "react";


export const Navbar = () => {
    const { language } = useLanguage();
    const [sellingTitle, setSellingTitle] = useState(t(navbarConstans.sellingPostTitle));
    const [createEmailTitle, setcreateEmailTitle] = useState(t(navbarConstans.createEmailTitle));
    const [createArticalTitle, setcreateArticalTitle] = useState(t(navbarConstans.createArticalTitle));
    const [createScriptsTitle, setcreateScriptsTitle] = useState(t(navbarConstans.createScriptsTitle));

    useEffect(() => {
        setSellingTitle(t(navbarConstans.sellingPostTitle, language));
        setcreateEmailTitle(t(navbarConstans.createEmailTitle, language));
        setcreateArticalTitle(t(navbarConstans.createArticalTitle, language));
        setcreateScriptsTitle(t(navbarConstans.createScriptsTitle, language));

    }, [language]);


    return (
        <nav className="navbar navbar-expand-lg bg-success p-0">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <text className="fs-3 text-dark pe-2">
                        <b> Prompt Lab </b>
                    </text>
                    <li className="nav-item">
                        <Link className="nav-link" href="/createSellingPost">{sellingTitle}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/createEmail">{createEmailTitle}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/createArticle">{createArticalTitle}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/createShortVideoScripts">{createScriptsTitle}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/createImage">Create Image</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};