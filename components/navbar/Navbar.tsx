// Navbar.tsx
import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { useLanguage } from '@/language/ LanguageContext';
import { t } from '../language';

const navbarLinks = [
    { titleKey: 'navbar.title.sellingPost', href: '/createSellingPost' },
    { titleKey: 'navbar.title.createEmail', href: '/createEmail' },
    { titleKey: 'navbar.title.createArticle', href: '/createArticle' },
    { titleKey: 'navbar.title.createScripts', href: '/createShortVideoScripts' },
    { titleKey: 'navbar.title.createImage', href: '/createImage' },
];

export const Navbar: React.FC = () => {
    const { language } = useLanguage();
    const [titles, setTitles] = useState(
        navbarLinks.map(({ titleKey }) => t(titleKey, language))
    );

    useEffect(() => {
        setTitles(navbarLinks.map(({ titleKey }) => t(titleKey, language)));
    }, [language]);

    return (
        <nav className="navbar navbar-expand-sm bg-success fixed-top">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <span className="fs-3 text-dark pe-2">
                        <b> Prompt Lab </b>
                    </span>
                    {navbarLinks.map(({ href }, index) => (
                        <li className="nav-item" key={index}>
                            <Link className="nav-link" href={href}>
                                {titles[index]}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};
