// NutriGirl AI - PCOS Health Companion
// Main JavaScript functionality

// Storage keys for local data persistence
const STORAGE_KEYS = {
    FOOD_LOGS: 'nutrigirl_food_logs',
    BLOOD_REPORTS: 'nutrigirl_blood_reports',
    WEEKLY_REPORTS: 'nutrigirl_weekly_reports',
    VOICE_CALLS: 'nutrigirl_voice_calls',
    ANALYSIS_HISTORY: 'nutrigirl_analysis_history',
    PCOS_DATA: 'nutrigirl_pcos_data'
};

// OpenAI API configuration
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE';

// VAPI Configuration
const VAPI_API_KEY = '34d0e86c-cb88-48f3-b070-d4e109b9c6d1';
const VAPI_PHONE_NUMBER_ID = 'e90ccb0c-f63b-4651-9a02-5f6110637a79'; // VAPI phone number ID for making calls
const VAPI_PHONE_NUMBER = '+1 (402) 252 1632'; // VAPI phone number that will make the calls
const CUSTOMER_PHONE_NUMBER = '+14044238776'; // Customer phone number to call

// Global variables
let currentStream = null;
let isAnalyzing = false;
let currentExercise = 'squat';
let voiceRecognition = null;

// Exercise Analysis with MediaPipe
let pose = null;
let camera = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    showLandingPage();
    initializeStorage();
    initializeChatbot();
    initializeExerciseAnalysis();
}

// Show landing page
function showLandingPage() {
    const landingPage = document.getElementById('landing-page');
    const dashboard = document.getElementById('dashboard');
    
    if (landingPage && dashboard) {
        landingPage.style.display = 'block';
        dashboard.style.display = 'none';
    }
}

// Go to dashboard
function goToDashboard() {
    const landingPage = document.getElementById('landing-page');
    const dashboard = document.getElementById('dashboard');
    
    if (landingPage && dashboard) {
        landingPage.style.display = 'none';
        dashboard.style.display = 'block';
        loadDashboardData();
    }
}

// Initialize local storage
function initializeStorage() {
    // Initialize empty arrays for all storage keys if they don't exist
    Object.values(STORAGE_KEYS).forEach(key => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify([]));
        }
    });
}

// Load dashboard data
function loadDashboardData() {
    loadFoodHistory();
    loadBloodReports();
    loadWeeklyReports();
    loadVoiceCalls();
    loadPCOSData();
    generateSampleData();
}

// Generate sample data for demonstration
function generateSampleData() {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOOD_LOGS) || '[]');
    
    if (existingData.length === 0) {
        const sampleData = [
            {
                id: Date.now() - 86400000,
                timestamp: new Date(Date.now() - 86400000).toISOString(),
                food: 'Grilled Chicken Salad',
                nutrition: {
                    calories: 320,
                    sugar: 8,
                    carbs: 25,
                    protein: 28,
                    fat: 12
                },
                pcosRating: 8,
                mealType: 'lunch',
                flagged: false,
                healthy: true
            },
            {
                id: Date.now() - 43200000,
                timestamp: new Date(Date.now() - 43200000).toISOString(),
                food: 'Quinoa Bowl with Vegetables',
                nutrition: {
                    calories: 280,
                    sugar: 12,
                    carbs: 45,
                    protein: 12,
                    fat: 8
                },
                pcosRating: 9,
                mealType: 'dinner',
                flagged: false,
                healthy: true
            },
            {
                id: Date.now() - 21600000,
                timestamp: new Date(Date.now() - 21600000).toISOString(),
                food: 'Greek Yogurt with Berries',
                nutrition: {
                    calories: 150,
                    sugar: 15,
                    carbs: 20,
                    protein: 15,
                    fat: 2
                },
                pcosRating: 7,
                mealType: 'snack',
                flagged: false,
                healthy: true
            }
        ];
        
        localStorage.setItem(STORAGE_KEYS.FOOD_LOGS, JSON.stringify(sampleData));
        loadFoodHistory();
    }
}

