import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { SiGmail } from "react-icons/si";
import { BiPhoneCall } from "react-icons/bi";


export default function Contact() {
  const email = 'fiqyyyy@gmail.com';
  const subject = encodeURIComponent('Hello from your portfolio');
  const body = encodeURIComponent('Hi, I found your site and would like to know more.');
  const mailto = `mailto:${email}?subject=${subject}&body=${body}`;

  return (    
    <div className="contact-container">
      <div className="contact-box">
          <button className='social-button'><a
              href={mailto}
              target="_blank"
              rel="noopener noreferrer"><SiGmail /></a>
          </button>
          <button className='social-button'><a
              href="https://linkedin.com/in/yfiqy"
              target="_blank"
              rel="noopener noreferrer"><FaLinkedin /></a>
          </button>
          <button className='social-button'><a
              href="https://github.com/fiqyy"
              target="_blank"
              rel="noopener noreferrer"><FaGithub /></a>
          </button>
          <button className='social-button'><a
              href="https://www.instagram.com/yousseffiqy/"
              target="_blank"
              rel="noopener noreferrer"><FaInstagram /></a>
          </button>
          <button className='social-button'><a href="tel:+201200096266">
              <BiPhoneCall />
            </a>
          </button>
      </div>
      <div className="info-box">
        <h3>Get In Touch</h3>
        <p>Feel free to reach out to me through any of the social links. I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hello, feel free to get in touch!</p>
      </div>
    </div>
  );

}
