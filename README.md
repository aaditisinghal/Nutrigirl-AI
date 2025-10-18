# NutriGirl - PCOS Health Companion

A comprehensive web application designed specifically for women managing PCOS (Polycystic Ovary Syndrome) and PCOD (Polycystic Ovary Disease). NutriGirl helps track health vitals, analyze blood reports, monitor food intake, and generate detailed health reports.

## Features

### 🏠 Landing Page
- Modern, female-focused design with gradient backgrounds
- Animated floating cards showcasing key features
- Responsive layout optimized for all devices
- Clear call-to-action to start the health journey

### 📊 Health Dashboard
- **Vital Statistics Tracking**: Monitor heart rate, weight, blood sugar, and hormone levels
- **Real-time Health Status**: Color-coded indicators for different health metrics
- **Recent Activity Feed**: Track recent food logs and blood report uploads
- **Interactive Navigation**: Easy switching between different sections

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

### 📈 Weekly Health Reports
- **Comprehensive Analytics**: Weekly summary of calories, sugar intake, and meals tracked
- **Health Score Calculation**: Overall health rating based on food choices
- **PDF Generation**: Downloadable reports for sharing with healthcare providers
- **Trend Analysis**: Track progress over time

## Technical Features

### 🤖 AI Integration
- **OpenAI GPT-3.5 Turbo**: For blood report analysis and dietary recommendations
- **OpenAI GPT-4 Vision**: For food image analysis and nutritional assessment
- **Smart Prompting**: PCOS-specific prompts for accurate health insights

### 📱 Responsive Design
- **Mobile-First Approach**: Optimized for smartphones and tablets
- **Touch-Friendly Interface**: 44pt minimum touch targets as per Apple guidelines
- **Adaptive Layout**: Seamless experience across all screen sizes

### 💾 Data Management
- **Local Storage**: All data stored locally for privacy
- **Persistent History**: Food logs and health data persist between sessions
- **Export Capabilities**: Generate and download health reports

## Setup Instructions

### Prerequisites
- Modern web browser with camera access
- Internet connection for AI API calls
- OpenAI API key (already configured)

### Installation
1. Download all files to a local directory
2. Open `index.html` in a web browser
3. Allow camera permissions when prompted
4. Start using the application immediately

### File Structure
```
nutrigirl/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Usage Guide

### Getting Started
1. **Landing Page**: Review features and click "Start Your Journey"
2. **Dashboard Overview**: View your current health status and recent activity
3. **Blood Reports**: Upload PDF reports for AI analysis
4. **Food Tracker**: Use camera to photograph and analyze meals
5. **Weekly Reports**: Generate comprehensive health summaries

### Blood Report Analysis
1. Navigate to "Blood Reports" section
2. Upload a PDF file by dragging and dropping or clicking to browse
3. Wait for AI analysis (typically 10-30 seconds)
4. Review key findings and dietary recommendations
5. Save recommendations for future reference

### Food Tracking
1. Go to "Food Tracker" section
2. Click "Start Camera" and allow camera access
3. Position your food plate in the camera view
4. Click "Capture" to take a photo
5. Review the AI analysis of your meal
6. Choose to save as healthy or flag for review
7. View your daily food history

### Weekly Reports
1. Navigate to "Weekly Report" section
2. Review your weekly statistics
3. Click "Generate Weekly Report" to create a downloadable summary
4. Share the report with your healthcare provider

## Design Principles

Following Apple's UI Design Guidelines:
- **44pt x 44pt minimum** touch targets for easy interaction
- **High contrast** text for better readability
- **Proper spacing** to prevent text overlap
- **High-resolution** graphics and icons
- **Consistent alignment** for visual hierarchy
- **Intuitive navigation** with clear information architecture

## Privacy & Security

- **Local Data Storage**: All personal health data stored locally on your device
- **No Server Storage**: No data sent to external servers except for AI analysis
- **Secure API Calls**: OpenAI API calls are made securely with proper authentication
- **User Control**: Complete control over data deletion and export

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

## Support

For technical support or feature requests, please refer to the application's built-in help system or contact the development team.

## License

This project is created for educational and personal use. Please ensure compliance with OpenAI's usage policies when using the AI features.

---

**NutriGirl** - Empowering your PCOS journey with technology and care. 💜
