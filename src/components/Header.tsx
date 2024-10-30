import React from 'react';
import { Video } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Video className="w-8 h-8 text-indigo-600" />
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          ShortsMagic
        </h1>
      </div>
      <p className="text-gray-600 text-lg">Transform your ideas into engaging YouTube Shorts in seconds</p>
    </div>
  );
}