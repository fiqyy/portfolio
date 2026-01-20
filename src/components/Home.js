import { Link, useLocation, useNavigate } from "react-router-dom"
export default function Home() {
    const location = useLocation();
    const navigate = useNavigate();
  return (
    <div className="home">
      <h1 className="hi-text">Hi, I'm Youssef Fiqy</h1>
      <h2 className='hi-text2'>I'm a Web Developer</h2>
      <div className="button-container">
        <button className="home-button" onClick={() => navigate('/contact')}>Contact Me</button>
        <button className="home-button" onClick={() => navigate('/projects')}>Projects</button>
      </div>
    </div>
  );
}
