import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [farmerData, setFarmerData] = useState(null);
  const [pestAlerts, setPestAlerts] = useState([]);
  const [marketPrice, setMarketPrice] = useState(null);

  useEffect(() => {
    // Load farmer data
    const data = localStorage.getItem('farmerData');
    if (data) {
      setFarmerData(JSON.parse(data));
    }

    // Load notifications
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await fetch('/mock_pest_alerts.json');
      const data = await response.json();
      
      // Filter alerts for current district
      const farmerInfo = JSON.parse(localStorage.getItem('farmerData') || '{}');
      const relevantAlerts = data.current_alerts.filter(alert =>
        alert.affected_districts.includes(farmerInfo.district)
      );
      
      setPestAlerts(relevantAlerts);
      setMarketPrice(data.market_prices.paddy);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-blue-100 border-blue-300 text-blue-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-farmer-green-50">
      {/* Header */}
      <div className="bg-farmer-green-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-farmer-xl font-bold">🔔 Notifications</h1>
            {farmerData && (
              <p className="text-farmer-sm">
                {farmerData.name} • {farmerData.district}
              </p>
            )}
          </div>
          <Link 
            to="/chat" 
            className="bg-farmer-green-700 px-4 py-2 rounded-lg text-farmer-base hover:bg-farmer-green-800"
          >
            💬 Chat
          </Link>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Market Prices */}
        {marketPrice && (
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-farmer-green-100 p-3 rounded-full mr-4">
                💰
              </div>
              <div>
                <h2 className="text-farmer-lg font-bold text-gray-800">Market Prices</h2>
                <p className="text-farmer-sm text-gray-600">Latest paddy rates</p>
              </div>
            </div>
            
            <div className="bg-farmer-green-50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-farmer-base font-semibold">Paddy Price Today</span>
                <span className="text-farmer-lg font-bold text-farmer-green-700">
                  ₹{farmerData ? marketPrice.districts[farmerData.district] || marketPrice.current_price : marketPrice.current_price}/kg
                </span>
              </div>
              <div className="text-farmer-sm text-gray-600">
                <span className="mr-4">Trend: {marketPrice.trend}</span>
                <span>Updated: {marketPrice.last_updated}</span>
              </div>
            </div>
          </div>
        )}

        {/* Pest Alerts */}
        <div>
          <h2 className="text-farmer-lg font-bold text-gray-800 mb-4">🐛 Pest Alerts</h2>
          
          {pestAlerts.length > 0 ? (
            <div className="space-y-4">
              {pestAlerts.map((alert) => (
                <div key={alert.id} className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="flex items-start mb-4">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      🚨
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-farmer-lg font-bold text-gray-800 mr-3">
                          {alert.pest_name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-farmer-sm font-medium border-2 ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-farmer-sm text-gray-600 mb-3">
                        Affecting: {alert.affected_districts.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="text-farmer-base font-semibold mb-2">🔍 Symptoms</h4>
                      <p className="text-farmer-sm text-gray-700">{alert.symptoms}</p>
                    </div>

                    <div className="bg-farmer-green-50 rounded-xl p-4">
                      <h4 className="text-farmer-base font-semibold mb-2">💊 Treatment</h4>
                      <p className="text-farmer-sm text-gray-700">{alert.treatment}</p>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="text-farmer-base font-semibold mb-2">🛡️ Prevention</h4>
                      <p className="text-farmer-sm text-gray-700">{alert.prevention}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-md text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-farmer-lg font-bold text-gray-800 mb-2">No Pest Alerts</h3>
              <p className="text-farmer-base text-gray-600">
                No pest issues reported in your district currently. Keep monitoring your crops!
              </p>
            </div>
          )}
        </div>

        {/* General Advisory */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-farmer-green-100 p-3 rounded-full mr-4">
              📋
            </div>
            <div>
              <h2 className="text-farmer-lg font-bold text-gray-800">General Advisory</h2>
              <p className="text-farmer-sm text-gray-600">Daily farming tips</p>
            </div>
          </div>
          
          <div className="bg-farmer-green-50 rounded-xl p-4">
            <p className="text-farmer-base text-gray-700">
              🌤️ Weather is good for field activities. Monitor your crops daily and maintain proper irrigation. 
              Keep checking for pest symptoms and apply recommended treatments if needed.
            </p>
          </div>
        </div>

        {/* Bottom Navigation Space */}
        <div className="h-20"></div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-farmer-green-200 p-4">
        <div className="flex justify-center space-x-8">
          <Link to="/chat" className="flex flex-col items-center text-farmer-green-600">
            <div className="text-2xl mb-1">💬</div>
            <span className="text-farmer-sm font-medium">Chat</span>
          </Link>
          <Link to="/notifications" className="flex flex-col items-center text-farmer-green-800">
            <div className="text-2xl mb-1">🔔</div>
            <span className="text-farmer-sm font-medium">Alerts</span>
          </Link>
          <Link to="/" className="flex flex-col items-center text-farmer-green-600">
            <div className="text-2xl mb-1">🏠</div>
            <span className="text-farmer-sm font-medium">Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notifications;