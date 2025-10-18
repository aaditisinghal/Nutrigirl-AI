# NutriGirl AI - PCOS Health Companion

A comprehensive web application designed specifically for women managing PCOS (Polycystic Ovary Syndrome) and PCOD (Polycystic Ovary Disease). NutriGirl AI helps track health vitals, analyze blood reports, monitor food intake, generate detailed health reports, and provides AI-powered exercise form analysis.

## Features

### 🏠 Landing Page
- Modern, female-focused design with pink and white color theme
- Animated floating cards showcasing key features
- Responsive layout optimized for all devices
- Clear call-to-action to start the health journey

### 📊 Health Dashboard
- **Vital Statistics Tracking**: Monitor heart rate, weight, blood sugar, and hormone levels
- **Real-time Health Status**: Color-coded indicators for different health metrics
- **Recent Activity Feed**: Track recent food logs and blood report uploads
- **Interactive Navigation**: Easy switching between different sections
- **Exercise Suggestions**: Light exercises and yoga recommendations for females
- **Micronutrient Levels**: Recent blood report analysis showing high, low, and normal levels

### 🩸 Blood Report Analysis
- **PDF Upload**: Drag-and-drop or click-to-upload blood report PDFs
- **AI-Powered Analysis**: Uses OpenAI GPT to analyze blood reports for PCOS-specific insights
- **Nutrient Assessment**: Identifies vitamin deficiencies, hormone imbalances, and vital signs
- **Personalized Diet Recommendations**: AI-generated diet plans based on blood work results

### 📸 Food Tracking with Camera
- **Real-time Camera Integration**: Access device camera for food photography
- **AI Food Analysis**: Uses OpenAI Vision API to analyze food photos
- **Nutritional Insights**: Provides calorie count, sugar content, and carbohydrate analysis
- **PCOS-Friendly Rating**: Rates food on a 1-10 scale for PCOS management
- **Food History**: Tracks daily food intake with healthy/flagged categorization

### 🏃‍♀️ Exercise Form Analysis
- **MediaPipe Integration**: Real-time skeleton detection using Google MediaPipe
- **AI Posture Analysis**: OpenAI-powered exercise form analysis
- **Multiple Exercise Types**: Squat, Plank, Push-up, and Yoga pose analysis
- **Voice Commands**: Say "analyze" to start posture analysis
- **PCOS-Friendly Tips**: Exercise recommendations specifically for women with PCOS

### 📞 Voice Call Integration
- **VAPI Integration**: Weekly AI health summary calls
- **Automated Reports**: AI assistant calls with personalized health insights
- **Phone Number Support**: Call assistance for health queries

### 💬 AI Chatbot
- **24/7 Support**: NutriBot chatbot for instant health queries
- **OpenAI Integration**: Powered by GPT for intelligent responses
- **Floating Interface**: Easy access from any page

### 📧 Email Reports
- **Gmail Integration**: Send detailed health reports via email
- **Comprehensive Logs**: Weekly nutrition and health summaries
- **Doctor-Ready Format**: Professional reports for healthcare providers

### 📈 Weekly Health Reports
- **Comprehensive Analytics**: Weekly summary of calories, sugar intake, and meals tracked
- **Health Score Calculation**: Overall health rating based on food choices
- **PDF Generation**: Downloadable reports for sharing with healthcare providers
- **Trend Analysis**: Track progress over time

## Technical Features

### 🤖 AI Integration
- **OpenAI GPT-4**: For blood report analysis, dietary recommendations, and exercise analysis
- **OpenAI GPT-4 Vision**: For food image analysis and nutritional assessment
- **MediaPipe Pose**: Real-time human pose detection for exercise analysis
- **VAPI.ai**: Voice call integration for weekly health summaries
- **Smart Prompting**: PCOS-specific prompts for accurate health insights

### 📱 Responsive Design
- **Mobile-First Approach**: Optimized for smartphones and tablets
- **Touch-Friendly Interface**: 44pt minimum touch targets as per Apple guidelines
- **Adaptive Layout**: Seamless experience across all screen sizes
- **Modern Color Scheme**: Pink and white theme with professional styling

### 💾 Data Management
- **Local Storage**: All data stored locally for privacy
- **Persistent History**: Food logs and health data persist between sessions
- **Export Capabilities**: Generate and download health reports
- **Email Integration**: Send reports directly via Gmail SMTP

## Setup Instructions

### Prerequisites
- Modern web browser with camera access
- Internet connection for AI API calls
- OpenAI API key (already configured)
- VAPI account for voice calls (optional)

### Installation
1. Clone or download the repository
2. Open `index.html` in a web browser
3. Allow camera permissions when prompted
4. Start using the application immediately

### File Structure
```
nutrigirl-ai/
├── index.html              # Main HTML file with landing page and dashboard
├── styles.css              # CSS styling
├── script.js               # JavaScript functionality
├── server.js               # Node.js server for email functionality
├── package.json            # Node.js dependencies
├── test_vapi_call.js       # VAPI integration test
├── VAPI_SETUP.md           # VAPI setup instructions
├── EMAIL_SETUP.md          # Email setup instructions
└── README.md               # This file
```

## Usage Guide

### Getting Started
1. **Landing Page**: Review features and click "Get Started Free"
2. **Dashboard Overview**: View your current health status and recent activity
3. **Blood Reports**: Upload PDF reports for AI analysis
4. **Food Tracker**: Use camera to photograph and analyze meals
5. **Exercise Analysis**: Get real-time posture feedback during workouts
6. **Weekly Reports**: Generate comprehensive health summaries

### Exercise Form Analysis
1. Navigate to "Exercise Analysis" section
2. Click "Start Camera" and allow camera access
3. Select your exercise type (Squat, Plank, Push-up, or Yoga)
4. Position yourself in the camera frame
5. Click "Analyze Position" or say "analyze" for voice control
6. Review AI-powered feedback on your form

### Voice Call Features
1. Go to "Voice Call" section
2. Click "Call Assistance" for immediate support
3. Schedule weekly AI health summary calls
4. Receive personalized health insights via phone

### Email Reports
1. Navigate to "Email Report" section
2. Enter your email address
3. Click "Send Report" to receive detailed health summary
4. Reports include comprehensive logs and key findings

## Design Principles

Following Apple's UI Design Guidelines:
- **44pt x 44pt minimum** touch targets for easy interaction
- **High contrast** text for better readability
- **Proper spacing** to prevent text overlap
- **High-resolution** graphics and icons
- **Consistent alignment** for visual hierarchy
- **Intuitive navigation** with clear information architecture
- **Modern color scheme** with pink and white theme

## Privacy & Security

- **Local Data Storage**: All personal health data stored locally on your device
- **No Server Storage**: No data sent to external servers except for AI analysis
- **Secure API Calls**: OpenAI API calls are made securely with proper authentication
- **User Control**: Complete control over data deletion and export
- **Encrypted Communication**: All API communications use HTTPS

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Future Enhancements

- Integration with wearable devices
- Advanced meal planning features
- Community support features
- Integration with healthcare providers
- Advanced analytics and insights
- More exercise types for form analysis
- Integration with fitness trackers

## Support

For technical support or feature requests, please refer to the application's built-in help system or contact the development team.

## License

This project is created for educational and personal use. Please ensure compliance with OpenAI's usage policies when using the AI features.

---

**NutriGirl AI** - Empowering your PCOS journey with technology and care. 💜
