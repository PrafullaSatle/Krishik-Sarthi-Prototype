import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ChatAdvisory = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [farmerData, setFarmerData] = useState(null);
  const [mockData, setMockData] = useState({
    soilData: null,
    cropCalendar: null,
    pestAlerts: null
  });

  useEffect(() => {
    // Load farmer data
    const data = localStorage.getItem('farmerData');
    if (data) {
      setFarmerData(JSON.parse(data));
    }

    // Load mock data
    loadMockData();

    // Add welcome message
    setMessages([{
      id: 1,
      type: 'assistant',
      text: 'Hello! I am your farming assistant. Ask me about irrigation, crop calendar, pest management, or say "what to do this month" for monthly advice.',
      timestamp: new Date()
    }]);
  }, []);

  const loadMockData = async () => {
    try {
      const [soilResponse, calendarResponse, pestResponse] = await Promise.all([
        fetch('/mock_soil_data.json'),
        fetch('/mock_crop_calendar.json'),
        fetch('/mock_pest_alerts.json')
      ]);

      const soilData = await soilResponse.json();
      const cropCalendar = await calendarResponse.json();
      const pestAlerts = await pestResponse.json();

      setMockData({ soilData, cropCalendar, pestAlerts });
    } catch (error) {
      console.error('Error loading mock data:', error);
    }
  };

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();

    // Check for irrigation questions
    if (message.includes('irrigation') || message.includes('water')) {
      return `💧 Based on current soil moisture (45%), your field has good water levels. Check weather tomorrow and water if no rain is expected. Maintain 2-3cm water level for paddy.`;
    }

    // Check for "what to do this month"
    if (message.includes('what to do') && message.includes('month')) {
      const monthActivity = mockData.cropCalendar?.monthly_activities?.[currentMonth];
      if (monthActivity) {
        return `📅 This month (${currentMonth}): ${monthActivity.activity}\n\n🔸 ${monthActivity.details}\n🔸 Fertilizer: ${monthActivity.fertilizer}\n🔸 Irrigation: ${monthActivity.irrigation}`;
      }
      return `📅 For this month, continue regular monitoring of your crops and maintain proper irrigation.`;
    }

    // Check for pest-related questions
    if (message.includes('pest') || message.includes('disease') || message.includes('insect')) {
      const currentAlerts = mockData.pestAlerts?.current_alerts?.filter(alert => 
        alert.affected_districts.includes(farmerData?.district) && 
        alert.month === currentMonth
      );
      
      if (currentAlerts && currentAlerts.length > 0) {
        const alert = currentAlerts[0];
        return `🐛 PEST ALERT: ${alert.pest_name} detected in ${farmerData?.district}!\n\n🔸 Symptoms: ${alert.symptoms}\n🔸 Treatment: ${alert.treatment}\n🔸 Prevention: ${alert.prevention}`;
      }
      return `🐛 No major pest alerts for your district currently. Keep monitoring your crops regularly.`;
    }

    // Check for market/price questions
    if (message.includes('price') || message.includes('market') || message.includes('sell')) {
      const price = mockData.pestAlerts?.market_prices?.paddy;
      if (price) {
        return `💰 Current paddy prices:\n🔸 Your district (${farmerData?.district}): ₹${price.districts[farmerData?.district] || price.current_price}/kg\n🔸 Market trend: ${price.trend}\n🔸 Last updated: ${price.last_updated}`;
      }
    }

    // Check for fertilizer questions
    if (message.includes('fertilizer') || message.includes('nutrition')) {
      return `🌱 Based on soil analysis:\n🔸 ${mockData.soilData?.recommendations?.fertilizer}\n🔸 Soil pH: ${mockData.soilData?.soil_analysis?.ph_level} (Good for paddy)\n🔸 Apply fertilizers in split doses for better absorption.`;
    }

    // Default response
    return `🤔 I can help you with:\n🔸 Irrigation advice\n🔸 Monthly farming activities\n🔸 Pest and disease management\n🔸 Market prices\n🔸 Fertilizer recommendations\n\nTry asking "what to do this month" or "irrigation advice".`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    const assistantResponse = {
      id: Date.now() + 1,
      type: 'assistant', 
      text: generateResponse(inputMessage),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, assistantResponse]);
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-farmer-green-50 flex flex-col">
      {/* Header */}
      <div className="bg-farmer-green-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-farmer-xl font-bold">🌾 Farm Assistant</h1>
            {farmerData && (
              <p className="text-farmer-sm">
                {farmerData.name} • {farmerData.district} • {farmerData.crop}
              </p>
            )}
          </div>
          <Link 
            to="/notifications" 
            className="bg-farmer-green-700 px-4 py-2 rounded-lg text-farmer-base hover:bg-farmer-green-800"
          >
            🔔 Alerts
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md p-4 rounded-2xl ${
              message.type === 'user' 
                ? 'bg-farmer-green-600 text-white' 
                : 'bg-white shadow-md'
            }`}>
              <p className="text-farmer-base whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex items-center space-x-3">
          <button className="bg-farmer-green-100 p-3 rounded-full">
            🎤
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about farming..."
            className="flex-1 p-3 text-farmer-base border-2 border-farmer-green-200 rounded-xl focus:border-farmer-green-500 focus:outline-none"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-farmer-green-600 text-white px-6 py-3 rounded-xl text-farmer-base font-semibold hover:bg-farmer-green-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAdvisory;