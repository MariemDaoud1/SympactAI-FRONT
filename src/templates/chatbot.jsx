import React, { useEffect, useState, useRef } from "react";
import {
  Bell,
  Search,
  MessageCircle,
  HelpCircle,
  FileText,
  ArrowLeft,
  Send,
  Bot,
  User,
  Settings,
  History,
  Trash2,
  Download,
  Copy,
  Minimize2,
  Maximize2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";

// Mock socket for demonstration
const mockSocket = {
  on: (event, callback) => {
    if (event === "bot reply") {
      // Simulate bot responses with delay
      setTimeout(() => {
        const responses = [
          "I'm analyzing your pump data... Please wait a moment.",
          "Based on your pump specifications, I recommend checking the pressure levels.",
          "Your pump is operating within normal parameters. Current efficiency is at 94%.",
          "I've detected a minor anomaly in motor vibration. Would you like me to schedule maintenance?",
          "Pump maintenance reminder: Last service was 45 days ago. Next service due in 15 days."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        callback(randomResponse);
      }, 1000 + Math.random() * 2000);
    }
  },
  off: () => {},
  emit: () => {}
};

export default function PumpOChatbotPage() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello! I'm PumpO AI Assistant. I can help you with pump diagnostics, maintenance scheduling, and performance optimization. How can I assist you today?",
      timestamp: new Date(),
      type: "welcome"
    }
  ]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(1);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    mockSocket.on("bot reply", (msg) => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { 
        from: "bot", 
        text: msg, 
        timestamp: new Date(),
        type: "response"
      }]);
    });

    return () => {
      mockSocket.off("bot reply");
    };
  }, []);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    
    const userMessage = { 
      from: "user", 
      text, 
      timestamp: new Date(),
      type: "message"
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    mockSocket.emit("chat message", text);
  };

  const clearChat = () => {
    // Save current chat to history if it has more than just the welcome message
    if (messages.length > 1) {
      const chatSession = {
        id: currentChatId,
        title: generateChatTitle(messages),
        messages: [...messages],
        timestamp: new Date(),
        messageCount: messages.length - 1 // Exclude welcome message
      };
      setChatHistory(prev => [chatSession, ...prev]);
      setCurrentChatId(prev => prev + 1);
    }
    
    setMessages([{
      from: "bot",
      text: "Chat cleared! How can I help you with your pumps today?",
      timestamp: new Date(),
      type: "system"
    }]);
  };

  const generateChatTitle = (messages) => {
    const userMessages = messages.filter(msg => msg.from === "user");
    if (userMessages.length === 0) return "New Chat";
    
    const firstMessage = userMessages[0].text;
    // Create a title from the first user message (max 30 characters)
    return firstMessage.length > 30 ? firstMessage.substring(0, 30) + "..." : firstMessage;
  };

  const loadChatFromHistory = (chatSession) => {
    setMessages(chatSession.messages);
    setShowHistory(false);
  };

  const deleteChatFromHistory = (chatId) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // Less than a week
      return messageDate.toLocaleDateString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  const quickActions = [
    { text: "Check pump status", icon: CheckCircle, color: "bg-green-500" },
    { text: "Schedule maintenance", icon: Clock, color: "bg-blue-500" },
    { text: "View diagnostics", icon: AlertTriangle, color: "bg-orange-500" },
    { text: "Performance report", icon: Zap, color: "bg-purple-500" }
  ];

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen font-sans bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-4 flex flex-col justify-between">
        {/* Logo Section */}
        <div>
          <div className="flex items-center justify-center mb-2 p-3">
            <div className="bg-white text-blue-800 px-3 py-2 rounded-full font-black animate-pulse">
              <img src="/public/pumpo.png" alt="PumpO Logo" className="h-17 w-25" />
            </div>
          </div>
          
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 py-3 rounded-xl shadow-lg font-semibold flex items-center justify-center space-x-2 transform hover:scale-105 mb-4"
            onClick={clearChat}
          >
            <MessageCircle size={18} />
            <span>New Chat</span>
          </button>

          {/* Navigation */}
          <nav className="space-y-1">
            <ul className="space-y-1">
              <li 
                onClick={() => setShowHistory(!showHistory)}
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-200 group ${showHistory ? 'bg-white/10' : ''}`}
              >
                <History size={18} className="group-hover:text-cyan-300" />
                <span className="group-hover:text-cyan-300 text-sm">Chat History</span>
                <div className="ml-auto text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                  {chatHistory.length}
                </div>
              </li>
              <li className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-200 group">
                <Settings size={18} className="group-hover:text-cyan-300" />
                <span className="group-hover:text-cyan-300 text-sm">Settings</span>
              </li>
              <li className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-200 group">
                <HelpCircle size={18} className="group-hover:text-cyan-300" />
                <span className="group-hover:text-cyan-300 text-sm">Help & Support</span>
              </li>
              <li className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-200 group">
                <FileText size={18} className="group-hover:text-cyan-300" />
                <span className="group-hover:text-cyan-300 text-sm">Reports</span>
              </li>
              <li className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-200 group">
                <Download size={18} className="group-hover:text-cyan-300" />
                <span className="group-hover:text-cyan-300 text-sm">Export Data</span>
              </li>
            </ul>
          </nav>

          {/* Chat History Panel */}
          {showHistory && (
            <div className="mt-4 border-t border-blue-700/30 pt-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-blue-200">Recent Chats</h3>
                {chatHistory.length > 0 && (
                  <button
                    onClick={() => setChatHistory([])}
                    className="text-xs text-red-300 hover:text-red-200 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="max-h-48 overflow-y-auto space-y-2 custom-scrollbar">
                {chatHistory.length === 0 ? (
                  <p className="text-xs text-blue-300 text-center py-4">No chat history yet</p>
                ) : (
                  chatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      className="group bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                      onClick={() => loadChatFromHistory(chat)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-white truncate mb-1">
                            {chat.title}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs text-blue-300">
                            <span>{chat.messageCount} messages</span>
                            <span>•</span>
                            <span>{formatTimestamp(chat.timestamp)}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteChatFromHistory(chat.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded"
                        >
                          <Trash2 size={12} className="text-red-300" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="border-t border-blue-700/30 pt-4">
          <button className="flex items-center space-x-2 text-sm font-semibold hover:text-cyan-300 transition-colors duration-200 group w-full p-2 rounded-lg hover:bg-white/10">
            <ArrowLeft size={18} className="group-hover:transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to PumpWATCH</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Interface */}
      <main className="flex flex-col flex-1 bg-white">
        {/* Enhanced Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Bot className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">PumpO Assistant</h1>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-sm text-gray-600">Online & Ready</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="text-gray-400 hover:text-blue-600" size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="text-gray-400 hover:text-blue-600" size={20} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"></div>
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
              </button>
            </div>
          </div>
        </header>

        {/* Chat Messages Area */}
        <div className={`flex-1 overflow-y-auto p-6 space-y-4 ${isMinimized ? 'hidden' : ''}`}>
          {messages.length === 1 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="text-white" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to PumpO AI</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Your intelligent pump management assistant. Ask me anything about pump diagnostics, maintenance, or performance optimization.
              </p>
              
              {/* Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(action.text)}
                    className={`${action.color} text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3`}
                  >
                    <action.icon size={20} />
                    <span className="font-medium">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} mb-4`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm relative group ${
                msg.from === "user"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}>
                <div className="flex items-start space-x-2">
                  {msg.from === "bot" && (
                    <Bot size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-2 ${
                      msg.from === "user" ? "text-white/70" : "text-gray-500"
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.from === "user" && (
                    <User size={16} className="text-white/70 mt-1 flex-shrink-0" />
                  )}
                </div>
                
                {/* Copy button */}
                <button
                  onClick={() => copyMessage(msg.text)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded"
                >
                  <Copy size={12} />
                </button>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 px-4 py-3 rounded-2xl shadow-sm flex items-center space-x-2">
                <Bot size={16} className="text-blue-500" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-600">PumpO is typing...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <div className={`border-t border-gray-200 p-6 bg-white ${isMinimized ? 'hidden' : ''}`}>
          <div className="flex items-end space-x-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about pump diagnostics, maintenance, or performance..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                rows="1"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                {message.length}/500
              </div>
            </div>
            
            <button
              onClick={() => {
                sendMessage(message);
                setMessage("");
              }}
              disabled={!message.trim() || isTyping}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
            >
              <Send size={20} />
            </button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={clearChat}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-sm text-gray-600"
            >
              <Trash2 size={16} />
              <span>Clear Chat</span>
            </button>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-4 max-w-2xl mx-auto">
            PumpO AI Assistant - Optimizing pump performance through intelligent diagnostics and predictive maintenance.
          </p>
        </div>
      </main>
      <style>
{`
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.1);
  }
  .custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.4);
  }
`}
</style>

    </div>
  );
}