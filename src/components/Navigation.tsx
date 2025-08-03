import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import List from '@mui/material/List';
import ListIcon from '@mui/icons-material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import { alpha } from '@mui/material/styles';

const drawerWidth = 280;
const navItems = [['Expertise', 'expertise'], ['History', 'history'], ['Projects', 'projects'], ['Contact', 'contact']];

function Navigation({parentToChild, modeChange}: any) {

  const {mode} = parentToChild;

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/Resume_RaghavAgrawal.pdf`;
    link.download = 'Resume_RaghavAgrawal.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navigation");
      if (navbar) {
        const scrolled = window.scrollY > navbar.clientHeight;
        setScrolled(scrolled);
      }

      // Update active section based on scroll position
      const sections = navItems.map(item => item[1]);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section);
    }
    setMobileOpen(false);
  };

  const drawer = (
    <Box className="navigation-drawer" onClick={handleDrawerToggle} sx={{ 
      textAlign: 'center',
      height: '100%',
      background: mode === 'dark' ? '#0d1116' : '#f8f9fa'
    }}>
      <Box sx={{ 
        p: 3, 
        borderBottom: `1px solid ${mode === 'dark' ? '#333' : '#e0e0e0'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1
      }}>
        <ListIcon sx={{ color: mode === 'dark' ? '#fff' : '#0d1116' }} />
        <Typography variant="h6" sx={{ 
          color: mode === 'dark' ? '#fff' : '#0d1116',
          fontWeight: 600,
          fontFamily: '"Lato", sans-serif'
        }}>
          Menu
        </Typography>
      </Box>
      <List sx={{ pt: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item[0]} disablePadding sx={{ mb: 1 }}>
            <ListItemButton 
              sx={{ 
                textAlign: 'center',
                mx: 2,
                borderRadius: 2,
                backgroundColor: activeSection === item[1] 
                  ? (mode === 'dark' ? alpha('#fff', 0.1) : alpha('#0d1116', 0.1))
                  : 'transparent',
                '&:hover': {
                  backgroundColor: mode === 'dark' ? alpha('#fff', 0.05) : alpha('#0d1116', 0.05),
                  transform: 'translateX(5px)',
                  transition: 'all 0.3s ease'
                },
                transition: 'all 0.3s ease'
              }} 
              onClick={() => scrollToSection(item[1])}
            >
              <ListItemText 
                primary={item[0]} 
                sx={{
                  '& .MuiListItemText-primary': {
                    color: mode === 'dark' ? '#fff' : '#0d1116',
                    fontFamily: '"Lato", sans-serif',
                    fontWeight: activeSection === item[1] ? 600 : 400,
                    fontSize: '1.1rem'
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        
        {/* Download Resume in Mobile Menu */}
        <ListItem disablePadding sx={{ mb: 1, mt: 2 }}>
          <ListItemButton 
            sx={{ 
              textAlign: 'center',
              mx: 2,
              borderRadius: 2,
              backgroundColor: mode === 'dark' ? alpha('#64b5f6', 0.1) : alpha('#1976d2', 0.1),
              border: `1px solid ${mode === 'dark' ? '#64b5f6' : '#1976d2'}`,
              '&:hover': {
                backgroundColor: mode === 'dark' ? alpha('#64b5f6', 0.2) : alpha('#1976d2', 0.2),
                transform: 'translateX(5px)',
                transition: 'all 0.3s ease'
              },
              transition: 'all 0.3s ease'
            }} 
            onClick={handleDownloadResume}
          >
            <DownloadIcon sx={{ mr: 1, color: mode === 'dark' ? '#64b5f6' : '#1976d2' }} />
            <ListItemText 
              primary="Download Resume" 
              sx={{
                '& .MuiListItemText-primary': {
                  color: mode === 'dark' ? '#64b5f6' : '#1976d2',
                  fontFamily: '"Lato", sans-serif',
                  fontWeight: 600,
                  fontSize: '1.1rem'
                }
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        component="nav" 
        id="navigation" 
        className={`navbar-fixed-top${scrolled ? ' scrolled' : ''}`}
        elevation={scrolled ? 8 : 0}
        sx={{
          background: scrolled 
            ? (mode === 'dark' ? 'rgba(13, 17, 22, 0.95)' : 'rgba(248, 249, 250, 0.95)')
            : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: scrolled ? `1px solid ${mode === 'dark' ? '#333' : '#e0e0e0'}` : 'none'
        }}
      >
        <Toolbar className='navigation-bar' sx={{ 
          minHeight: '70px',
          px: { xs: 2, sm: 4 },
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2, 
                display: { sm: 'none' },
                color: mode === 'dark' ? '#fff' : '#0d1116',
                '&:hover': {
                  backgroundColor: mode === 'dark' ? alpha('#fff', 0.1) : alpha('#0d1116', 0.1)
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            
            {/* Brand/Logo */}
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                fontSize: '1.5rem',
                fontFamily: '"Lato", sans-serif',
                color: mode === 'dark' ? '#fff' : '#0d1116',
                cursor: 'pointer',
                '&:hover': {
                  color: mode === 'dark' ? '#64b5f6' : '#1976d2',
                  transition: 'color 0.3s ease'
                }
              }}
              onClick={() => scrollToSection('main')}
            >
              Portfolio
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
            {navItems.map((item) => (
              <Button 
                key={item[0]} 
                onClick={() => scrollToSection(item[1])} 
                sx={{ 
                  color: mode === 'dark' ? '#fff' : '#0d1116',
                  fontFamily: '"Lato", sans-serif',
                  fontSize: '1rem',
                  fontWeight: activeSection === item[1] ? 600 : 400,
                  textTransform: 'none',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: mode === 'dark' ? alpha('#fff', 0.1) : alpha('#0d1116', 0.1),
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  },
                  '&::after': activeSection === item[1] ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60%',
                    height: '2px',
                    backgroundColor: mode === 'dark' ? '#64b5f6' : '#1976d2',
                    borderRadius: '1px'
                  } : {},
                  transition: 'all 0.3s ease'
                }}
              >
                {item[0]}
              </Button>
            ))}
            
            {/* Download Resume Button - Desktop */}
            <Button 
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadResume}
              sx={{ 
                color: mode === 'dark' ? '#64b5f6' : '#1976d2',
                borderColor: mode === 'dark' ? '#64b5f6' : '#1976d2',
                fontFamily: '"Lato", sans-serif',
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'none',
                px: 2,
                py: 1,
                borderRadius: 2,
                ml: 2,
                '&:hover': {
                  backgroundColor: mode === 'dark' ? alpha('#64b5f6', 0.1) : alpha('#1976d2', 0.1),
                  borderColor: mode === 'dark' ? '#64b5f6' : '#1976d2',
                  transform: 'translateY(-2px)',
                  boxShadow: mode === 'dark' 
                    ? '0 4px 12px rgba(100, 181, 246, 0.3)' 
                    : '0 4px 12px rgba(25, 118, 210, 0.3)',
                  transition: 'all 0.3s ease'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Resume
            </Button>
          </Box>

          {/* Theme Toggle */}
          <IconButton
            onClick={() => modeChange()}
            sx={{
              color: mode === 'dark' ? '#fff' : '#0d1116',
              backgroundColor: mode === 'dark' ? alpha('#fff', 0.1) : alpha('#0d1116', 0.1),
              '&:hover': {
                backgroundColor: mode === 'dark' ? alpha('#fff', 0.2) : alpha('#0d1116', 0.2),
                transform: 'rotate(180deg)',
                transition: 'all 0.3s ease'
              },
              transition: 'all 0.3s ease',
              ml: 2
            }}
          >
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              background: mode === 'dark' ? '#0d1116' : '#f8f9fa'
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navigation;