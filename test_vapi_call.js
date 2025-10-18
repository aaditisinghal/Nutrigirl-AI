// Test VAPI Call Script
// This script tests the VAPI integration

const VAPI_API_KEY = '34d0e86c-cb88-48f3-b070-d4e109b9c6d1';
const VAPI_PHONE_NUMBER_ID = 'e90ccb0c-f63b-4651-9a02-5f6110637a79'; // VAPI phone number ID for making calls
const VAPI_PHONE_NUMBER = '+1 (402) 252 1632'; // VAPI phone number that will make the calls
const CUSTOMER_PHONE_NUMBER = '+14044238776'; // Phone number that will receive the call
const VAPI_BASE_URL = 'https://api.vapi.ai';

// Test data for weekly report - Realistic PCOS patient data
const testWeeklyData = {
    period: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        end: new Date().toLocaleDateString()
    },
    totalMeals: 14,
    totalCalories: 11200,
    totalProtein: 380,
    totalCarbs: 980,
    totalFat: 320,
    totalSugar: 65,
    totalFiber: 125,
    averagePCOSRating: 6.8,
    mealBreakdown: {
        breakfast: 5,
        lunch: 4,
        dinner: 4,
        snack: 1
    },
    flaggedFoods: 3,
    topFoods: [
        { food: "Grilled Chicken Breast", count: 5 },
        { food: "Steamed Broccoli", count: 4 },
        { food: "Brown Rice", count: 4 },
        { food: "Avocado", count: 3 },
        { food: "Greek Yogurt", count: 3 },
        { food: "Eggs", count: 3 },
        { food: "Sweet Potato", count: 2 }
    ],
    dailyCalories: [
        { date: "10/11/2025", calories: 1650 },
        { date: "10/12/2025", calories: 1800 },
        { date: "10/13/2025", calories: 1200 },
        { date: "10/14/2025", calories: 2000 },
        { date: "10/15/2025", calories: 1500 },
        { date: "10/16/2025", calories: 1850 },
        { date: "10/17/2025", calories: 1200 }
    ],
    healthInsights: [
        "Good protein intake but could be more consistent",
        "Some high glycemic foods affecting blood sugar stability",
        "Fiber intake is improving but still below optimal",
        "Omega-3 intake is adequate from fish consumption",
        "Meal timing shows some inconsistency on weekends"
    ],
    recommendations: [
        "Try to have breakfast within 1 hour of waking up",
        "Include more leafy greens like spinach and kale",
        "Consider adding nuts and seeds for healthy fats",
        "Aim for 3 balanced meals daily, even on busy days",
        "Reduce processed foods and focus on whole foods"
    ],
    challenges: [
        "Skipped breakfast twice this week",
        "Had pizza and pasta on Friday night",
        "Stress eating on Wednesday afternoon"
    ],
    improvements: [
        "Great job with meal prep on Sunday",
        "Excellent choice of quinoa over white rice",
        "Consistent with water intake"
    ]
};

