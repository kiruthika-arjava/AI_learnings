import React, { useState } from 'react';
import { BookOpen, Brain, Calendar, HelpCircle, Loader2, Sun, Moon } from 'lucide-react';

function App() {
  const [topic, setTopic] = useState('');
  const [days, setDays] = useState('10');
  const [hours, setHours] = useState('1.5');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, days: parseInt(days), hours_per_day: parseFloat(hours) })
      });
      const data = await response.json();
      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        setResult(data);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen p-6 transition-colors ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-full transition-all ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-white hover:bg-gray-100 text-gray-600'} shadow-lg`}
          >
            {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            AI Study Assistant
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Transform any topic into comprehensive study materials</p>
        </div>

        {/* Input Form */}
        <div className={`rounded-2xl p-8 mb-8 border shadow-2xl ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-6">
            <Brain className="h-8 w-8 text-purple-400" />
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Create Your Study Plan</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Study Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Machine Learning Fundamentals"
                className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'}`}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Study Days</label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  min="1"
                  max="30"
                  className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                />
              </div>
              
              <div className="space-y-3">
                <label className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Hours per Day</label>
                <input
                  type="number"
                  step="0.5"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  min="0.5"
                  max="8"
                  className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading || !topic} 
              className="w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 rounded-xl font-bold text-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed text-white"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Generating Amazing Content...
                </div>
              ) : (
                'Generate Study Material ✨'
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className={`rounded-xl p-4 border shadow-lg ${isDark ? 'bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'}`}>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className={`h-5 w-5 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-blue-900'}`}>📚 Summary</h3>
              </div>
              <div className={`whitespace-pre-wrap text-sm leading-relaxed p-3 rounded-lg max-h-64 overflow-y-auto ${isDark ? 'text-gray-100 bg-blue-800/30' : 'text-gray-800 bg-blue-100/50'}`}>
                {result.summary}
              </div>
            </div>
            
            <div className={`rounded-xl p-4 border shadow-lg ${isDark ? 'bg-gradient-to-br from-green-900 to-green-800 border-green-700' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Brain className={`h-5 w-5 ${isDark ? 'text-green-300' : 'text-green-600'}`} />
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-green-900'}`}>🧠 Study Notes</h3>
              </div>
              <div className={`whitespace-pre-wrap text-sm leading-relaxed p-3 rounded-lg max-h-64 overflow-y-auto ${isDark ? 'text-gray-100 bg-green-800/30' : 'text-gray-800 bg-green-100/50'}`}>
                {result.notes}
              </div>
            </div>
            
            <div className={`rounded-xl p-4 border shadow-lg ${isDark ? 'bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className={`h-5 w-5 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} />
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-purple-900'}`}>📅 Study Plan</h3>
              </div>
              <div className={`whitespace-pre-wrap text-sm leading-relaxed p-3 rounded-lg max-h-64 overflow-y-auto ${isDark ? 'text-gray-100 bg-purple-800/30' : 'text-gray-800 bg-purple-100/50'}`}>
                {result.plan}
              </div>
            </div>
            
            <div className={`rounded-xl p-4 border shadow-lg ${isDark ? 'bg-gradient-to-br from-orange-900 to-orange-800 border-orange-700' : 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200'}`}>
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className={`h-5 w-5 ${isDark ? 'text-orange-300' : 'text-orange-600'}`} />
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-orange-900'}`}>❓ Quiz</h3>
              </div>
              <div className={`whitespace-pre-wrap text-sm leading-relaxed p-3 rounded-lg max-h-64 overflow-y-auto ${isDark ? 'text-gray-100 bg-orange-800/30' : 'text-gray-800 bg-orange-100/50'}`}>
                {result.quiz}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;