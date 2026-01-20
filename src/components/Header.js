import { Link, useLocation } from "react-router-dom"
export default function Header () {
    const location = useLocation();
    return (
        <div>
            <nav>
                <ul className="header-nav">
                    <li className={`nav-item ${location.pathname === "/home" ? "active" : ""}`}> <Link to='/home'>Home</Link></li>
                    <li className={`nav-item ${location.pathname === "/about" ? "active" : ""}`}> <Link to='/about'>About</Link></li>
                    <li className={`nav-item ${location.pathname === "/projects" ? "active" : ""}`}> <Link to='/projects'>Projects</Link></li>
                    <li className={`nav-item ${location.pathname === "/contact" ? "active" : ""}`}> <Link to='/contact'>Contact</Link></li>
                </ul>
            </nav>
        </div>
    )
}
