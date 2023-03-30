/**
 * Navigation Bar using Bootstrap 5
 */

import Link from "next/link"

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-success fixed-top">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <text className="fs-3 text-dark pe-2">
                        <b> Prompt Lab </b>
                    </text>
                    <li className="nav-item">
                        <Link className="nav-link" href="/createSellingPost">Create Selling Post</Link>
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
                </ul>
            </div>

        </nav>
    )
}
