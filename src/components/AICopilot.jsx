import React, { useState } from 'react';
import { Bot, Send, Sparkles, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import '../styles/ai_copilot.css';

const MOCK_MESSAGES = [
  { id: 1, sender: 'ai', text: "Hello Alex! I'm NEXUS AI Copilot. I analyzed your recent transactions: your dining spend is down 12% this month, saving you ~$84. How can I help you today?" },
];

const QUICK_PROMPTS = [
  "How much can I save this month?",
  "Analyze my subscription expenses",
  "Predict my balance for next month"
];

const AICopilot = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      let replyText = "Based on your spending history, keeping your Vault auto-roundup active will add ~$145 to your savings by month end.";
      if (query.toLowerCase().includes('subscription')) {
        replyText = "You currently have 3 active subscriptions ($29.98/mo). Spotify ($9.99) and Netflix ($19.99). Would you like me to flag unused ones?";
      } else if (query.toLowerCase().includes('predict')) {
        replyText = "With your current cash inflows ($8,840) vs outflows ($2,680), your projected end-of-month balance is $49,850.00 (+3.3%).";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: replyText }]);
    }, 600);
  };

  return (
    <div className="ai-copilot-card">
      <div className="ai-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div className="ai-bot-badge">
            <Bot size={20} color="white" />
          </div>
          <div>
            <h3>NEXUS AI Copilot</h3>
            <span className="ai-status">● Live Smart Insights</span>
          </div>
        </div>
        <Sparkles size={18} color="var(--accent-amber)" />
      </div>

      <div className="ai-insights-pills">
        <div className="insight-pill warning">
          <AlertTriangle size={14} />
          <span>Electricity bill due in 7 days ($120.00)</span>
        </div>
        <div className="insight-pill tip">
          <Lightbulb size={14} />
          <span>Vault roundup saved +$38.40 this week</span>
        </div>
      </div>

      <div className="ai-chat-messages">
        {messages.map(m => (
          <div key={m.id} className={`chat-bubble ${m.sender}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="quick-prompts">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button key={idx} onClick={() => handleSend(prompt)} className="prompt-btn">
            {prompt}
          </button>
        ))}
      </div>

      <div className="ai-input-row">
        <input 
          type="text" 
          placeholder="Ask NEXUS AI about your money..." 
          value={input} 
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button onClick={() => handleSend()} className="ai-send-btn">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default AICopilot;
