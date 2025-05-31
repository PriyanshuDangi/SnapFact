# SnapFact 📸✨

**Discover fascinating facts about objects in your photos using AI!**

SnapFact is a modern React web application that uses Google Gemini AI to detect objects in images and provide interesting, educational facts about them. Simply upload a photo or take one with your camera, and let AI reveal amazing insights about the objects it finds.

## 🌟 Features

- **📱 Image Upload & Camera Capture**: Upload photos from your device or take new ones using your camera with live preview
- **🎥 Live Webcam Preview**: Real-time camera feed with capture and retake functionality
- **🤖 AI-Powered Object Detection**: Advanced object recognition using Google Gemini AI
- **📚 Fascinating Facts**: Get 2-3 interesting facts about each detected object
- **🎨 Beautiful Modern UI**: Responsive design with smooth animations and gradients
- **⚡ Real-time Analysis**: Fast processing and instant results
- **📱 Mobile Friendly**: Fully responsive design that works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd snapfact
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm install react-webcam
   ```

3. **Set up your API key**
   - Get your Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Copy `.env.example` to `.env`
   - Replace `your_gemini_api_key_here` with your actual API key:
   ```bash
   cp .env.example .env
   # Edit .env and add your API key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Start uploading images and discovering facts!

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with:

```env
REACT_APP_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key and add it to your `.env` file

## 🎯 How to Use

1. **Upload an Image**: Click "Choose File" to select an image from your device
2. **Take a Photo**: Click "Take Photo" to use your device's camera
3. **Analyze**: Click the "Analyze Image" button to start AI processing
4. **Discover Facts**: Read the fascinating facts about detected objects!
5. **Try Another**: Click the "×" button to analyze a new image

## 🛠️ Built With

- **React 18** - Modern React with hooks
- **React Webcam** - Camera integration with live preview and capture
- **Google Gemini AI** - Advanced multimodal AI for image analysis
- **Lucide React** - Beautiful, customizable icons
- **CSS3** - Modern styling with gradients and animations
- **HTML5** - Semantic markup and camera API support

## 📱 Browser Support

SnapFact works on all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- File API and Camera API
- Fetch API

## 🎨 Design Features

- **Gradient Background**: Beautiful purple-blue gradient
- **Glass Morphism**: Frosted glass effects with backdrop blur
- **Smooth Animations**: Hover effects and loading animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern Typography**: Clean, readable fonts with proper hierarchy

## 🔒 Privacy & Security

- **No Data Storage**: Images are processed in real-time and not stored
- **Secure API Calls**: All API communications are encrypted
- **Client-Side Processing**: Image handling happens in your browser
- **Environment Variables**: API keys are kept secure in environment files

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `build` folder.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add your environment variable in the Vercel dashboard

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify
3. Add environment variables in Netlify settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Google Gemini AI for powerful image analysis
- Lucide for beautiful icons
- React team for the amazing framework

---

**Made with ❤️ and AI** - Start discovering amazing facts about the world around you! 