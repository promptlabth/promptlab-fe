/**
 * Navigation Bar using Bootstrap 5
 */

import Link from "next/link"

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-success p-0">
            <div className="container-fluid">
                <h3 className="p-2 pe-3 fs-3 d-flex"> <b> Prompt Lab </b> </h3>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" href="/createSellingPost"> Create Selling Post </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/createEmail">Create Email message</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/createArticle">Create Article</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/createShortVideoScripts">Create Video Script</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/createImage">Create Image</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};