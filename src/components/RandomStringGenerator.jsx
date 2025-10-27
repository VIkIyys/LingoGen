import { useState } from "react";
import { motion } from "framer-motion";


export default function RandomStringGenerator() {
  const [length, setLength] = useState(8);
  const [randomString, setRandomString] = useState("");
  const [copied, setCopied] = useState(false);

  const generateString = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRandomString(result);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (randomString) {
      await navigator.clipboard.writeText(randomString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
  className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
>

      <div className="absolute inset-0 backdrop-blur-md bg-white/10"></div>

      <div className="relative bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-96 text-center border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50">
        <h1 className="text-3xl font-bold text-white drop-shadow mb-4 animate-pulse">
          🎲 Random String Generator
        </h1>

        <label className="block mb-2 text-white font-semibold">
          String Length
        </label>
        <input
          type="number"
          min="1"
          max="50"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full p-2 mb-4 border border-white/40 bg-white/20 text-white rounded-lg placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />

        <button
          onClick={generateString}
          className="bg-pink-500 text-white px-5 py-2 rounded-xl hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-pink-500/50"
        >
          Generate
        </button>

        {randomString && (
          <div className="mt-6 p-4 bg-white/30 rounded-xl text-gray-900 font-mono break-words shadow-inner">
            <p className="mb-3 text-sm">{randomString}</p>
            <button
              onClick={copyToClipboard}
              className="bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow"
            >
              📋 Copy
            </button>
            {copied && (
              <p className="text-green-200 mt-2 text-sm font-semibold">
                ✅ Copied to clipboard!
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>

  );
}
