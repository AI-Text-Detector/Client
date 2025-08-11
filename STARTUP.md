# Client Startup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm start
```

### 3. Open the Application
The app will automatically open in your browser at:
**http://localhost:3000**

## Prerequisites

### Backend Server
Make sure the backend server is running before starting the client:
- Backend should be running on http://localhost:5000
- See the server repository for setup instructions

## Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Hot Reload
The development server includes hot reload, so changes to your code will automatically refresh the browser.

## Configuration

### Backend Connection
The client is configured to connect to the backend at `http://localhost:5000` via the proxy setting in `package.json`.

### Environment Variables
Create a `.env` file for environment-specific settings:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=development
```

## Troubleshooting

### Backend Connection Issues
- Ensure the backend server is running on port 5000
- Check that CORS is properly configured on the backend
- Verify the proxy setting in package.json

### Build Errors
```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
The development server will automatically suggest an alternative port if 3000 is in use.

### Browser Issues
- Clear browser cache
- Try opening in an incognito/private window
- Check browser console for error messages
