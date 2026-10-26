import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, MessageSquare, Send, CheckCircle2, MessageCircle, Clock, ArrowRight, User } from 'lucide-react';
import { createWhatsAppUrl, ORNEL_WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const IntegratedMessagingSystem: React.FC = () => {
  const {
    isInquiryOpen,
    setIsInquiryOpen,
    inquiries,
    createInquiry,
    addInquiryReply
  } = useShop();

  const [activeTab, setActiveTab] = useState<'new' | 'threads'>('new');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [contactType, setContactType] = useState<'whatsapp' | 'email' | 'phone'>('whatsapp');
  const [department, setDepartment] = useState<'Cosmetics & Beauty' | 'Branded Apparel' | 'Cash Systems & POS' | 'General Sales'>('Cosmetics & Beauty');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  // Reply state
  const [replyText, setReplyText] = useState('');

  if (!isInquiryOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !message.trim()) return;

    const newInquiry = createInquiry({
      customerName: name,
      customerContact: contact,
      contactType,
      department,
      subject: subject.trim() || `Inquiry regarding ${department}`,
      message: message.trim()
    });

    setSubmittedTicket(newInquiry.id);
    setSelectedThreadId(newInquiry.id);
    setActiveTab('threads');
    setMessage('');
    setSubject('');
  };

  const activeThread = inquiries.find(t => t.id === selectedThreadId) || inquiries[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThread) return;
    addInquiryReply(activeThread.id, replyText.trim());
    setReplyText('');
  };

  const getWhatsAppForwardUrl = (thread: typeof activeThread) => {
    if (!thread) return createWhatsAppUrl("Hello ORNEL Fashion Sales Desk");
    const text = `Hello ORNEL Fashion Sales Team,\n\nI created inquiry ticket *#${thread.id}* regarding *${thread.department}*.\n- Subject: ${thread.subject}\n- Name: ${thread.customerName}\n\nCould we continue the consultation here? Thank you!`;
    return createWhatsAppUrl(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 bg-stone-950 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-amber-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold leading-tight">
                ORNEL Inquiries & Messaging
              </h2>
              <span className="text-xs text-stone-400 flex items-center gap-1.5 font-mono">
                <span>Sales Desk Hotline:</span>
                <span className="text-emerald-400 font-semibold">{ORNEL_WHATSAPP_DISPLAY}</span>
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsInquiryOpen(false)}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
            aria-label="Close inquiries"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 pt-3 gap-6 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('new')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'new'
                ? 'border-stone-900 text-stone-950'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Submit New Inquiry
          </button>
          <button
            onClick={() => setActiveTab('threads')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'threads'
                ? 'border-stone-900 text-stone-950'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <span>Active Tickets</span>
            <span className="text-[10px] bg-stone-200 text-stone-800 px-1.5 py-0.2 rounded-full">
              {inquiries.length}
            </span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {activeTab === 'new' ? (
            <div>
              {/* Context Note */}
              <div className="bg-[#F8F7F2] p-4 rounded-lg border border-stone-200 mb-6 text-xs text-stone-600">
                <p className="font-medium text-stone-900 mb-1">
                  Direct Response Guarantee
                </p>
                <p>
                  Every inquiry receives an official reference ticket number. You can track communication inside this window or jump directly to WhatsApp for real-time mobile chat.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Department Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Target Department *
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value as any)}
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded p-2.5 text-stone-900 focus:outline-none focus:border-stone-500"
                  >
                    <option value="Cosmetics & Beauty">Cosmetics & Beauty (Skin, Fragrance, Rituals)</option>
                    <option value="Branded Apparel">Branded Apparel (Couture, Suits, Sizing)</option>
                    <option value="Cash Systems & POS">Cash Systems & POS (Registers, Scanners, Quotes)</option>
                    <option value="General Sales">General Sales & Bulk Orders</option>
                  </select>
                </div>

                {/* Name & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vanessa M."
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded p-2.5 text-stone-900 focus:outline-none focus:border-stone-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Contact Number / Email *
                    </label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+237 6... or name@email.com"
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded p-2.5 text-stone-900 focus:outline-none focus:border-stone-500"
                    />
                  </div>
                </div>

                {/* Preferred Handoff Method */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Preferred Response Channel
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['whatsapp', 'email', 'phone'] as const).map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setContactType(method)}
                        className={`text-xs py-2 px-3 rounded border capitalize font-medium transition-all ${
                          contactType === method
                            ? 'border-stone-900 bg-stone-900 text-white'
                            : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Inquiry Topic / Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Quotation for 2 POS Cash Registers in Douala"
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded p-2.5 text-stone-900 focus:outline-none focus:border-stone-500"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Your Message / Detailed Request *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe the items you are interested in, sizing requirements, delivery address, or POS technical questions..."
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded p-2.5 text-stone-900 focus:outline-none focus:border-stone-500"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry & Open Ticket</span>
                </button>
              </form>

              {/* Instant WhatsApp Shortcut Banner */}
              <div className="mt-8 pt-6 border-t border-stone-200 text-center">
                <span className="text-xs text-stone-500 block mb-3">
                  Prefer instant mobile chat without filling forms?
                </span>
                <a
                  href={createWhatsAppUrl("Hello ORNEL Fashion! I want to start a chat with the sales team.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp Chat (+237 654 049 049)</span>
                </a>
              </div>
            </div>
          ) : (
            /* Threads & Messages Tab */
            <div className="space-y-6">
              
              {/* Thread selector if multiple */}
              {inquiries.length > 1 && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-2">
                    Select Inquiry Ticket:
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {inquiries.map((inq) => (
                      <button
                        key={inq.id}
                        onClick={() => setSelectedThreadId(inq.id)}
                        className={`px-3 py-1.5 text-xs rounded border transition-all shrink-0 text-left ${
                          (selectedThreadId || inquiries[0].id) === inq.id
                            ? 'border-stone-900 bg-stone-900 text-white font-medium'
                            : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        <span className="font-mono font-bold block">{inq.id}</span>
                        <span className="text-[10px] opacity-80 truncate max-w-[120px] block">{inq.department}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeThread ? (
                <div className="border border-stone-200 rounded-lg overflow-hidden flex flex-col bg-stone-50">
                  
                  {/* Ticket Summary Header */}
                  <div className="p-4 bg-white border-b border-stone-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-amber-800">
                        #{activeThread.id}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                        {activeThread.status}
                      </span>
                    </div>
                    <h3 className="font-serif text-sm font-bold text-stone-950 mb-1">
                      {activeThread.subject}
                    </h3>
                    <div className="text-[11px] text-stone-500 flex items-center gap-2">
                      <span>{activeThread.customerName}</span>
                      <span>·</span>
                      <span>{activeThread.department}</span>
                      <span>·</span>
                      <span>{activeThread.createdAt}</span>
                    </div>
                  </div>

                  {/* Messages Stream */}
                  <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
                    {activeThread.messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
                            m.sender === 'user'
                              ? 'bg-stone-950 text-white rounded-br-none'
                              : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none shadow-2xs'
                          }`}
                        >
                          {m.text}
                        </div>
                        <span className="text-[10px] text-stone-400 mt-1 font-mono">
                          {m.sender === 'agent' ? 'ORNEL Representative · ' : 'You · '}{m.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Reply Input Form */}
                  <form onSubmit={handleSendReply} className="p-3 bg-white border-t border-stone-200 flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type a follow-up response..."
                      className="flex-1 text-xs bg-stone-50 border border-stone-200 rounded px-3 py-2 text-stone-900 focus:outline-none focus:border-stone-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded"
                    >
                      Reply
                    </button>
                  </form>

                  {/* Forward to WhatsApp Banner */}
                  <div className="p-3 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between gap-3">
                    <div className="text-xs text-emerald-900">
                      <span className="font-medium block">Want faster resolution?</span>
                      <span className="text-[11px] text-emerald-700">Forward this ticket to our active WhatsApp hotline.</span>
                    </div>
                    <a
                      href={getWhatsAppForwardUrl(activeThread)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded shrink-0 flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Handoff</span>
                    </a>
                  </div>

                </div>
              ) : (
                <div className="text-center py-12 text-stone-400 text-xs">
                  No active inquiries yet.
                </div>
              )}

            </div>
          )}

        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 text-center text-xs text-stone-500">
          ORNEL Fashion Concierge · Akwa Douala & Bastos Yaoundé
        </div>

      </div>
    </div>
  );
};
