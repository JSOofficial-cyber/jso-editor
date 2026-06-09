'use client';

import { useState, useEffect } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

interface Settings {
  maxFileSize: number;
  qualityLevel: number;
  enableBatchProcessing: boolean;
  batchSize: number;
  autoCompress: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  maxFileSize: 50,
  qualityLevel: 85,
  enableBatchProcessing: true,
  batchSize: 10,
  autoCompress: true,
};

export default function AdminPanel() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('jso-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const saveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('jso-settings', JSON.stringify(settings));
      setIsSaving(false);
      toast.success('Settings saved successfully!');
    }, 500);
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('jso-settings');
    toast.success('Settings reset to defaults');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-accent mb-2 serif-font">⚙️ Admin Panel</h2>
        <p className="text-gray-600 mb-6">Configure application settings and features</p>

        <div className="space-y-6">
          <div className="border-b pb-6">
            <label className="block text-lg font-semibold text-accent mb-3">
              Maximum File Size
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="10"
                max="500"
                value={settings.maxFileSize}
                onChange={(e) =>
                  setSettings({ ...settings, maxFileSize: Number(e.target.value) })
                }
                className="px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary outline-none w-24"
              />
              <span className="text-gray-600">MB</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Maximum file size allowed for uploads
            </p>
          </div>

          <div className="border-b pb-6">
            <label className="block text-lg font-semibold text-accent mb-3">
              Image Quality Level
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="50"
                max="100"
                value={settings.qualityLevel}
                onChange={(e) =>
                  setSettings({ ...settings, qualityLevel: Number(e.target.value) })
                }
                className="flex-1"
              />
              <span className="text-lg font-semibold text-primary w-12">
                {settings.qualityLevel}%
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Higher values = better quality, larger file size
            </p>
          </div>

          <div className="border-b pb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-lg font-semibold text-accent">
                Enable Batch Processing
              </label>
              <input
                type="checkbox"
                checked={settings.enableBatchProcessing}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    enableBatchProcessing: e.target.checked,
                  })
                }
                className="w-6 h-6 cursor-pointer accent-primary"
              />
            </div>
            <p className="text-sm text-gray-500">
              Allow processing multiple images at once
            </p>
          </div>

          {settings.enableBatchProcessing && (
            <div className="border-b pb-6 bg-beige-50 p-4 rounded-lg">
              <label className="block text-lg font-semibold text-accent mb-3">
                Batch Size
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={settings.batchSize}
                  onChange={(e) =>
                    setSettings({ ...settings, batchSize: Number(e.target.value) })
                  }
                  className="px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary outline-none w-24"
                />
                <span className="text-gray-600">images per batch</span>
              </div>
            </div>
          )}

          <div className="pb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-lg font-semibold text-accent">
                Auto Compress on Download
              </label>
              <input
                type="checkbox"
                checked={settings.autoCompress}
                onChange={(e) =>
                  setSettings({ ...settings, autoCompress: e.target.checked })
                }
                className="w-6 h-6 cursor-pointer accent-primary"
              />
            </div>
            <p className="text-sm text-gray-500">
              Automatically compress images when downloading
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">📋 Current Configuration</h3>
          <pre className="text-xs text-blue-800 overflow-auto">
            {JSON.stringify(settings, null, 2)}
          </pre>
        </div>

        <div className="mt-8 flex gap-4 flex-wrap">
          <button
            onClick={saveSettings}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
          >
            <Save size={18} />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
          <button
            onClick={resetSettings}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            <RotateCcw size={18} />
            Reset to Defaults
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-accent mb-2">📱 About This App</h3>
          <p className="text-sm text-gray-600 mb-3">
            JSO Editor is a professional image editing suite with AI-powered features.
          </p>
          <p className="text-xs text-gray-500">Version: 1.0.0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-accent mb-2">🔐 Privacy & Security</h3>
          <p className="text-sm text-gray-600">
            All processing happens locally in your browser. No data is sent to servers.
          </p>
        </div>
      </div>
    </div>
  );
}
