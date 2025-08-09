import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Upload, Play, Pause, Trash2, Download } from 'lucide-react';

export default function VoiceInputComponent() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevels, setAudioLevels] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const streamRef = useRef(null);
  const analyzerRef = useRef(null);
  const animationRef = useRef(null);
  const intervalRef = useRef(null);

  // Initialize audio levels array
  useEffect(() => {
    setAudioLevels(new Array(40).fill(0));
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Set up audio analysis for visualization
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 256;
      source.connect(analyzer);
      analyzerRef.current = { analyzer, audioContext };
      
      // Start visualization
      visualizeAudio();
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stopVisualization();
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Error accessing microphone. Please ensure microphone permissions are granted.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      clearInterval(intervalRef.current);
    }
  };

  const visualizeAudio = () => {
    if (analyzerRef.current) {
      const { analyzer } = analyzerRef.current;
      const dataArray = new Uint8Array(analyzer.frequencyBinCount);
      
      const animate = () => {
        analyzer.getByteFrequencyData(dataArray);
        
        // Create simplified audio levels for visualization
        const levels = [];
        const binSize = Math.floor(dataArray.length / 40);
        
        for (let i = 0; i < 40; i++) {
          let sum = 0;
          for (let j = 0; j < binSize; j++) {
            sum += dataArray[i * binSize + j];
          }
          levels.push(sum / binSize / 255); // Normalize to 0-1
        }
        
        setAudioLevels(levels);
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animate();
    }
  };

  const stopVisualization = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (analyzerRef.current) {
      analyzerRef.current.audioContext.close();
    }
    setAudioLevels(new Array(40).fill(0));
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setIsPlaying(false);
    setRecordingTime(0);
    setResult(null);
  };

  const downloadAudio = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `voice-recording-${Date.now()}.wav`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const processAudio = async () => {
    if (!audioBlob) return;
    
    setIsProcessing(true);
    
    // Simulate API call to classification service
    try {
      // Create FormData to simulate file upload
      const formData = new FormData();
      const filename = `voice-recording-${Date.now()}.wav`;
      formData.append('audio', audioBlob, filename);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock classification results (replace with actual API call)
      const mockClassifications = [
        'Speech', 'Music', 'Noise', 'Silence', 'Nature', 'Urban', 'Human Voice', 'Animal Sound'
      ];
      
      const randomClassification = mockClassifications[Math.floor(Math.random() * mockClassifications.length)];
      
      const response = {
        'Prediction': randomClassification,
        'Message': `${filename} uploaded successfully`
      };
      
      setResult(response);
      
    } catch (error) {
      console.error('Error processing audio:', error);
      setResult({
        'Prediction': 'Error',
        'Message': 'Failed to process audio file'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 rounded-lg">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-purple-500/20 rounded-full">
              <Mic className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Voice Classification System
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Record your voice and get AI-powered audio classification results
          </p>
        </div>

        {/* Main Recording Interface */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          
          {/* Audio Visualizer */}
          <div className="mb-8">
            <div className="flex items-end justify-center space-x-1 h-32 bg-black/20 rounded-xl p-4">
              {audioLevels.map((level, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-t from-purple-500 to-pink-400 rounded-sm transition-all duration-100 ease-out"
                  style={{
                    height: `${Math.max(4, level * 100)}px`,
                    width: '6px',
                    opacity: isRecording ? 0.8 + level * 0.2 : 0.3
                  }}
                />
              ))}
            </div>
          </div>

          {/* Recording Controls */}
          <div className="flex flex-col items-center space-y-6">
            
            {/* Timer */}
            {(isRecording || audioBlob) && (
              <div className="text-white text-2xl font-mono">
                {formatTime(recordingTime)}
              </div>
            )}

            {/* Main Record Button */}
            <div className="relative">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
                className={`relative p-6 rounded-full transition-all duration-300 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                    : 'bg-purple-500 hover:bg-purple-600'
                } disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
                
                {/* Recording indicator rings */}
                {isRecording && (
                  <>
                    <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-30"></div>
                    <div className="absolute inset-2 rounded-full border-2 border-red-300 animate-pulse opacity-50"></div>
                  </>
                )}
              </button>
            </div>

            <p className="text-gray-300 text-center">
              {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
            </p>

            {/* Audio Playback Controls */}
            {audioBlob && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={isPlaying ? pauseAudio : playAudio}
                  className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>
                
                <button
                  onClick={downloadAudio}
                  className="p-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
                >
                  <Download className="w-5 h-5 text-white" />
                </button>
                
                <button
                  onClick={deleteRecording}
                  className="p-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>
            )}

            {/* Process Button */}
            {audioBlob && !result && (
              <button
                onClick={processAudio}
                disabled={isProcessing}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Classify Audio</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Hidden audio element for playback */}
          {audioUrl && (
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              style={{ display: 'none' }}
            />
          )}
        </div>

        {/* Results Display */}
        {result && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Upload className="w-5 h-5 text-green-400" />
              <span>Classification Result</span>
            </h3>
            
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-300 whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}