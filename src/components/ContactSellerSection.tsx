import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { MessageCircle, Phone, Mail, MapPin, Clock, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { ORNEL_WHATSAPP_PHONE, ORNEL_WHATSAPP_DISPLAY, ORNEL_EMAIL, ORNEL_LOCATION, createWhatsAppUrl } from '../utils/whatsapp';

export const ContactSellerSection: React.FC = () => {
  const { createInquiry, setIsInquiryOpen } = useShop();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<'Cosmetics & Beauty' | 'Branded Apparel' | 'Cash Systems & POS' | 'General Sales'>('Cosmetics & Beauty');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !message.trim()) return;

    const inq = createInquiry({
      customerName: fullName.trim(),
      customerContact: `${phone.trim()} ${email ? `· ${email.trim()}` : ''}`,
      contactType: 'whatsapp',
      department: topic,
      subject: `Direct Seller Contact: ${topic}`,
      message: message.trim()
    });

    setGeneratedTicketId(inq.id);
    setSubmitted(true);
  };

  const getDirectWhatsAppUrl = () => {
    const text = `Hello ORNEL Fashion Seller / Sales Desk,\n\nMy Name: *${fullName || 'Website Visitor'}*\nPhone: *${phone || 'N/A'}*\nDepartment: *${topic}*\n\nMessage:\n${message || 'I would like to inquire about your products and services.'}`;
    return createWhatsAppUrl(text);
  };

  return (
    <section id="contact-seller" className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-500 mb-2">
            Direct Concierge & Sales Desk
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 mb-4">
            Contact the Seller & Showroom Team
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Have questions about clothing sizing, skincare recommendations, or retail POS cash system installations? Reach out directly to our dedicated showroom consultants.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Official Seller Information & Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Highlight Box */}
            <div className="bg-emerald-900 text-white rounded-xl p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-700/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-emerald-800 text-emerald-200 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Immediate Communication</span>
                </div>

                <h3 className="font-serif text-2xl font-bold mb-2">
                  Chat Directly On WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6 font-light">
                  Our sales team is active on WhatsApp to answer questions, share video showcases of dresses, provide skincare routines, and send cash register quotations.
                </p>

                <div className="mb-6 p-4 rounded bg-emerald-950/60 border border-emerald-700/40 font-mono text-base font-bold text-emerald-300 flex items-center justify-between">
                  <span>{ORNEL_WHATSAPP_DISPLAY}</span>
                  <span className="text-xs text-emerald-400 font-sans font-normal uppercase">Available Now</span>
                </div>

                <a
                  href={createWhatsAppUrl("Hello ORNEL Fashion! I want to contact the seller directly for an inquiry.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-sm font-sans"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>Open WhatsApp Chat (+237 654 049 049)</span>
                </a>
              </div>
            </div>

            {/* Seller Contact Info Cards */}
            <div className="bg-white rounded-xl p-6 border border-stone-200/90 space-y-5 shadow-xs">
              
              {/* Showroom Locations */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-0.5">
                    Showroom Hubs
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    <strong>Douala:</strong> Boulevard de la Liberté, Akwa Commercial Center<br />
                    <strong>Yaoundé:</strong> Rue de Bastos, Quartier des Ambassades
                  </p>
                </div>
              </div>

              {/* Direct Call & Telephone */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-0.5">
                    Telephone Line
                  </h4>
                  <a
                    href="tel:+237654049049"
                    className="text-xs text-stone-800 font-mono hover:text-amber-800 transition-colors"
                  >
                    +237 654 049 049
                  </a>
                </div>
              </div>

              {/* Direct Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-0.5">
                    Direct Email
                  </h4>
                  <a
                    href={`mailto:${ORNEL_EMAIL}`}
                    className="text-xs text-stone-800 font-mono hover:text-amber-800 transition-colors"
                  >
                    {ORNEL_EMAIL}
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-0.5">
                    Operating Schedule
                  </h4>
                  <p className="text-xs text-stone-600">
                    Monday – Saturday: 08:30 – 19:30 (GMT+1)<br />
                    Sunday: By appointment for bespoke fittings & wholesale
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Seller Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-10 border border-stone-200/90 shadow-xs">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-950 mb-2">
                  Message Successfully Dispatched!
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto mb-6">
                  Thank you, <strong className="text-stone-900">{fullName}</strong>. Your inquiry reference is <strong className="font-mono text-amber-800">#{generatedTicketId}</strong>. Our sales desk has logged your request and will contact you promptly.
                </p>

                <div className="bg-stone-50 border border-stone-200 rounded-lg p-5 max-w-md mx-auto mb-6 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Department:</span>
                    <span className="font-medium text-stone-900">{topic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Contact:</span>
                    <span className="font-medium text-stone-900">{phone}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getDirectWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Copy to WhatsApp (+237 654 049 049)</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-950 mb-1">
                    Send a Message to the Seller
                  </h3>
                  <p className="text-xs text-stone-500">
                    Fill out the form below. Our response time is typically under 15 minutes during showroom hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your name"
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded p-3 text-stone-900 focus:outline-none focus:border-stone-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+237 654 ... or local number"
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded p-3 text-stone-900 focus:outline-none focus:border-stone-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@domain.com"
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded p-3 text-stone-900 focus:outline-none focus:border-stone-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Division of Interest *
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value as any)}
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded p-3 text-stone-900 focus:outline-none focus:border-stone-500"
                    >
                      <option value="Cosmetics & Beauty">Cosmetics & Beauty (Skin/Perfume)</option>
                      <option value="Branded Apparel">Branded Apparel & Haute Couture</option>
                      <option value="Cash Systems & POS">Cash Systems & Retail POS Hardware</option>
                      <option value="General Sales">Wholesale & Partnership Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Your Message to the Seller *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us which items you wish to order, ask about custom clothing measurements, schedule a showroom viewing, or request POS quotation..."
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded p-3 text-stone-900 focus:outline-none focus:border-stone-500"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Seller</span>
                  </button>

                  <a
                    href={getDirectWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Or direct WhatsApp send</span>
                  </a>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
