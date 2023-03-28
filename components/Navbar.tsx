/**
 * Navigation Bar using Bootstrap 5
 */

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-success fixed-top">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <text className="fs-3 text-dark pe-2">
                        <b> Prompt Lab </b>
                    </text>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Create Selling Post</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Create Email message</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Create Article</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Create Video Script</a>
                    </li>
                </ul>
            </div>

        </nav>
    )
}
