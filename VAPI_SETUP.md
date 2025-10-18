# VAPI Integration Setup for NutriGirl

## 🎯 Overview
This guide will help you set up VAPI (Voice AI Platform) integration to make voice calls about your weekly health reports. The calls will be made FROM VAPI's phone number 4044238776 TO the number +1 (402) 252 1632.

## 📋 Prerequisites
1. VAPI account (sign up at https://vapi.ai)
2. VAPI API key
3. Phone number verification

## 🔧 Setup Steps

### Step 1: Get VAPI API Key
1. Go to https://vapi.ai and create an account
2. Navigate to API Keys section
3. Create a new API key
4. Copy the API key

### Step 2: Update Configuration
Replace the placeholder in `script.js`:
```javascript
const VAPI_API_KEY = 'your-vapi-api-key-here'; // Replace with your actual VAPI API key
```

### Step 3: Configure VAPI Phone Number
1. In VAPI dashboard, go to Phone Numbers
2. Add the VAPI phone number: 4044238776 (this will be used to make the calls)
3. Verify the number if required
4. Note the phone number ID: e90ccb0c-f63b-4651-9a02-5f6110637a79

### Step 4: Update Configuration
In `script.js`, update:
```javascript
const VAPI_PHONE_NUMBER_ID = 'e90ccb0c-f63b-4651-9a02-5f6110637a79'; // VAPI phone number ID for making calls
const VAPI_PHONE_NUMBER = '4044238776'; // VAPI phone number that will make the calls
const CUSTOMER_PHONE_NUMBER = '+1 (402) 252 1632'; // Phone number that will receive the call
```

## 🎙️ How It Works

### Voice Call Flow
1. User clicks "Call My Weekly Report" button
2. App generates personalized weekly health report
3. VAPI uses their phone service (ID: e90ccb0c-f63b-4651-9a02-5f6110637a79) to call +1 (402) 252 1632
4. AI assistant reads the health report in a friendly voice
5. Call is recorded and stored locally

### Report Content
The voice call includes:
- Weekly nutrition summary (calories, protein, carbs, fat, sugar)
- PCOS-friendly rating
- Meal breakdown (breakfast, lunch, dinner, snacks)
- Top foods consumed
- Flagged foods (if any)
- Personalized recommendations

## 🔧 Customization

### Voice Settings
You can customize the voice in `makeVoiceCall()` function:
```javascript
voice: {
    provider: "elevenlabs", // or "openai", "azure", etc.
    voiceId: "21m00Tcm4TlvDq8ikWAM" // Change voice ID
}
```

### Call Message
Customize the first message in `makeVoiceCall()`:
```javascript
firstMessage: "Hello! I'm calling with your weekly NutriGirl health report..."
```

## 📊 Features

### Call History
- All calls are stored locally
- View call status and history
- Export call records

### Status Tracking
- Real-time call status updates
- Success/error notifications
- Loading indicators

## 🚨 Important Notes

### API Limits
- VAPI has usage limits based on your plan
- Monitor your usage in the VAPI dashboard
- Consider implementing rate limiting

### Privacy
- Phone numbers are stored locally
- Voice calls are processed by VAPI
- Review VAPI's privacy policy

### Costs
- VAPI charges per minute of call time
- Check current pricing on their website
- Monitor usage to avoid unexpected charges

## 🧪 Testing

### Test Call
1. Ensure you have some food logs in the app
2. Go to Weekly Report section
3. Click "Call My Weekly Report"
4. Check the status message
5. Answer the call when it comes

### Debug Mode
Enable console logging to see detailed call information:
```javascript
console.log('📞 Call initiated:', result);
```

## 🔧 Troubleshooting

### Common Issues
1. **API Key Invalid**: Check your VAPI API key
2. **Phone Number Not Verified**: Verify the number in VAPI dashboard
3. **Call Failed**: Check network connection and API limits
4. **No Data**: Ensure you have food logs to report on

### Error Messages
- "VAPI Error: 401" - Invalid API key
- "VAPI Error: 404" - Phone number not found
- "VAPI Error: 429" - Rate limit exceeded

## 📞 Support

For VAPI-specific issues:
- VAPI Documentation: https://docs.vapi.ai
- VAPI Support: support@vapi.ai

For NutriGirl app issues:
- Check browser console for errors
- Verify local storage is working
- Ensure weekly data exists

## 🎉 Success!

Once configured, users can:
1. Track their nutrition with the camera
2. Generate weekly reports
3. Receive voice calls with personalized health summaries
4. Get PCOS-friendly nutrition advice via phone

The integration provides a seamless way to stay connected with health goals through voice communication!
