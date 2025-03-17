import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setVideoUrl('');

    try {
      const response = await axios.post('https://api.aleevaai.com/generate', {
        prompt,
      });

      const { video_url } = response.data;

      // 🔥 Make sure the video URL is absolute
      const fullUrl = `https://api.aleevaai.com${video_url}`;
      console.log('✅ Final video URL:', fullUrl);

      setVideoUrl(fullUrl);
    } catch (error) {
      console.error('❌ Video generation failed:', error);
      alert('Failed to generate video');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Aleeva AI</h1>
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
          onClick={handleGenerate}
          disabled={loading}
          className="w-full mt-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Video'}
        </button>

        {videoUrl && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-center">Your Video:</h2>
            <video
              src={videoUrl}
              controls
              autoPlay
              muted
              playsInline
              className="w-full rounded-xl border border-gray-300"
            />
            <p className="text-center mt-2 text-sm text-gray-500">{videoUrl}</p>
          </div>
        )}
      </div>
    </main>
  );
}