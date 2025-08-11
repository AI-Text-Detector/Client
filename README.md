# AI Text Detector - Frontend Client

A modern React frontend application for detecting AI-generated text with a beautiful, responsive UI.

## Features

- Modern React 18 application
- Beautiful UI with Ant Design components
- Real-time text analysis
- Responsive design for all devices
- Loading states and error handling
- Clean, intuitive user experience

## Tech Stack

- **React 18** - Frontend framework
- **Ant Design** - UI component library
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **CSS3** - Styling and animations

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see server repository)

### Installation

1. Clone the repository:
```bash
git clone <client-repo-url>
cd ai-text-detector-client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at:
**http://localhost:3000**

## Configuration

### Backend API Connection

The client is configured to connect to the backend server at `http://localhost:5000`. This is set in the `package.json` proxy configuration:

```json
{
  "proxy": "http://localhost:5000"
}
```

### Environment Variables

Create a `.env` file in the root directory for any environment-specific configurations:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=development
```

## Usage

### Text Analysis

1. **Open the application** at http://localhost:3000
2. **Enter or paste text** in the text area
3. **Click "Analyze Text"** to start the analysis
4. **View results** showing:
   - AI detection confidence
   - Classification (AI Generated vs Human Written)
   - Additional analysis details

### Features

- **Real-time Analysis**: Instant text processing
- **Loading States**: Visual feedback during analysis
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on desktop, tablet, and mobile

## Development

### Project Structure
```
ai-text-detector-client/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   │   ├── TextInput.js
│   │   └── ResultDisplay.js
│   ├── pages/          # Page components
│   │   └── Home.js
│   ├── App.js          # Main app component
│   └── index.js        # Entry point
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Component Architecture

#### TextInput Component
- Handles text input and submission
- Manages API calls to backend
- Shows loading states and notifications

#### ResultDisplay Component
- Displays analysis results
- Shows confidence scores and classifications
- Handles different result states

#### Home Page
- Main application layout
- Integrates all components
- Provides responsive design

## API Integration

The frontend communicates with the backend API through the following endpoints:

### POST /detect-text
```javascript
const response = await axios.post('/detect-text', { text });
```

### Error Handling
```javascript
try {
  const response = await axios.post('/detect-text', { text });
  setResult(response.data.result);
} catch (error) {
  notification.error({ 
    message: 'Analysis failed', 
    description: error.response?.data?.error 
  });
}
```

## Styling

### Ant Design Integration
The application uses Ant Design for consistent, professional styling:

- **Layout Components**: Header, Content, Layout
- **Form Components**: Input, Button, TextArea
- **Feedback Components**: Notification, Spin, Card
- **Typography**: Title, Text components

### Custom Styling
Additional custom styles are applied inline for specific design requirements.

## Testing

### Manual Testing
1. Start both backend and frontend servers
2. Test text analysis with various inputs
3. Verify error handling with invalid inputs
4. Test responsive design on different screen sizes

### Automated Testing
```bash
npm test
```

## Building for Production

### Create Production Build
```bash
npm run build
```

### Deploy
The `build` folder contains the production-ready files that can be deployed to any static hosting service.

## Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Ensure backend server is running on port 5000
   - Check CORS configuration on backend
   - Verify proxy settings in package.json

2. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for syntax errors in components
   - Verify all dependencies are installed

3. **Runtime Errors**
   - Check browser console for error messages
   - Verify API endpoints are correct
   - Ensure environment variables are set

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