// Generate voice-friendly report
function generateTestVoiceReport() {
    const summary = testWeeklyData;
    
    const voiceText = `
        Hi there! This is Sarah from NutriGirl, your personal PCOS nutrition companion. I'm calling with your weekly health report for ${summary.period.start} to ${summary.period.end}.
        
        Let me share your nutrition summary with you:
        You tracked ${summary.totalMeals} meals this week - that's a good start! We're aiming for consistency, and every meal you log helps us understand your patterns better.
        Your total calorie intake was ${summary.totalCalories.toLocaleString()} calories, averaging about ${Math.round(summary.totalCalories/7)} calories per day. This is within a healthy range for PCOS management.
        
        Here's your macronutrient breakdown:
        ${summary.totalProtein} grams of protein - that's decent, but we'd love to see this a bit higher for better hormone balance.
        ${summary.totalCarbs} grams of carbohydrates - good choices overall, though we noticed some higher glycemic foods this week.
        ${summary.totalFat} grams of healthy fats - this is good for hormone production.
        ${summary.totalSugar} grams of sugar - this is actually quite good for PCOS management, well done!
        And ${summary.totalFiber} grams of fiber - we're making progress here, but there's room for improvement.
        
        Your NutriGirl PCOS-friendly rating this week was ${summary.averagePCOSRating} out of 10. We're seeing progress, and that's what matters most!
        
        Meal consistency this week:
        You had ${summary.mealBreakdown.breakfast} breakfasts - breakfast is so important for PCOS, so let's work on making this more consistent.
        ${summary.mealBreakdown.lunch} lunches - good effort here.
        ${summary.mealBreakdown.dinner} dinners - nice work with evening meals.
        And ${summary.mealBreakdown.snack} snacks - showing good portion control.
        
        Your most frequently consumed foods this week were:
        ${summary.topFoods.map((item, index) => `${index + 1}. ${item.food} - ${item.count} times`).join(', ')}.
        
        Here's what our NutriGirl AI noticed this week:
        ${summary.healthInsights.join('. ')}.
        
        You flagged ${summary.flaggedFoods} foods as potentially problematic for PCOS management - that's great awareness! Being mindful of your food choices is a huge step forward.
        
        Some challenges we noticed:
        ${summary.challenges.join('. ')}.
        
        But let's celebrate your improvements:
        ${summary.improvements.join('. ')}.
        
        Your NutriGirl recommendations for next week:
        ${summary.recommendations.join('. ')}.
        
        Your daily calorie intake varied quite a bit this week, from ${Math.min(...summary.dailyCalories.map(d => d.calories))} to ${Math.max(...summary.dailyCalories.map(d => d.calories))} calories per day. Consistency is key for PCOS management.
        
        ${summary.averagePCOSRating >= 7 ? 'Great work! You\'re making solid progress with your PCOS nutrition goals.' : 
          summary.averagePCOSRating >= 5 ? 'You\'re on the right track! Every small step counts in your PCOS journey.' : 
          'Remember, managing PCOS through nutrition is a journey, not a sprint. We\'re here to support you every step of the way.'}
        
        Remember, you're not alone in this journey. NutriGirl is here to support you with personalized nutrition guidance, meal tracking, and encouragement. Every healthy choice you make is a step toward better hormone balance and overall wellness.
        
        Keep up the great work! This is Sarah from NutriGirl, signing off. Have a wonderful day, and remember - you've got this!
    `;
    
    return voiceText.trim();
}

// Make test VAPI call
async function makeTestVAPICall() {
    try {
        console.log('🧪 Testing VAPI integration...');
        console.log('📞 VAPI Phone Number (calling from):', VAPI_PHONE_NUMBER);
        console.log('📞 Customer Phone Number (calling to):', CUSTOMER_PHONE_NUMBER);
        console.log('🔑 VAPI Phone Number ID:', VAPI_PHONE_NUMBER_ID);
        console.log('🔑 API Key:', VAPI_API_KEY.substring(0, 8) + '...');
        
        const voiceReport = generateTestVoiceReport();
        console.log('📝 Generated test report:', voiceReport.substring(0, 200) + '...');
        
        // Create VAPI call request
        const callData = {
            phoneNumberId: VAPI_PHONE_NUMBER_ID,
            customer: {
                number: CUSTOMER_PHONE_NUMBER
            },
            assistant: {
                model: {
                    provider: "openai",
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: `You are a helpful nutrition assistant for PCOS management. Read the following weekly health report in a friendly, encouraging tone: ${voiceReport}`
                        }
                    ],
                    temperature: 0.7,
                    maxTokens: 1000
                },
                voice: {
                    provider: "11labs",
                    voiceId: "21m00Tcm4TlvDq8ikWAM"
                },
                firstMessage: "Hello! I'm calling with your weekly NutriGirl health report. Let me share your nutrition summary with you."
            }
        };
        
        console.log('🚀 Sending VAPI request...');
        
        const response = await fetch(`${VAPI_BASE_URL}/call`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${VAPI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(callData)
        });
        
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ VAPI Error:', errorText);
            throw new Error(`VAPI Error: ${response.status} - ${errorText}`);
        }
        
        const result = await response.json();
        console.log('✅ VAPI call initiated successfully!');
        console.log('📞 Call ID:', result.id);
        console.log('📊 Call Status:', result.status);
        console.log('📱 Full Response:', result);
        
        return result;
        
    } catch (error) {
        console.error('❌ Test call failed:', error);
        return null;
    }
}

// Run the test
console.log('🎯 Starting VAPI Test...');
console.log('='.repeat(50));

makeTestVAPICall()
    .then(result => {
        if (result) {
            console.log('🎉 Test completed successfully!');
            console.log('📞 Check your phone at', CUSTOMER_PHONE_NUMBER, 'for the call!');
        } else {
            console.log('❌ Test failed. Check the errors above.');
        }
    })
    .catch(error => {
        console.error('💥 Test crashed:', error);
    });
