# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Basic Development
```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Windows PowerShell Specific
When working in PowerShell on Windows, all commands work as expected. No special considerations needed.

## Architecture Overview

### Application Type
React 19 single-page application (SPA) built with Vite, specifically designed for farmers in Kerala, India. This is a prototype farming advisory system that provides personalized recommendations based on mock agricultural data.

### Core Architecture Pattern
**Three-Screen Flow with Mock Data Integration:**
1. **Registration Flow** → **Chat Interface** → **Notifications Dashboard**
2. **Data Architecture**: Mock JSON files in `/public/` simulate backend APIs
3. **State Management**: React state + localStorage for farmer profile persistence
4. **Routing**: React Router DOM with simple route-based navigation

### Key Technical Decisions

**Mock Data Strategy:**
- Mock agricultural data stored in `/public/mock_*.json` files
- Simulates real-world agricultural databases (soil analysis, crop calendars, pest alerts)
- Data is fetched via standard HTTP requests to public static files
- Advisory logic processes farmer questions against mock datasets

**Agricultural Domain Logic:**
The chat advisory system (`ChatAdvisory.jsx`) contains rule-based agriculture intelligence:
- Irrigation advice based on mock soil moisture data
- Monthly farming activities from crop calendar
- Pest management recommendations filtered by district
- Market price information by region
- Fertilizer recommendations based on soil analysis

**UI/UX for Rural Users:**
- Custom Tailwind config with larger font sizes (`farmer-*` classes)
- Emoji-heavy interface to reduce text dependency
- Simple green color scheme (`farmer-green` palette)
- Large touch targets for mobile devices

### Data Flow Architecture

**Farmer Registration → Data Persistence:**
```
FarmerRegistration.jsx → localStorage → ChatAdvisory.jsx & Notifications.jsx
```

**Chat Advisory Logic:**
```
User Input → generateResponse() → Mock Data Processing → Contextual Agricultural Advice
```

**Mock Data Integration:**
```
JSON Files → HTTP Fetch → Component State → UI Rendering
```

### Component Architecture

**FarmerRegistration.jsx:**
- Form handling with Kerala-specific districts (Palakkad, Thrissur, Alappuzha, Kottayam)
- Currently limited to Paddy crop (designed for expansion)
- Stores farmer context in localStorage for cross-component access

**ChatAdvisory.jsx:**
- Core agricultural intelligence with keyword-based response generation
- Integrates all three mock data sources for comprehensive advice
- Context-aware responses based on farmer's district and current month
- Message history management with timestamp tracking

**Notifications.jsx:**
- District-filtered pest alerts and market prices
- Severity-based color coding for agricultural alerts
- Market price display with district-specific pricing

### Mock Data Structure

**mock_soil_data.json**: pH levels, nutrient analysis, moisture readings
**mock_crop_calendar.json**: Monthly agricultural activities and schedules  
**mock_pest_alerts.json**: Regional pest warnings and market pricing data

### Styling System

**Custom Tailwind Configuration:**
- Farmer-friendly font sizes (18px base minimum)
- Agricultural green color palette
- Responsive design prioritizing mobile-first approach

### State Management Patterns

**Cross-Component State:**
- Farmer profile: localStorage persistence
- Mock data: Component-level state with useEffect loading
- Chat messages: Local component state with no persistence

**Navigation State:**
- React Router handles screen transitions
- Bottom navigation component for easy mobile access
- Context preservation across route changes via localStorage

### Agricultural Business Logic

The application implements domain-specific farming advisory rules:
- **Irrigation Logic**: Soil moisture thresholds and weather-based recommendations
- **Pest Management**: District-based alert filtering and treatment protocols
- **Crop Calendar**: Month-based activity scheduling for paddy cultivation
- **Market Intelligence**: Real-time pricing simulation with trend analysis

### Testing Considerations

Currently no test framework configured. When adding tests:
- Focus on agricultural logic in `generateResponse()` function
- Mock the fetch calls to JSON files
- Test localStorage persistence across components
- Verify district/month-based filtering logic

### Performance Notes

- Mock data loaded once per component mount
- No state management library needed due to simple application scope
- Static JSON files served efficiently by Vite dev server
- Consider implementing caching for mock data in production scenarios