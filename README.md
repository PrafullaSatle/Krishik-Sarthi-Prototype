# Farmer Advisory App 🌾

A simple React app using Tailwind CSS for a Farmer Advisory Prototype.

## Features

### 1. Farmer Registration Screen
- Input fields: Name, District (dropdown: Palakkad, Thrissur, Alappuzha, Kottayam), Crop (dropdown: Paddy)
- On submit, saves details in local state and navigates to Chat screen

### 2. Chat/Advisory Screen
- Farmer can type a question (text input)
- App checks mock data (mock_soil_data.json, mock_crop_calendar.json, mock_pest_alerts.json)
- Example advisory rules:
  - If user asks about irrigation → checks soil moisture and provides irrigation advice
  - If user asks "what to do this month" → shows advisory from crop calendar
  - If current month matches pest alert → shows pest advisory
  - Market price information
  - Fertilizer recommendations
- Responses displayed in chat bubbles (farmer question left, assistant reply right)
- Microphone button (non-functional for now) to simulate voice-first design

### 3. Notifications Screen
- Shows relevant pest alerts for farmer's district
- Market price information for paddy
- General farming advisory

## Design Features
- Simple, farmer-friendly UI with large fonts
- Green theme throughout the application
- Uses emojis and icons instead of too much text
- Easy to understand interface

## Data Management
- Loads mock data from JSON files stored in public directory
- Uses React useState for minimal state management
- Stores farmer information in localStorage

## Tech Stack
- React 18
- Vite
- React Router DOM
- Tailwind CSS (via CDN)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Project Structure
```
src/
  components/
    FarmerRegistration.jsx - Registration form
    ChatAdvisory.jsx - Chat interface with advisory logic
    Notifications.jsx - Alerts and notifications screen
  App.jsx - Main app with routing
  main.jsx - Entry point
public/
  mock_soil_data.json - Soil analysis and recommendations
  mock_crop_calendar.json - Monthly farming activities
  mock_pest_alerts.json - Pest alerts and market prices
```

## Usage Flow
1. **Registration**: Enter name, select district and crop
2. **Chat**: Ask questions about farming, get AI-powered responses
3. **Notifications**: View alerts, pest information, and market prices

## Mock Data Features
- Soil analysis with pH, nutrients, and moisture levels
- Monthly crop calendar with activities, fertilizer, and irrigation schedules
- Pest alerts with symptoms, treatments, and prevention
- Current market prices for paddy by district

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
