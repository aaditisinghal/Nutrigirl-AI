# 📧 Email Setup Guide for NutriGirl

This guide will help you set up Gmail SMTP to send detailed nutrition reports via email.

## 🔧 Prerequisites

1. **Gmail Account**: You need a Gmail account
2. **App Password**: Gmail requires a 12-digit app password (not your regular password)

## 📋 Step-by-Step Setup

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Sign in to your Gmail account
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the setup process to enable 2FA

### Step 2: Generate App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click **App passwords**
3. Select **Mail** as the app
4. Select **Other (Custom name)** as the device
5. Enter "NutriGirl App" as the name
6. Click **Generate**
7. **Copy the 12-digit password** (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Update Server Configuration
1. Open `server.js` in your code editor
2. Find these lines:
   ```javascript
   const GMAIL_USER = 'your-email@gmail.com'; // Replace with your Gmail
   const GMAIL_APP_PASSWORD = 'your-12-digit-app-password'; // Replace with your 12-digit app password
   ```
3. Replace with your actual Gmail and app password:
   ```javascript
   const GMAIL_USER = 'yourname@gmail.com';
   const GMAIL_APP_PASSWORD = 'abcd efgh ijkl mnop';
   ```

### Step 4: Install Dependencies
```bash
npm install
```

### Step 5: Start the Server
```bash
npm start
```

## 🚀 How It Works

1. **User enters email** in the Weekly Report section
2. **App generates detailed report** with nutrition data
3. **Server sends email** using Gmail SMTP
4. **User receives beautiful HTML report** in their inbox

## 📧 Email Features

### **Beautiful HTML Report Includes:**
- 📊 **Nutrition Summary** with key metrics
- 🍽️ **Top Foods** consumed this week
- 💡 **Health Insights** based on PCOS data
- 🎯 **Personalized Recommendations**
- 📈 **Daily Calorie Breakdown**
- 🏥 **Blood Report Integration**

### **Email Styling:**
- **NutriGirl branding** with gradient colors
- **Responsive design** for mobile and desktop
- **Professional layout** with clear sections
- **Interactive elements** and visual hierarchy

## 🔒 Security Notes

- **Never commit** your Gmail credentials to version control
- **Use environment variables** for production deployment
- **App passwords are safer** than regular passwords
- **2FA is required** for app password generation

## 🛠️ Troubleshooting

### **Common Issues:**

1. **"Invalid credentials" error**
   - Make sure you're using the 12-digit app password, not your regular password
   - Ensure 2FA is enabled on your Gmail account

2. **"Less secure app access" error**
   - This shouldn't happen with app passwords
   - Make sure you're using the correct app password format

3. **"Connection timeout" error**
   - Check your internet connection
   - Verify Gmail SMTP settings are correct

4. **"Authentication failed" error**
   - Double-check your Gmail address and app password
   - Make sure there are no extra spaces in the credentials

### **Test Email Functionality:**
1. Start the server: `npm start`
2. Open the app in browser
3. Go to Weekly Report section
4. Enter your email address
5. Click "Send Report"
6. Check your inbox for the detailed report

## 📱 Production Deployment

For production deployment, use environment variables:

```javascript
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
```

Set these in your hosting platform (Heroku, Vercel, etc.)

## 🎉 Success!

Once configured, users can:
- ✅ Enter their email address
- ✅ Receive detailed nutrition reports
- ✅ Get personalized PCOS recommendations
- ✅ Track their progress over time

Your NutriGirl app now has full email functionality! 🚀
