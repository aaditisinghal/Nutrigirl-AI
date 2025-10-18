const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Gmail SMTP Configuration
const GMAIL_USER = 'krishna@vfcloans.com'; // Your Gmail
const GMAIL_APP_PASSWORD = 'rljl xhjx oxuc fzrx'; // Your 12-digit app password

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD
    }
});

// Email endpoint
app.post('/send-report', async (req, res) => {
    try {
        const { userEmail, reportData } = req.body;
        
        if (!userEmail || !reportData) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and report data are required' 
            });
        }

        // Generate detailed HTML report
        const htmlReport = generateDetailedReport(reportData);
        
        // Email options
        const mailOptions = {
            from: GMAIL_USER,
            to: userEmail,
            subject: `NutriGirl Weekly Health Report - ${new Date().toLocaleDateString()}`,
            html: htmlReport
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        
        console.log('Email sent:', info.messageId);
        
        res.json({
            success: true,
            message: 'Report sent successfully!',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email. Please try again.',
            error: error.message
        });
    }
});

// Generate detailed HTML report
function generateDetailedReport(data) {
    const currentDate = new Date().toLocaleDateString();
    const weekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
    
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NutriGirl Weekly Report</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            }
            .header {
                background: linear-gradient(135deg, #ff6b9d, #ff8a80);
                color: white;
                padding: 30px;
                border-radius: 15px;
                text-align: center;
                margin-bottom: 30px;
                box-shadow: 0 10px 30px rgba(255, 107, 157, 0.3);
            }
            .header h1 {
                margin: 0 0 10px 0;
                font-size: 2.5rem;
                font-weight: 700;
            }
            .header p {
                margin: 0;
                font-size: 1.2rem;
                opacity: 0.9;
            }
            .section {
                background: white;
                padding: 25px;
                margin-bottom: 20px;
                border-radius: 15px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            .section h2 {
                color: #ff6b9d;
                margin-bottom: 20px;
                font-size: 1.8rem;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 20px;
            }
            .stat-card {
                background: linear-gradient(135deg, #ff6b9d, #ff8a80);
                color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
            }
            .stat-value {
                font-size: 2rem;
                font-weight: bold;
                margin-bottom: 5px;
            }
            .stat-label {
                font-size: 0.9rem;
                opacity: 0.9;
            }
            .food-list {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
            }
            .food-item {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 10px;
                border-left: 4px solid #ff6b9d;
            }
            .food-name {
                font-weight: bold;
                color: #333;
                margin-bottom: 5px;
            }
            .food-count {
                color: #666;
                font-size: 0.9rem;
            }
            .recommendations {
                background: #e8f5e8;
                padding: 20px;
                border-radius: 10px;
                border-left: 4px solid #28a745;
            }
            .recommendations h3 {
                color: #28a745;
                margin-top: 0;
            }
            .recommendations ul {
                margin: 0;
                padding-left: 20px;
            }
            .recommendations li {
                margin-bottom: 8px;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 10px;
                color: #666;
            }
            .icon {
                font-size: 1.2em;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🍎 NutriGirl Weekly Health Report</h1>
            <p>Your PCOS Nutrition Companion</p>
            <p>Report Period: ${weekStart} - ${currentDate}</p>
        </div>

        <div class="section">
            <h2><span class="icon">📊</span> Nutrition Summary</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${data.totalMeals || 0}</div>
                    <div class="stat-label">Meals Tracked</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${data.totalCalories || 0}</div>
                    <div class="stat-label">Total Calories</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${data.totalProtein || 0}g</div>
                    <div class="stat-label">Protein</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${data.totalCarbs || 0}g</div>
                    <div class="stat-label">Carbohydrates</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${data.totalFat || 0}g</div>
                    <div class="stat-label">Healthy Fats</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${data.averagePCOSRating || 0}/10</div>
                    <div class="stat-label">PCOS Rating</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2><span class="icon">🍽️</span> Top Foods This Week</h2>
            <div class="food-list">
                ${(data.topFoods || []).map(food => `
                    <div class="food-item">
                        <div class="food-name">${food.food}</div>
                        <div class="food-count">Consumed ${food.count} times</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2><span class="icon">💡</span> Health Insights</h2>
            <div class="recommendations">
                <h3>This Week's Analysis</h3>
                <ul>
                    ${(data.healthInsights || []).map(insight => `<li>${insight}</li>`).join('')}
                </ul>
            </div>
        </div>

        <div class="section">
            <h2><span class="icon">🎯</span> Recommendations</h2>
            <div class="recommendations">
                <h3>Next Week's Goals</h3>
                <ul>
                    ${(data.recommendations || []).map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        </div>

        <div class="section">
            <h2><span class="icon">📈</span> Daily Breakdown</h2>
            <div class="stats-grid">
                ${(data.dailyCalories || []).map(day => `
                    <div class="stat-card">
                        <div class="stat-value">${day.calories}</div>
                        <div class="stat-label">${day.date}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2><span class="icon">🎯</span> Challenges & Improvements</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="recommendations" style="background: #fff3cd; border-left-color: #ffc107;">
                    <h3 style="color: #856404;">Challenges This Week</h3>
                    <ul>
                        ${(data.challenges || []).map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
                <div class="recommendations" style="background: #d4edda; border-left-color: #28a745;">
                    <h3 style="color: #155724;">Improvements Made</h3>
                    <ul>
                        ${(data.improvements || []).map(improvement => `<li>${improvement}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>

        <div class="section">
            <h2><span class="icon">📊</span> Meal Distribution</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${data.mealBreakdown?.breakfast || 0}</div>
                    <div class="stat-label">Breakfasts</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${data.mealBreakdown?.lunch || 0}</div>
                    <div class="stat-label">Lunches</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${data.mealBreakdown?.dinner || 0}</div>
                    <div class="stat-label">Dinners</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${data.mealBreakdown?.snack || 0}</div>
                    <div class="stat-label">Snacks</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2><span class="icon">🏥</span> Health Tracking</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${data.bloodReportsCount || 0}</div>
                    <div class="stat-label">Blood Reports</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${data.voiceCallsCount || 0}</div>
                    <div class="stat-label">Voice Calls</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${data.flaggedFoods || 0}</div>
                    <div class="stat-label">Flagged Foods</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${data.totalMeals || 0}</div>
                    <div class="stat-label">Total Meals</div>
                </div>
            </div>
        </div>

        <div class="footer">
            <p><strong>Generated by NutriGirl</strong> - Your PCOS Nutrition Companion</p>
            <p>This report is for informational purposes only. Please consult with your healthcare provider for medical advice.</p>
            <p>Report generated on ${currentDate} at ${new Date().toLocaleTimeString()}</p>
        </div>
    </body>
    </html>
    `;
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 NutriGirl server running on port ${PORT}`);
    console.log(`📧 Email service ready with Gmail SMTP`);
});

module.exports = app;
