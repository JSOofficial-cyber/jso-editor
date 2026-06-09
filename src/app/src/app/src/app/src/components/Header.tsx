'use client';

import { Mail } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg serif-font">J</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-accent serif-font">JSO Editor</h1>
            <p className="text-xs text-gray-500">Premium Image Editing Suite</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <a
            href="mailto:support@jsoeditor.com"
            className="flex items-center gap-2 px-4 py-2 text-sm text-accent hover:text-primary transition"
          >
            <Mail size={18} />
            <span className="hidden sm:inline">Support</span>
          </a>
          <div className="text-xs text-gray-500 text-right">
            <p className="font-semibold">Made by JewelsEVO</p>
            <p>v1.0.0</p>
          </div>
        </div>
      </div>
    </header>
  );
}