// Load food history
function loadFoodHistory() {
    const foodLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOOD_LOGS) || '[]');
    const historyContainer = document.getElementById('foodHistory');
    
    if (historyContainer) {
        if (foodLogs.length === 0) {
            historyContainer.innerHTML = '<p>No food logs yet. Start tracking your meals!</p>';
        } else {
            historyContainer.innerHTML = foodLogs.slice(-5).reverse().map(log => `
                <div class="food-log-item">
                    <div class="food-info">
                        <h4>${log.food}</h4>
                        <p>${new Date(log.timestamp).toLocaleString()}</p>
                    </div>
                    <div class="food-stats">
                        <span class="calories">${log.nutrition.calories} cal</span>
                        <span class="rating ${log.healthy ? 'healthy' : 'flagged'}">${log.pcosRating}/10</span>
                    </div>
                </div>
            `).join('');
        }
    }
}

// Load blood reports
function loadBloodReports() {
    const bloodReports = JSON.parse(localStorage.getItem(STORAGE_KEYS.BLOOD_REPORTS) || '[]');
    const reportsContainer = document.getElementById('bloodReports');
    
    if (reportsContainer) {
        if (bloodReports.length === 0) {
            reportsContainer.innerHTML = '<p>No blood reports uploaded yet.</p>';
        } else {
            reportsContainer.innerHTML = bloodReports.slice(-3).reverse().map(report => `
                <div class="report-item">
                    <h4>${report.filename}</h4>
                    <p>Uploaded: ${new Date(report.timestamp).toLocaleDateString()}</p>
                    <div class="report-summary">
                        <span class="status ${report.status}">${report.status}</span>
                    </div>
                </div>
            `).join('');
        }
    }
}

// Load weekly reports
function loadWeeklyReports() {
    const weeklyReports = JSON.parse(localStorage.getItem(STORAGE_KEYS.WEEKLY_REPORTS) || '[]');
    const reportsContainer = document.getElementById('weeklyReports');
    
    if (reportsContainer) {
        if (weeklyReports.length === 0) {
            reportsContainer.innerHTML = '<p>No weekly reports generated yet.</p>';
        } else {
            reportsContainer.innerHTML = weeklyReports.slice(-3).reverse().map(report => `
                <div class="report-item">
                    <h4>Week of ${new Date(report.weekStart).toLocaleDateString()}</h4>
                    <p>Health Score: ${report.healthScore}/100</p>
                    <div class="report-stats">
                        <span>Calories: ${report.totalCalories}</span>
                        <span>Meals: ${report.totalMeals}</span>
                    </div>
                </div>
            `).join('');
        }
    }
}

// Load voice calls
function loadVoiceCalls() {
    const voiceCalls = JSON.parse(localStorage.getItem(STORAGE_KEYS.VOICE_CALLS) || '[]');
    const callsContainer = document.getElementById('voiceCalls');
    
    if (callsContainer) {
        if (voiceCalls.length === 0) {
            callsContainer.innerHTML = '<p>No voice calls scheduled yet.</p>';
        } else {
            callsContainer.innerHTML = voiceCalls.slice(-3).reverse().map(call => `
                <div class="call-item">
                    <h4>${call.type}</h4>
                    <p>${new Date(call.timestamp).toLocaleString()}</p>
                    <div class="call-status ${call.status}">${call.status}</div>
                </div>
            `).join('');
        }
    }
}

// Load PCOS data
function loadPCOSData() {
    const pcosData = JSON.parse(localStorage.getItem(STORAGE_KEYS.PCOS_DATA) || '[]');
    
    // Update micronutrient levels
    updateMicronutrientLevels();
    
    // Update exercise suggestions
    updateExerciseSuggestions();
}

// Update micronutrient levels
function updateMicronutrientLevels() {
    const micronutrientContainer = document.getElementById('micronutrientLevels');
    if (micronutrientContainer) {
        const sampleLevels = [
            { nutrient: 'Vitamin D', level: 'Low', status: 'low' },
            { nutrient: 'Iron', level: 'Normal', status: 'normal' },
            { nutrient: 'B12', level: 'High', status: 'high' },
            { nutrient: 'Folate', level: 'Normal', status: 'normal' }
        ];
        
        micronutrientContainer.innerHTML = sampleLevels.map(level => `
            <div class="micronutrient-item ${level.status}">
                <span class="nutrient-name">${level.nutrient}</span>
                <span class="nutrient-level">${level.level}</span>
            </div>
        `).join('');
    }
}

