import { motion } from "framer-motion";
import { useState } from "react";


export default function Translator() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [language, setLanguage] = useState("hi");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setTranslated("");

    const url = "https://text-translator2.p.rapidapi.com/translate";
    const options = {
      method: "POST",
      headers: {
       "x-rapidapi-key": "bb6f4df71amsha8cbd3bd9c24b3dp1c712bjsnfd9fc7624f86",

        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        source_language: "en",
        target_language: language,
        text: text,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setTranslated(result.data?.translatedText || "Translation failed!");
    } catch (error) {
      setTranslated("Translation failed. Check your API key.");
    } finally {
      setLoading(false);
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

      <div className="relative bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-96 text-center border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-pink-500/50">
        <h1 className="text-3xl font-bold text-white mb-4 drop-shadow animate-pulse">
          🌍 Text Translator
        </h1>

        <textarea
          className="w-full p-3 mb-4 border border-white/40 bg-white/20 text-white rounded-lg placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          placeholder="Enter text in English..."
          rows="3"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 mb-4 border border-white/40 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
        </select>

        <button
          onClick={handleTranslate}
          className="bg-pink-500 text-white px-5 py-2 rounded-xl hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-pink-500/50"
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        {translated && (
          <div className="mt-6 p-4 bg-white/30 rounded-xl text-gray-900 font-medium shadow-inner">
            <p>{translated}</p>
          </div>
        )}
      </div>
    </motion.div>

  );
}
