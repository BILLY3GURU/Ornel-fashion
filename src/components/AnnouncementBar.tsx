import React from 'react';
import { useShop } from '../context/ShopContext';
import { Currency } from '../types';
import { ORNEL_WHATSAPP_DISPLAY, createWhatsAppUrl } from '../utils/whatsapp';
import { MessageCircle, Phone, Globe } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { currency, setCurrency } = useShop();

  return (
    <div className="bg-stone-950 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Store WhatsApp Concierge */}
        <div className="flex items-center gap-4">
          <a
            href={createWhatsAppUrl("Hello ORNEL Fashion, I would like to speak with customer service.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sales & WhatsApp Support:</span>
            <span className="font-mono font-medium text-emerald-400">{ORNEL_WHATSAPP_DISPLAY}</span>
          </a>
          <span className="hidden md:inline text-stone-600">·</span>
          <span className="hidden md:inline text-stone-400">
            Showrooms: Akwa, Douala & Bastos, Yaoundé
          </span>
        </div>

        {/* Center: Promotional shipping note */}
        <div className="hidden lg:flex items-center gap-2 text-stone-300">
          <span>Complimentary boutique delivery on orders above $150 / 90,000 FCFA</span>
        </div>

        {/* Right: Currency Selector & Language */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-stone-400">
            <Globe className="w-3.5 h-3.5" />
            <span>ENG / FR</span>
          </div>
          <span className="text-stone-700">|</span>
          <div className="flex items-center gap-1">
            <span className="text-stone-400">Currency:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-stone-900 text-stone-200 text-xs rounded border border-stone-700 px-2 py-0.5 focus:outline-none focus:border-stone-500 cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="XAF">XAF (FCFA)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