// Update exercise suggestions
function updateExerciseSuggestions() {
    const exerciseContainer = document.getElementById('exerciseSuggestions');
    if (exerciseContainer) {
        const exercises = [
            { name: 'Morning Yoga', duration: '15 min', type: 'yoga' },
            { name: 'Light Walking', duration: '30 min', type: 'cardio' },
            { name: 'Pilates', duration: '20 min', type: 'strength' }
        ];
        
        exerciseContainer.innerHTML = exercises.map(exercise => `
            <div class="exercise-item">
                <h4>${exercise.name}</h4>
                <p>${exercise.duration} • ${exercise.type}</p>
            </div>
        `).join('');
    }
}

// Camera functionality
async function startCamera() {
    try {
        const video = document.getElementById('cameraVideo');
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 640, height: 480 } 
        });
        
        video.srcObject = stream;
        currentStream = stream;
        
        document.getElementById('startCameraBtn').style.display = 'none';
        document.getElementById('captureBtn').style.display = 'inline-block';
        document.getElementById('stopCameraBtn').style.display = 'inline-block';
        
    } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Could not access camera. Please check permissions.');
    }
}

function stopCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }
    
    const video = document.getElementById('cameraVideo');
    video.srcObject = null;
    
    document.getElementById('startCameraBtn').style.display = 'inline-block';
    document.getElementById('captureBtn').style.display = 'none';
    document.getElementById('stopCameraBtn').style.display = 'none';
}

async function captureFood() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
    // Show loading
    const resultDiv = document.getElementById('analysisResult');
    resultDiv.innerHTML = '<div class="loading">Analyzing your food...</div>';
    
    try {
        const analysis = await analyzeFoodWithOpenAI(imageData);
        displayFoodAnalysis(analysis);
    } catch (error) {
        console.error('Error analyzing food:', error);
        resultDiv.innerHTML = '<div class="error">Error analyzing food. Please try again.</div>';
    }
}

// Analyze food with OpenAI
async function analyzeFoodWithOpenAI(imageData) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Analyze this food image for a woman with PCOS. Provide: 1) Food name, 2) Estimated calories, 3) Sugar content, 4) Carbohydrate content, 5) Protein content, 6) Fat content, 7) PCOS-friendly rating (1-10), 8) Health recommendations. Format as JSON."
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: imageData
                            }
                        }
                    ]
                }
            ],
            max_tokens: 500,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
}

// Display food analysis
function displayFoodAnalysis(analysis) {
    const resultDiv = document.getElementById('analysisResult');
    
    resultDiv.innerHTML = `
        <div class="analysis-result">
            <h3>${analysis.food_name}</h3>
            <div class="nutrition-grid">
                <div class="nutrition-item">
                    <span class="label">Calories:</span>
                    <span class="value">${analysis.calories}</span>
                </div>
                <div class="nutrition-item">
                    <span class="label">Sugar:</span>
                    <span class="value">${analysis.sugar}g</span>
                </div>
                <div class="nutrition-item">
                    <span class="label">Carbs:</span>
                    <span class="value">${analysis.carbs}g</span>
                </div>
                <div class="nutrition-item">
                    <span class="label">Protein:</span>
                    <span class="value">${analysis.protein}g</span>
                </div>
                <div class="nutrition-item">
                    <span class="label">Fat:</span>
                    <span class="value">${analysis.fat}g</span>
                </div>
                <div class="nutrition-item">
                    <span class="label">PCOS Rating:</span>
                    <span class="value rating">${analysis.pcos_rating}/10</span>
                </div>
            </div>
            <div class="recommendations">
                <h4>Recommendations:</h4>
                <p>${analysis.recommendations}</p>
            </div>
            <div class="action-buttons">
                <button onclick="saveFoodLog('${analysis.food_name}', ${analysis.calories}, ${analysis.sugar}, ${analysis.carbs}, ${analysis.protein}, ${analysis.fat}, ${analysis.pcos_rating})" class="btn-primary">Save as Healthy</button>
                <button onclick="flagFoodLog('${analysis.food_name}', ${analysis.calories}, ${analysis.sugar}, ${analysis.carbs}, ${analysis.protein}, ${analysis.fat}, ${analysis.pcos_rating})" class="btn-secondary">Flag for Review</button>
            </div>
        </div>
    `;
}

