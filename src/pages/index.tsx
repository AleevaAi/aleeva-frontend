'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setVideoUrl('');
    setShowVideo(false);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/generate`,
        { prompt },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Backend response:', response.data);

      if (response.data && response.data.video_url) {
        setVideoUrl(response.data.video_url);
        setShowVideo(true); // Trigger video to appear
      } else {
        setError('No video URL returned from backend.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to generate video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoUrl) {
      setShowVideo(true);
    }
  }, [videoUrl]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Aleeva AI</h1>

        {/* ✅ HARD-CODED VIDEO FOR TESTING */}
        <video
          src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
          controls
          autoPlay
          className="w-full rounded-xl border border-gray-300 mb-4"
        />

        <p className="text-center text-gray-600 mb-6">
          Enter your prompt below and let Aleeva generate your video ✨
        </p>

        <textarea
          className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          placeholder="Describe the video you want..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          className="w-full mt-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Video'}
        </button>

        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}

        {showVideo && videoUrl && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-center">Your Video:</h2>
            <video
              key={videoUrl}
              src={videoUrl}
              controls
              autoPlay
              className="w-full rounded-xl border border-gray-300"
            />
          </div>
        )}
      </div>
    </main>
  );
}