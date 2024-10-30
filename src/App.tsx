import React, { useState } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { Features } from './components/Features';
import { VideoPreview } from './components/VideoPreview';
import { generateVideo, uploadAssets } from './services/api';

function App() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [captions, setCaptions] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt first');
      return;
    }

    try {
      setIsGenerating(true);
      setError('');
      setShowDemo(false);

      const result = await generateVideo(prompt);
      
      if (result.status === 'success' && result.data) {
        setGeneratedImages(result.data.images || []);
        setCaptions(result.data.captions || []);
        setVideoUrl(result.data.videoUrl || '');
        setShowDemo(true);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate video. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  const handleUpload = async (files: FileList) => {
    try {
      setError('');
      const result = await uploadAssets(Array.from(files));
      console.log('Upload successful:', result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload assets. Please try again.');
      console.error('Upload error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="max-w-3xl mx-auto">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
          />
          
          <Features />
          
          {showDemo && (
            <VideoPreview
              images={generatedImages}
              captions={captions}
              videoUrl={videoUrl}
              onRegenerate={handleRegenerate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;