// Save food log
function saveFoodLog(food, calories, sugar, carbs, protein, fat, rating) {
    const foodLog = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        food: food,
        nutrition: {
            calories: calories,
            sugar: sugar,
            carbs: carbs,
            protein: protein,
            fat: fat
        },
        pcosRating: rating,
        mealType: 'meal',
        flagged: false,
        healthy: true
    };
    
    const existingLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOOD_LOGS) || '[]');
    existingLogs.push(foodLog);
    localStorage.setItem(STORAGE_KEYS.FOOD_LOGS, JSON.stringify(existingLogs));
    
    loadFoodHistory();
    alert('Food logged successfully!');
}

// Flag food log
function flagFoodLog(food, calories, sugar, carbs, protein, fat, rating) {
    const foodLog = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        food: food,
        nutrition: {
            calories: calories,
            sugar: sugar,
            carbs: carbs,
            protein: protein,
            fat: fat
        },
        pcosRating: rating,
        mealType: 'meal',
        flagged: true,
        healthy: false
    };
    
    const existingLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOOD_LOGS) || '[]');
    existingLogs.push(foodLog);
    localStorage.setItem(STORAGE_KEYS.FOOD_LOGS, JSON.stringify(existingLogs));
    
    loadFoodHistory();
    alert('Food flagged for review!');
}

// Blood report analysis
async function analyzeBloodReport() {
    const fileInput = document.getElementById('bloodReportInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a PDF file');
        return;
    }
    
    const resultDiv = document.getElementById('bloodAnalysisResult');
    resultDiv.innerHTML = '<div class="loading">Analyzing your blood report...</div>';
    
    try {
        const analysis = await analyzeBloodReportWithOpenAI(file);
        displayBloodAnalysis(analysis);
        
        // Save blood report
        const bloodReport = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            filename: file.name,
            status: 'analyzed',
            analysis: analysis
        };
        
        const existingReports = JSON.parse(localStorage.getItem(STORAGE_KEYS.BLOOD_REPORTS) || '[]');
        existingReports.push(bloodReport);
        localStorage.setItem(STORAGE_KEYS.BLOOD_REPORTS, JSON.stringify(existingReports));
        
        loadBloodReports();
        
    } catch (error) {
        console.error('Error analyzing blood report:', error);
        resultDiv.innerHTML = '<div class="error">Error analyzing blood report. Please try again.</div>';
    }
}

// Analyze blood report with OpenAI
async function analyzeBloodReportWithOpenAI(file) {
    // For demo purposes, we'll simulate the analysis
    // In a real implementation, you would extract text from PDF and send to OpenAI
    
    const mockAnalysis = {
        summary: "Your blood report shows some areas that need attention for PCOS management.",
        key_findings: [
            "Vitamin D levels are low (15 ng/mL) - consider supplementation",
            "Insulin resistance markers are elevated",
            "Testosterone levels are within normal range",
            "Cholesterol levels need monitoring"
        ],
        recommendations: [
            "Increase Vitamin D intake through supplements and sunlight",
            "Focus on low-glycemic index foods",
            "Regular exercise to improve insulin sensitivity",
            "Consider omega-3 supplements"
        ],
        pcos_score: 6
    };
    
    return mockAnalysis;
}

// Display blood analysis
function displayBloodAnalysis(analysis) {
    const resultDiv = document.getElementById('bloodAnalysisResult');
    
    resultDiv.innerHTML = `
        <div class="blood-analysis-result">
            <h3>Blood Report Analysis</h3>
            <div class="summary">
                <p>${analysis.summary}</p>
            </div>
            <div class="key-findings">
                <h4>Key Findings:</h4>
                <ul>
                    ${analysis.key_findings.map(finding => `<li>${finding}</li>`).join('')}
                </ul>
            </div>
            <div class="recommendations">
                <h4>Recommendations:</h4>
                <ul>
                    ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            <div class="pcos-score">
                <h4>PCOS Management Score: ${analysis.pcos_score}/10</h4>
            </div>
        </div>
    `;
}

