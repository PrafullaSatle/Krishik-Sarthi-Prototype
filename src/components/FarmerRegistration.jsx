import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FarmerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    crop: ''
  });
  
  const navigate = useNavigate();

  const districts = [
    'Palakkad',
    'Thrissur', 
    'Alappuzha',
    'Kottayam'
  ];

  const crops = ['Paddy'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.district && formData.crop) {
      // Save to localStorage
      localStorage.setItem('farmerData', JSON.stringify(formData));
      // Navigate to chat screen
      navigate('/chat');
    } else {
      alert('Please fill all fields');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-farmer-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-farmer-2xl font-bold text-farmer-green-800 mb-2">
            🌾 Farmer Registration
          </h1>
          <p className="text-farmer-base text-gray-600">
            Register to get personalized farming advice
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-farmer-lg font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 text-farmer-base border-2 border-farmer-green-200 rounded-xl focus:border-farmer-green-500 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-farmer-lg font-medium text-gray-700 mb-2">
              District
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full p-4 text-farmer-base border-2 border-farmer-green-200 rounded-xl focus:border-farmer-green-500 focus:outline-none"
              required
            >
              <option value="">Select your district</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-farmer-lg font-medium text-gray-700 mb-2">
              Crop
            </label>
            <select
              name="crop"
              value={formData.crop}
              onChange={handleChange}
              className="w-full p-4 text-farmer-base border-2 border-farmer-green-200 rounded-xl focus:border-farmer-green-500 focus:outline-none"
              required
            >
              <option value="">Select your crop</option>
              {crops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-farmer-green-600 text-white text-farmer-lg font-semibold py-4 px-6 rounded-xl hover:bg-farmer-green-700 transition-colors"
          >
            Start Farming Journey 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmerRegistration;