import Link from "next/link";

/**
 * Footer using Bootstrap 5
 */
const Footer = () => {
    return (
        <footer className="p-0 bg-dark bg-gradient text-center text-lg-start bg-opacity-75">
            <div className="pe-6 ps-5">
                <div className="row">
                    <div className="p-5 col-lg-6 col-md-12 mb-4 mb-md-0">

                        <p className="fs-3 fw-bold">
                            Using powerful AI to make your all things
                        </p>

                        <p className="fs-3 fw-bold">
                            Prompt Lab can do better than possibly you imagine!!
                        </p>
                    </div>

                    <div className="pt-4 col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="fs-3 fw-semibold">Categories</h5>
                        <ul className="list-group">
                            <Link className="fs-6 category-list text-decoration-none" href="/createSellingPost"> Create Selling Post </Link>
                            <Link className="fs-6 category-list text-decoration-none" href="/createEmail">Create Email message</Link>
                            <Link className="fs-6 category-list text-decoration-none" href="/createArticle">Create Article</Link>
                            <Link className="fs-6 category-list text-decoration-none" href="/createShortVideoScripts">Create Video Script</Link>
                            <Link className="fs-6 category-list text-decoration-none" href="/createImage">Create Image</Link>

                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-dark text-center p-3 bg-opacity-50">
                <text className="text-light"> Thanks to Bootstrap 5 to make </text>
                <text className="text-light fs-1"> Prompt Lab</text>
                <text className="text-light"> a wonderful website</text>
            </div>
        </footer>
    )
}
export default Footer;

