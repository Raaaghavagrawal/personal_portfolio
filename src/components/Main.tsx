import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img 
            src={`${process.env.PUBLIC_URL}/profileimg.png`}
            alt="Avatar" 
            onLoad={() => console.log('Profile image loaded successfully')}
            onError={(e) => console.error('Failed to load profile image:', e)}
            style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/Raaaghavagrawal" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/raghav-agrawal-4431932ab/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
          <h1>Raghav Agrawal</h1>
          <p>Full Stack Developer</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/Raaaghavagrawal" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/raghav-agrawal-4431932ab/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;