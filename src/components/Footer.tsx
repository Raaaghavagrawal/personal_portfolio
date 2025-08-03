import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Footer.scss'

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="social-links">
          <a href="https://github.com/Raaaghavagrawal" target="_blank" rel="noreferrer"><GitHubIcon/></a>
          <a href="https://www.linkedin.com/in/raghav-agrawal-4431932ab/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
        </div>
        <p>Portfolio by Raghav Agrawal made with 💜</p>
      </div>
    </footer>
  );
}

export default Footer;