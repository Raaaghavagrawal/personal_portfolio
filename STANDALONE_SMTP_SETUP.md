# 📧 Standalone SMTP Implementation Guide

## 🎯 **Goal**: Set up direct SMTP email functionality without third-party services

---

## **✅ What's Been Implemented:**

1. **Removed EmailJS** - No more third-party dependencies
2. **Created Node.js Backend** - Standalone SMTP server
3. **Updated Frontend** - Contact form now calls your backend API
4. **Secure Configuration** - Environment variables for credentials

---

## **🚀 Step-by-Step Setup:**

### **Step 1: Create Environment File**

Create a `.env` file in your project root:

```bash
# Copy the example file
cp env.example .env
```

Then edit `.env` with your actual credentials:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=3001
```

### **Step 2: Gmail App Password Setup (If using Gmail)**

**⚠️ Important**: Gmail requires an App Password, not your regular password.

1. **Enable 2-Factor Authentication**:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable "2-Step Verification" if not already enabled

2. **Generate App Password**:
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Name it "Portfolio Contact Form"
   - Copy the 16-character password
   - Use this password in your `.env` file

### **Step 3: Configure Email Service**

In `server.js`, you can change the email service:

**For Gmail (Default):**
```javascript
service: 'gmail'
```

**For Outlook/Hotmail:**
```javascript
service: 'outlook'
```

**For Yahoo:**
```javascript
service: 'yahoo'
```

**For Custom SMTP:**
```javascript
host: 'smtp.your-provider.com',
port: 587,
secure: false
```

### **Step 4: Start the Backend Server**

```bash
# Start the SMTP server
node server.js
```

You should see:
```
🚀 SMTP Server running on port 3001
📧 Email endpoint: http://localhost:3001/send-email
❤️  Health check: http://localhost:3001/health
```

### **Step 5: Start the Frontend**

In a new terminal:

```bash
# Start the React app
npm start
```

### **Step 6: Test the Contact Form**

1. Go to your contact form
2. Fill it out with test data
3. Submit the form
4. Check your email inbox!

---

## **🔧 Configuration Options:**

### **Change Email Service**

Edit `server.js` line 12:

```javascript
// For Gmail
service: 'gmail'

// For Outlook
service: 'outlook'

// For Yahoo
service: 'yahoo'

// For custom SMTP
host: 'smtp.your-provider.com',
port: 587,
secure: false
```

### **Change Email Template**

Edit the `mailOptions` in `server.js` (lines 30-70) to customize the email format.

### **Change Recipient Email**

Edit `server.js` line 32:

```javascript
to: 'your-email@gmail.com', // Change this to your email
```

---

## **📱 What You'll Receive:**

When someone submits your form, you'll get a beautifully formatted email:

```
Subject: New Contact Form Submission from John Doe

[HTML Email with styled content including:]
- Sender name and email
- Formatted message
- Timestamp
- Professional styling
```

---

## **🛠️ Troubleshooting:**

### **Common Issues:**

1. **"Authentication failed"**
   - ✅ Use App Password for Gmail (not regular password)
   - ✅ Check your `.env` file credentials

2. **"Connection refused"**
   - ✅ Make sure backend server is running (`node server.js`)
   - ✅ Check if port 3001 is available

3. **"CORS error"**
   - ✅ Backend has CORS enabled
   - ✅ Frontend is calling correct URL

4. **"Module not found"**
   - ✅ Run `npm install` to install dependencies

### **Testing Steps:**

1. **Test Backend**: Visit `http://localhost:3001/health`
2. **Test Frontend**: Start React app with `npm start`
3. **Test Form**: Submit contact form
4. **Check Email**: Look in your inbox

---

## **🚀 Production Deployment:**

### **For Local Development:**
- Backend: `node server.js` (port 3001)
- Frontend: `npm start` (port 3000)

### **For Production:**
- Deploy backend to a hosting service (Heroku, Vercel, etc.)
- Update frontend API URL to production backend URL
- Set environment variables on hosting platform

---

## **📋 File Structure:**

```
portfolio-new/
├── src/
│   └── components/
│       └── Contact.tsx          # Updated frontend
├── server.js                    # SMTP backend server
├── .env                         # Email credentials (create this)
├── env.example                  # Example environment file
└── package.json                 # Updated dependencies
```

---

## **🎉 Success!**

Once you complete this setup:

1. **No third-party dependencies** - Complete control over email sending
2. **Direct SMTP** - Emails sent directly from your server
3. **Secure** - Credentials stored in environment variables
4. **Customizable** - Full control over email templates and formatting
5. **Professional** - Beautiful HTML email formatting

**Your contact form will now send real emails directly to your inbox!** 🚀

---

## **🆘 Need Help?**

If you encounter issues:
1. Check the console for error messages
2. Verify your `.env` file is correct
3. Make sure both servers are running
4. Test the health endpoint: `http://localhost:3001/health`

**Ready to set up your email credentials?** 📧 