// Voice call functionality
async function makeVoiceCall() {
    const resultDiv = document.getElementById('voiceCallResult');
    resultDiv.innerHTML = '<div class="loading">Initiating voice call...</div>';
    
    try {
        const response = await fetch('https://api.vapi.ai/call', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${VAPI_API_KEY}`
            },
            body: JSON.stringify({
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
                                content: "You are NutriGirl AI, a helpful health assistant for women with PCOS. Provide personalized nutrition advice and health tips. Keep responses conversational and supportive."
                            }
                        ]
                    },
                    voice: {
                        provider: "11labs",
                        voiceId: "21m00Tcm4TlvDq8ikWAM"
                    }
                }
            })
        });
        
        if (response.ok) {
            const result = await response.json();
            resultDiv.innerHTML = '<div class="success">Voice call initiated successfully! You should receive a call shortly.</div>';
            
            // Save voice call record
            const voiceCall = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                type: 'assistance_call',
                status: 'initiated',
                callId: result.id
            };
            
            const existingCalls = JSON.parse(localStorage.getItem(STORAGE_KEYS.VOICE_CALLS) || '[]');
            existingCalls.push(voiceCall);
            localStorage.setItem(STORAGE_KEYS.VOICE_CALLS, JSON.stringify(existingCalls));
            
            loadVoiceCalls();
        } else {
            throw new Error(`VAPI API error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error making voice call:', error);
        resultDiv.innerHTML = '<div class="error">Error initiating voice call. Please try again.</div>';
    }
}

// Email report functionality
async function sendEmailReport() {
    const email = document.getElementById('emailInput').value;
    if (!email) {
        alert('Please enter an email address');
        return;
    }
    
    const resultDiv = document.getElementById('emailResult');
    resultDiv.innerHTML = '<div class="loading">Sending email report...</div>';
    
    try {
        const response = await fetch('http://localhost:8000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                reportData: generateComprehensiveEmailReport()
            })
        });
        
        if (response.ok) {
            resultDiv.innerHTML = '<div class="success">Email report sent successfully!</div>';
        } else {
            throw new Error('Failed to send email');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        resultDiv.innerHTML = '<div class="error">Failed to send email. Please try again.</div>';
    }
}

// Generate comprehensive email report
function generateComprehensiveEmailReport() {
    const weeklyLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOOD_LOGS) || '[]');
    const bloodReports = JSON.parse(localStorage.getItem(STORAGE_KEYS.BLOOD_REPORTS) || '[]');
    const voiceCalls = JSON.parse(localStorage.getItem(STORAGE_KEYS.VOICE_CALLS) || '[]');
    
    const report = {
        date: new Date().toISOString(),
        weeklyStats: {
            totalCalories: getDailyCalories(),
            totalMeals: weeklyLogs.length,
            healthyMeals: weeklyLogs.filter(log => log && log.healthy).length,
            flaggedMeals: weeklyLogs.filter(log => log && log.flagged).length,
            averagePCOSRating: calculateAveragePCOSRating()
        },
        topFoods: getTopFoods(),
        bloodReportSummary: bloodReports.length > 0 ? bloodReports[bloodReports.length - 1] : null,
        voiceCallSummary: voiceCalls.length > 0 ? voiceCalls[voiceCalls.length - 1] : null,
        recommendations: generateRecommendations()
    };
    
    return report;
}

// Helper functions
function getDailyCalories() {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOOD_LOGS) || '[]');
    return logs.reduce((total, log) => {
        return total + (log && log.nutrition ? log.nutrition.calories : 0);
    }, 0);
}

function getTopFoods() {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOOD_LOGS) || '[]');
    const foodCounts = {};
    
    logs.forEach(log => {
        if (log && log.food) {
            foodCounts[log.food] = (foodCounts[log.food] || 0) + 1;
        }
    });
    
    return Object.entries(foodCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([food, count]) => ({ food, count }));
}

function calculateAveragePCOSRating() {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOOD_LOGS) || '[]');
    const validLogs = logs.filter(log => log && log.pcosRating);
    
    if (validLogs.length === 0) return 0;
    
    const total = validLogs.reduce((sum, log) => sum + log.pcosRating, 0);
    return Math.round(total / validLogs.length * 10) / 10;
}

function generateRecommendations() {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOOD_LOGS) || '[]');
    const avgRating = calculateAveragePCOSRating();
    
    let recommendations = [];
    
    if (avgRating < 6) {
        recommendations.push("Focus on more PCOS-friendly foods");
        recommendations.push("Consider reducing sugar intake");
    }
    
    if (logs.filter(log => log && log.flagged).length > logs.length * 0.3) {
        recommendations.push("Review flagged foods with a nutritionist");
    }
    
    recommendations.push("Continue tracking your meals daily");
    recommendations.push("Consider regular blood work monitoring");
    
    return recommendations;
}

