import React from 'react';
import { Sparkles, Wand2, Upload } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
}

export function PromptInput({ prompt, setPrompt, isGenerating, onGenerate }: PromptInputProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your video idea... (e.g., 'Create a motivational video about success with modern city views, add inspiring captions about never giving up, and use uplifting background music')"
          className="w-full h-32 p-4 pr-12 text-gray-700 bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
        />
        <Sparkles className="absolute right-4 top-4 text-indigo-500 w-5 h-5" />
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        <button
          onClick={onGenerate}
          disabled={!prompt || isGenerating}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all ${
            isGenerating || !prompt
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          <Wand2 className="w-5 h-5" />
          {isGenerating ? 'Generating...' : 'Generate Short'}
        </button>

        <button className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all">
          <Upload className="w-5 h-5" />
          Upload Custom Assets
        </button>
      </div>
    </div>
  );
}