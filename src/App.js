import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Sparkles, Loader2, AlertCircle, X, RotateCcw } from 'lucide-react';
import Webcam from 'react-webcam';
import ReactMarkdown from 'react-markdown';
import { analyzeImage } from './services/geminiService';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setAnalysis(null);
      setError(null);
    }
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  const handleCapturedImageUpload = () => {
    if (capturedImage) {
      // Convert base64 to blob
      fetch(capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
          setSelectedImage(file);
          setImagePreview(capturedImage);
          setAnalysis(null);
          setError(null);
          setShowWebcam(false);
          setCapturedImage(null);
        });
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const closeWebcam = () => {
    setShowWebcam(false);
    setCapturedImage(null);
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
    setShowWebcam(false);
    setCapturedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
                    onClick={() => setShowWebcam(true)}
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
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Webcam Modal */}
        {showWebcam && (
          <div className="webcam-modal">
            <div className="webcam-container">
              <div className="webcam-header">
                <h3>Take a Photo</h3>
                <button className="close-btn" onClick={closeWebcam}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="webcam-content">
                {!capturedImage ? (
                  <>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="webcam-video"
                      videoConstraints={{
                        width: 1280,
                        height: 720,
                        facingMode: "environment"
                      }}
                    />
                    <div className="webcam-controls">
                      <button className="capture-btn" onClick={capture}>
                        <Camera size={24} />
                        Capture
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <img src={capturedImage} alt="Captured" className="captured-image" />
                    <div className="webcam-controls">
                      <button className="retake-btn" onClick={retakePhoto}>
                        <RotateCcw size={20} />
                        Retake
                      </button>
                      <button className="use-photo-btn" onClick={handleCapturedImageUpload}>
                        <Upload size={20} />
                        Use Photo
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* <footer className="app-footer">
        <p>Powered by Google Gemini AI</p>
      </footer> */}
    </div>
  );
}

export default App; 