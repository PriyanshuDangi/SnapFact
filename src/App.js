import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { analyzeImage } from './services/geminiService';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setAnalysis(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);
    
    try {
      const result = await analyzeImage(selectedImage);
      setAnalysis(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetApp = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysis(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Sparkles className="logo-icon" />
            <h1>SnapFact</h1>
          </div>
          <p className="tagline">Discover fascinating facts about objects in your photos</p>
        </div>
      </header>

      <main className="main-content">
        {!imagePreview ? (
          <div className="upload-section">
            <div className="upload-area">
              <div className="upload-content">
                <Sparkles className="upload-icon" />
                <h2>Upload or Capture an Image</h2>
                <p>Get instant AI-powered object detection and interesting facts</p>
                
                <div className="upload-buttons">
                  <button 
                    className="upload-btn primary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={20} />
                    Choose File
                  </button>
                  
                  <button 
                    className="upload-btn secondary"
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    <Camera size={20} />
                    Take Photo
                  </button>
                </div>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />
            
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <div className="analysis-section">
            <div className="image-container">
              <img src={imagePreview} alt="Selected" className="preview-image" />
              <button className="reset-btn" onClick={resetApp}>
                ×
              </button>
            </div>

            {!analysis && !loading && (
              <div className="analyze-container">
                <button 
                  className="analyze-btn"
                  onClick={handleAnalyze}
                  disabled={loading}
                >
                  <Sparkles size={20} />
                  Analyze Image
                </button>
              </div>
            )}

            {loading && (
              <div className="loading-container">
                <Loader2 className="loading-spinner" />
                <p>Analyzing your image with AI...</p>
              </div>
            )}

            {error && (
              <div className="error-container">
                <AlertCircle className="error-icon" />
                <p>Error: {error}</p>
                <button className="retry-btn" onClick={handleAnalyze}>
                  Try Again
                </button>
              </div>
            )}

            {analysis && (
              <div className="results-container">
                <div className="results-content">
                  <h3>🔍 Object Detection Results</h3>
                  <div className="analysis-text">
                    {analysis.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by Google Gemini AI</p>
      </footer>
    </div>
  );
}

export default App; 