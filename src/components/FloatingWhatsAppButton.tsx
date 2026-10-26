import React, { useState } from 'react';
import { MessageCircle, X, ArrowUpRight, Sparkles, Send } from 'lucide-react';
import { createWhatsAppUrl, ORNEL_WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const FloatingWhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickTopics = [
    { label: '👗 Dresses & Couture Sizing', text: 'Hello ORNEL Fashion! I would like to inquire about dresses and custom tailoring.' },
    { label: '✨ Cosmetics & Perfumes', text: 'Hello! Can you help recommend the best skincare or perfume for me?' },
    { label: '💳 POS Cash Systems Quote', text: 'Hello! I need a quotation and technical details for your retail POS cash system.' },
    { label: '📦 Check My Order Delivery', text: 'Hello ORNEL Fashion, I would like to check the status of my order.' }
  ];

  const handleLaunch = (msg: string) => {
    const url = createWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) {
      handleLaunch("Hello ORNEL Fashion Sales Team, I would like to inquire about your collections.");
      return;
    }
    handleLaunch(customMsg.trim());
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Popover Dialogue Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-fade-in flex flex-col">
          
          {/* Card Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                {/* Active agent status dot */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold leading-tight">
                  ORNEL Fashion Sales Team
                </h4>
                <div className="text-[11px] text-emerald-200 font-mono">
                  {ORNEL_WHATSAPP_DISPLAY}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-200 hover:text-white p-1 rounded-full transition-colors"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#EFEAE2] flex-1 space-y-3">
            <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-xs text-xs text-stone-800 leading-relaxed max-w-[90%]">
              <p className="font-medium text-stone-900 mb-1">
                Hello! Welcome to ORNEL Fashion.
              </p>
              <p className="text-stone-600">
                How can our boutique sales team assist you today? Select a topic or type your message below to start chatting directly on WhatsApp.
              </p>
              <span className="text-[10px] text-stone-400 block text-right mt-1 font-mono">
                Typically replies in 5 mins
              </span>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 block">
                Quick Inquiries:
              </span>
              {quickTopics.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLaunch(item.text)}
                  className="w-full text-left text-xs bg-white/90 hover:bg-white text-stone-800 p-2 rounded-lg border border-stone-200/60 shadow-2xs transition-colors flex items-center justify-between group"
                >
                  <span className="truncate">{item.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Input */}
          <form onSubmit={handleCustomSend} className="p-3 bg-white border-t border-stone-200 flex gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Type inquiry to start WhatsApp chat..."
              className="flex-1 text-xs bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-emerald-600"
            />
            <button
              type="submit"
              className="p-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-lg transition-colors flex items-center justify-center"
              title="Send to WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp with ORNEL Fashion Sales Team"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-950/80 leading-none">
            Chat On WhatsApp
          </span>
          <span className="text-xs font-mono font-bold leading-tight">
            {ORNEL_WHATSAPP_DISPLAY}
          </span>
        </div>
      </button>

    </div>
  );
};
