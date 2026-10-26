import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, CheckCircle2, ShieldCheck, Truck, MessageCircle, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { createWhatsAppUrl, generateCartOrderMessage, ORNEL_WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    cartSubtotal,
    formatPrice
  } = useShop();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Douala');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'momo' | 'pos-card'>('cod');
  const [orderNotes, setOrderNotes] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) return;

    const newOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(newOrderId);
    setIsCompleted(true);
  };

  const getWhatsAppReceiptUrl = () => {
    const itemsFormatted = cart.map(item => ({
      name: item.product.name,
      quantity: item.quantity,
      variant: item.selectedVariant,
      priceFormatted: formatPrice(item.product.price * item.quantity)
    }));

    const msg = `*CONFIRMED ORDER #${orderId}*\n` + generateCartOrderMessage(
      itemsFormatted,
      formatPrice(cartSubtotal),
      { name, city, address }
    ) + `\n- Payment Method: ${paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'momo' ? 'Mobile Money (MTN / Orange)' : 'POS Terminal Card Swipe'}`;

    return createWhatsAppUrl(msg);
  };

  const handleFinish = () => {
    clearCart();
    setIsCheckoutOpen(false);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-950 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-serif text-lg font-bold">
                {isCompleted ? 'Order Confirmed' : 'Checkout & Delivery Verification'}
              </h2>
              <span className="text-xs text-stone-400">
                ORNEL Fashion Direct Boutique Fulfillment
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isCompleted ? (
          /* Confirmation Screen */
          <div className="p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-stone-950 mb-2">
              Order #{orderId} Confirmed!
            </h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto mb-6">
              Thank you, <strong>{name}</strong>! Your order has been placed successfully. Our dispatch team is preparing your package for delivery in <strong>{city}</strong>.
            </p>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-5 max-w-md mx-auto mb-6 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Order Reference:</span>
                <span className="font-mono font-bold text-stone-900">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Total Payable:</span>
                <span className="font-mono font-bold text-emerald-700">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Option:</span>
                <span className="font-medium text-stone-900 uppercase">
                  {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'momo' ? 'Mobile Money' : 'Card Swipe on POS'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Delivery Address:</span>
                <span className="font-medium text-stone-900">{address}, {city}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsAppReceiptUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Receipt to WhatsApp ({ORNEL_WHATSAPP_DISPLAY})</span>
              </a>

              <button
                onClick={handleFinish}
                className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
              >
                Return to Shop
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
            
            {/* Order Summary Strip */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-stone-900 block">
                  {cart.length} item(s) selected
                </span>
                <span className="text-stone-500">
                  Standard Boutique Packaging Included
                </span>
              </div>
              <div className="text-right font-mono">
                <span className="text-stone-500 text-[11px] block">Order Total:</span>
                <span className="text-base font-bold text-stone-950">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
                1. Delivery Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Recipient's Name"
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded p-2.5 text-stone-900 focus:outline-none focus:border-stone-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+237 654 ... (for dispatch rider call)"
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded p-2.5 text-stone-900 focus:outline-none focus:border-stone-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    City / Region *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded p-2.5 text-stone-900 focus:outline-none focus:border-stone-500"
                  >
                    <option value="Douala">Douala (Same-day dispatch)</option>
                    <option value="Yaoundé">Yaoundé (Same-day dispatch)</option>
                    <option value="Bafoussam">Bafoussam</option>
                    <option value="Kribi">Kribi / Limbe</option>
                    <option value="International">International Shipping</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Delivery Address / Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Neighborhood, Street, or Near Landmark"
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded p-2.5 text-stone-900 focus:outline-none focus:border-stone-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Special Instructions / Fitting Notes (Optional)
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Call before arrival, gift packaging, POS test setup required"
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded p-2.5 text-stone-900 focus:outline-none focus:border-stone-500"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
                2. Select Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Banknote className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold">Cash on Delivery</span>
                  </div>
                  <span className="text-[11px] opacity-80 leading-tight">
                    Pay in cash when rider delivers to your doorstep
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('momo')}
                  className={`p-3 rounded border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'momo'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold">Mobile Money</span>
                  </div>
                  <span className="text-[11px] opacity-80 leading-tight">
                    MTN MoMo or Orange Money instant push
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('pos-card')}
                  className={`p-3 rounded border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'pos-card'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-semibold">POS Card Swipe</span>
                  </div>
                  <span className="text-[11px] opacity-80 leading-tight">
                    Visa / Mastercard on portable rider POS
                  </span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Encrypted & Showroom Verified Order</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-all shadow-sm"
              >
                Confirm Order · {formatPrice(cartSubtotal)}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
