import React from 'react';
import { Clock3, Sparkles, Video, Music, Type, Image } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Image className="w-6 h-6 text-indigo-600" />,
      title: 'AI Image Generation',
      description: 'Creates custom visuals from your prompts'
    },
    {
      icon: <Type className="w-6 h-6 text-indigo-600" />,
      title: 'Smart Captions',
      description: 'Automatically adds engaging text overlays'
    },
    {
      icon: <Music className="w-6 h-6 text-indigo-600" />,
      title: 'Background Music',
      description: 'Matching soundtrack for your content'
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {features.map((feature, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            {feature.icon}
            <h3 className="font-semibold text-lg">{feature.title}</h3>
          </div>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}