// Chatbot functionality
function initializeChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbot = document.getElementById('chatbot');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            chatbot.classList.toggle('active');
        });
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    const typingId = addMessage('NutriBot is typing...', 'bot', true);
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are NutriBot, a helpful AI assistant for women with PCOS. Provide supportive, evidence-based advice about nutrition, exercise, and PCOS management. Keep responses concise and encouraging."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                max_tokens: 200,
                temperature: 0.7
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            const botMessage = data.choices[0].message.content;
            
            // Remove typing indicator and add bot response
            removeMessage(typingId);
            addMessage(botMessage, 'bot');
        } else {
            throw new Error('Failed to get response');
        }
    } catch (error) {
        console.error('Error getting chatbot response:', error);
        removeMessage(typingId);
        addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
}

function addMessage(message, sender, isTyping = false) {
    const chatMessages = document.getElementById('chatMessages');
    const messageId = isTyping ? 'typing-' + Date.now() : null;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    if (messageId) messageDiv.id = messageId;
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageId;
}

function removeMessage(messageId) {
    const message = document.getElementById(messageId);
    if (message) {
        message.remove();
    }
}

// Exercise Analysis with MediaPipe
async function initializePose() {
    pose = new Pose({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
    });
    
    pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });
    
    pose.onResults(onPoseResults);
}

// Handle pose detection results
function onPoseResults(results) {
    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (results.poseLandmarks) {
        // Draw pose landmarks
        drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, {color: '#FF1493', lineWidth: 2});
        drawLandmarks(ctx, results.poseLandmarks, {color: '#FF69B4', lineWidth: 1, radius: 3});
        
        // Update pose indicator
        updatePoseIndicator(true);
    } else {
        updatePoseIndicator(false);
    }
}

// Update pose indicator
function updatePoseIndicator(poseDetected) {
    // Enable/disable capture button based on pose detection
    document.getElementById('captureFrame').disabled = !poseDetected;
}

// Initialize exercise analysis
function initializeExerciseAnalysis() {
    // Initialize MediaPipe
    initializePose();
    
    // Camera controls
    document.getElementById('startCamera').addEventListener('click', startCamera);
    document.getElementById('stopCamera').addEventListener('click', stopCamera);
    document.getElementById('captureFrame').addEventListener('click', captureFrame);
    
    // Exercise selection
    document.querySelectorAll('.exercise-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.exercise-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentExercise = this.dataset.exercise;
            updateKeyPoints();
        });
    });
    
    // Voice control
    document.getElementById('startVoiceControl').addEventListener('click', startVoiceControl);
    
    // Initialize key points
    updateKeyPoints();
}

// Start camera
async function startCamera() {
    try {
        const video = document.getElementById('videoElement');
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 640, height: 480 } 
        });
        
        video.srcObject = stream;
        video.play();
        
        // Start pose detection
        camera = new Camera(video, {
            onFrame: async () => {
                await pose.send({image: video});
            },
            width: 640,
            height: 480
        });
        camera.start();
        
        // Update UI
        document.getElementById('startCamera').disabled = true;
        document.getElementById('stopCamera').disabled = false;
        document.getElementById('captureFrame').disabled = false;
        
    } catch (error) {
        console.error('Error starting camera:', error);
        alert('Could not access camera. Please check permissions.');
    }
}

// Stop camera
function stopCamera() {
    if (camera) {
        camera.stop();
        camera = null;
    }
    
    const video = document.getElementById('videoElement');
    if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
    
    // Update UI
    document.getElementById('startCamera').disabled = false;
    document.getElementById('stopCamera').disabled = true;
    document.getElementById('captureFrame').disabled = true;
    
    // Clear canvas
    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    updatePoseIndicator(false);
}

// Capture frame for analysis
function captureFrame() {
    const video = document.getElementById('videoElement');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to base64 image
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
    // Show analyzing status
    showAnalyzingStatus();
    
    // Send to OpenAI for analysis
    analyzePostureWithOpenAI(imageData, currentExercise);
}

// Show analyzing status
function showAnalyzingStatus() {
    const resultCard = document.getElementById('analysisResult');
    resultCard.innerHTML = `
        <div class="result-header">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Analyzing Posture...</span>
        </div>
        <div class="result-content">
            <p>Please wait while we analyze your ${currentExercise} form using AI...</p>
        </div>
    `;
}

