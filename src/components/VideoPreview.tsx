import React from 'react';
import { Play, Download, RefreshCw } from 'lucide-react';

interface VideoPreviewProps {
  images: string[];
  captions: string[];
  videoUrl: string;
  onRegenerate: () => void;
}

export function VideoPreview({ images, captions, videoUrl, onRegenerate }: VideoPreviewProps) {
  const handlePreview = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  const handleDownload = async () => {
    if (videoUrl) {
      try {
        const response = await fetch(videoUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated-short.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download error:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Your Generated Short</h2>
        <button
          onClick={onRegenerate}
          className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Regenerate
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`Generated scene ${index + 1}`}
              className="w-full aspect-[9/16] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
              <p className="text-white text-sm px-4 text-center">{captions[index]}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <p>✓ AI-generated images</p>
          <p>✓ Captions added</p>
          <p>✓ Background music included</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handlePreview}
            disabled={!videoUrl}
            className="flex items-center gap-2 px-6 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            Preview
          </button>
          <button 
            onClick={handleDownload}
            disabled={!videoUrl}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}