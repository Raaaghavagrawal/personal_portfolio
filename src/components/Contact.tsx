import React, { useRef, useState } from 'react';
import '../assets/styles/Contact.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Paper, Grid, Fade, Zoom } from '@mui/material';

function Contact() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const form = useRef<HTMLFormElement>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const isNameValid = name.trim() !== '';
    const isEmailValid = email.trim() !== '' && validateEmail(email);
    const isMessageValid = message.trim() !== '';

    setNameError(!isNameValid);
    setEmailError(!isEmailValid);
    setMessageError(!isMessageValid);

    return isNameValid && isEmailValid && isMessageValid;
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Use local server in development, Vercel function in production
      const isDevelopment = process.env.NODE_ENV === 'development';
      const apiUrl = isDevelopment ? 'http://localhost:3001/send-email' : '/api/send-email';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        // Reset form
        setName('');
        setEmail('');
        setMessage('');
        setNameError(false);
        setEmailError(false);
        setMessageError(false);
      } else {
        throw new Error('Failed to send email');
      }
      
    } catch (error) {
      console.error('Error sending email:', error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => setShowSuccess(false);
  const handleCloseError = () => setShowError(false);

  const contactInfo = [
    {
      icon: <EmailIcon />,
      label: 'Email',
      value: 'agrawalraghav747@gmail.com',
      action: 'mailto:agrawalraghav747@gmail.com',
      color: '#FF6B6B'
    },
    {
      icon: <PhoneIcon />,
      label: 'Phone',
      value: '+91 9027469607',
      action: 'tel:+919027469607',
      color: '#4ECDC4'
    },
    {
      icon: <LocationOnIcon />,
      label: 'Location',
      value: 'Mathura, Uttar Pradesh, India',
      action: null,
      color: '#45B7D1'
    }
  ];

  return (
    <div id="contact" className="contact-section">
      <div className="contact-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="items-container">
        <div className="contact_wrapper">
          <Fade in timeout={1000}>
            <Box className="contact-header" textAlign="center" mb={6}>
              <Typography variant="h1" className="contact-title" sx={{ mb: 3 }}>
                Let's Connect
              </Typography>
              <Typography variant="h5" className="contact-subtitle" sx={{ maxWidth: '700px', mx: 'auto', mb: 2 }}>
                Ready to bring your ideas to life? I'm here to help you create something amazing.
              </Typography>
              <div className="contact-divider"></div>
            </Box>
          </Fade>

          <Grid container spacing={4}>
            {/* Contact Information */}
            <Grid item xs={12} lg={4}>
              <Zoom in timeout={1200}>
                <Paper elevation={0} className="contact-info-card">
                  <Box className="card-header">
                    <Typography variant="h4" className="card-title">
                      Get In Touch
                    </Typography>
                    <Typography variant="body1" className="card-subtitle">
                      I'm always excited to hear about new opportunities and collaborations.
                    </Typography>
                  </Box>
                  
                  <Box className="contact-details">
                    {contactInfo.map((info, index) => (
                      <Fade in timeout={1400 + index * 200} key={index}>
                        <Box className="contact-item">
                          <Box className="contact-icon" sx={{ backgroundColor: info.color }}>
                            {info.icon}
                          </Box>
                          <Box className="contact-content">
                            <Typography variant="body2" className="contact-label">
                              {info.label}
                            </Typography>
                            {info.action ? (
                              <Typography 
                                component="a" 
                                href={info.action}
                                variant="body1" 
                                className="contact-value link"
                              >
                                {info.value}
                              </Typography>
                            ) : (
                              <Typography variant="body1" className="contact-value">
                                {info.value}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Fade>
                    ))}
                  </Box>
                </Paper>
              </Zoom>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} lg={8}>
              <Zoom in timeout={1400}>
                <Paper elevation={0} className="contact-form-card">
                  <Box className="form-header">
                    <Typography variant="h4" className="form-title">
                      Send Message
                    </Typography>
                    <Typography variant="body1" className="form-subtitle">
                      Tell me about your project or just say hello!
                    </Typography>
                  </Box>
                  
          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
            className='contact-form'
                    onSubmit={sendEmail}
          >
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                      <Grid item xs={12} sm={6}>
              <TextField
                required
                          fullWidth
                          name="name"
                label="Your Name"
                          placeholder="What should I call you?"
                value={name}
                          onChange={(e) => setName(e.target.value)}
                error={nameError}
                helperText={nameError ? "Please enter your name" : ""}
                          className="form-field"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                              '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                              '&.Mui-focused fieldset': { borderColor: '#64b5f6' }
                            },
                            '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                            '& .MuiInputBase-input': { 
                              color: 'white',
                              fontSize: '1.1rem'
                            },
                            '& .MuiFormHelperText-root': { color: '#ff6b6b' }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
              <TextField
                required
                          fullWidth
                          name="email"
                          label="Email Address"
                          placeholder="your.email@example.com"
                value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          error={emailError}
                          helperText={emailError ? "Please enter a valid email address" : ""}
                          className="form-field"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                              '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                              '&.Mui-focused fieldset': { borderColor: '#64b5f6' }
                            },
                            '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                            '& .MuiInputBase-input': { 
                              color: 'white',
                              fontSize: '1.1rem'
                            },
                            '& .MuiFormHelperText-root': { color: '#ff6b6b' }
                          }}
                        />
                      </Grid>
                    </Grid>
                    
            <TextField
              required
                      fullWidth
                      name="message"
                      label="Your Message"
                      placeholder="Share your thoughts, project details, or just say hello..."
              multiline
                      rows={8}
              value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      error={messageError}
                      helperText={messageError ? "Please enter your message" : ""}
                      className="form-field message-field"
                      sx={{
                        mb: 4,
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                          '&.Mui-focused fieldset': { borderColor: '#64b5f6' }
                        },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                        '& .MuiInputBase-input': { 
                          color: 'white',
                          fontSize: '1.1rem',
                          lineHeight: 1.6
                        },
                        '& .MuiFormHelperText-root': { color: '#ff6b6b' }
                      }}
                    />
                    
                    <Box className="submit-section">
                      <Button 
                        variant="contained" 
                        endIcon={<SendIcon />} 
                        type="submit"
                        disabled={isSubmitting}
                        className="submit-button"
                        sx={{
                          background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
                          color: 'white',
                          px: 4,
                          py: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          borderRadius: '50px',
                          textTransform: 'none',
                          boxShadow: '0 8px 25px rgba(108, 117, 125, 0.3)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #495057 0%, #343a40 100%)',
                            transform: 'translateY(-3px)',
                            boxShadow: '0 12px 35px rgba(108, 117, 125, 0.4)'
                          },
                          '&:disabled': {
                            background: 'rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.5)',
                            transform: 'none',
                            boxShadow: 'none'
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send'}
            </Button>
          </Box>
                  </Box>
                </Paper>
              </Zoom>
            </Grid>
          </Grid>
        </div>
      </div>

      {/* Success/Error Notifications */}
      <Snackbar 
        open={showSuccess} 
        autoHideDuration={6000} 
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          zIndex: 9999,
          '& .MuiSnackbar-root': {
            zIndex: 9999
          }
        }}
      >
        <Alert 
          onClose={handleCloseSuccess} 
          severity="success" 
          className="notification-alert"
          sx={{
            backgroundColor: '#4caf50',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600, color: 'white' }}>
            Message sent successfully! 🎉
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            I'll get back to you within 24 hours.
          </Typography>
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={showError} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          zIndex: 9999,
          '& .MuiSnackbar-root': {
            zIndex: 9999
          }
        }}
      >
        <Alert 
          onClose={handleCloseError} 
          severity="error" 
          className="notification-alert"
          sx={{
            backgroundColor: '#f44336',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 4px 20px rgba(244, 67, 54, 0.3)',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600, color: 'white' }}>
            Oops! Something went wrong 😅
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            Please check your inputs and try again.
          </Typography>
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Contact;