// Analyze posture with OpenAI
async function analyzePostureWithOpenAI(imageData, exerciseType) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: `Analyze this ${exerciseType} exercise form for a woman. Provide detailed feedback on:
                                1. Overall form score (0-100)
                                2. Specific areas that need improvement
                                3. Safety concerns
                                4. Tips for better form
                                5. PCOS-friendly exercise modifications if applicable
                                
                                Be specific and helpful. Focus on proper alignment, breathing, and injury prevention.`
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: imageData
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const analysis = data.choices[0].message.content;
        
        // Display the analysis result
        displayOpenAIAnalysis(analysis, exerciseType);
        
    } catch (error) {
        console.error('Error analyzing posture:', error);
        displayErrorAnalysis(error.message);
    }
}

// Display OpenAI analysis result
function displayOpenAIAnalysis(analysis, exerciseType) {
    const resultCard = document.getElementById('analysisResult');
    
    // Extract score from analysis if present
    const scoreMatch = analysis.match(/(\d+)\s*\/\s*100|score[:\s]*(\d+)|(\d+)%/i);
    const score = scoreMatch ? parseInt(scoreMatch[1] || scoreMatch[2] || scoreMatch[3]) : 85;
    
    let scoreColor = '#28a745'; // Green
    if (score < 70) scoreColor = '#dc3545'; // Red
    else if (score < 85) scoreColor = '#ffc107'; // Yellow
    
    resultCard.innerHTML = `
        <div class="result-header">
            <i class="fas fa-chart-line"></i>
            <span>${exerciseType.charAt(0).toUpperCase() + exerciseType.slice(1)} Analysis</span>
        </div>
        <div class="result-content">
            <div class="score-display" style="text-align: center; margin-bottom: 1rem;">
                <div style="font-size: 2rem; font-weight: bold; color: ${scoreColor};">${score}%</div>
                <div style="color: var(--text-pink);">AI Form Score</div>
            </div>
            <div class="ai-analysis" style="color: var(--text-pink); line-height: 1.6;">
                ${analysis.replace(/\n/g, '<br>')}
            </div>
        </div>
    `;
}

// Display error analysis
function displayErrorAnalysis(errorMessage) {
    const resultCard = document.getElementById('analysisResult');
    resultCard.innerHTML = `
        <div class="result-header">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Analysis Error</span>
        </div>
        <div class="result-content">
            <p style="color: var(--text-pink);">Sorry, there was an error analyzing your posture:</p>
            <p style="color: #dc3545; font-size: 0.9rem;">${errorMessage}</p>
            <p style="color: var(--text-pink); margin-top: 1rem;">Please try again or check your internet connection.</p>
        </div>
    `;
}

// Update key points based on exercise
function updateKeyPoints() {
    const keyPointsList = document.getElementById('keyPointsList');
    const points = {
        squat: [
            "Keep feet shoulder-width apart",
            "Lower until thighs parallel to floor",
            "Keep knees behind toes",
            "Maintain straight back"
        ],
        plank: [
            "Keep body in straight line",
            "Engage core muscles",
            "Hold position steadily",
            "Breathe normally"
        ],
        pushup: [
            "Keep hands shoulder-width apart",
            "Lower chest to ground",
            "Keep body straight",
            "Push up explosively"
        ],
        yoga: [
            "Focus on breathing",
            "Maintain balance",
            "Hold pose steadily",
            "Keep shoulders relaxed"
        ]
    };
    
    keyPointsList.innerHTML = points[currentExercise].map(point => `<li>${point}</li>`).join('');
}

// Start voice control
function startVoiceControl() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        voiceRecognition = new SpeechRecognition();
        
        voiceRecognition.continuous = true;
        voiceRecognition.interimResults = false;
        voiceRecognition.lang = 'en-US';
        
        voiceRecognition.onstart = function() {
            document.getElementById('voiceStatus').textContent = 'Listening... Say "analyze" to start';
            document.getElementById('voiceIcon').style.color = '#28a745';
        };
        
        voiceRecognition.onresult = function(event) {
            const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
            if (command.includes('analyze')) {
                captureFrame();
                document.getElementById('voiceStatus').textContent = 'Analysis started!';
            }
        };
        
        voiceRecognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            document.getElementById('voiceStatus').textContent = 'Voice recognition error';
        };
        
        voiceRecognition.start();
    } else {
        alert('Voice recognition not supported in this browser');
    }
}
