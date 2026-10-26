/**
 * WhatsApp Integration Utilities for ORNEL Fashion
 * Contact Number: +237654049049
 */

export const ORNEL_WHATSAPP_PHONE = '237654049049';
export const ORNEL_WHATSAPP_DISPLAY = '+237 654 049 049';
export const ORNEL_EMAIL = 'contact@ornelfashion.com';
export const ORNEL_LOCATION = 'Avenue Commerciale, Akwa, Douala & Bastos, Yaoundé, Cameroon';

export function createWhatsAppUrl(message: string): string {
  const cleanPhone = ORNEL_WHATSAPP_PHONE.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function openWhatsAppChat(message: string): void {
  const url = createWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function generateProductInquiryMessage(productName: string, price: string, variant?: string): string {
  let msg = `Hello ORNEL Fashion Sales Team,\n\nI am interested in ordering/inquiring about:\n- Product: *${productName}*\n- Price: *${price}*`;
  if (variant) {
    msg += `\n- Selected Option/Size: *${variant}*`;
  }
  msg += `\n\nCould you please confirm immediate availability and delivery options? Thank you!`;
  return msg;
}

export function generateCashSystemQuoteMessage(packageName: string, businessType?: string): string {
  return `Hello ORNEL Fashion POS & Cash Systems Department,\n\nI would like to request a quotation and technical consultation for:\n- Solution: *${packageName}*\n${businessType ? `- Business Type: *${businessType}*\n` : ''}\nWe need details regarding installation, warranty, receipt printer setup, and cash drawer integration.\n\nPlease get back to me with pricing and delivery schedule.`;
}

export function generateCartOrderMessage(items: { name: string; quantity: number; variant?: string; priceFormatted: string }[], totalFormatted: string, customerInfo?: { name: string; city: string; address: string }): string {
  let msg = `Hello ORNEL Fashion Sales Team,\n\nI would like to place an order from your website catalog:\n\n*ORDER SUMMARY:*`;
  items.forEach((item, index) => {
    msg += `\n${index + 1}. *${item.name}* ${item.variant ? `(${item.variant})` : ''} x${item.quantity} — ${item.priceFormatted}`;
  });
  msg += `\n\n*TOTAL AMOUNT: ${totalFormatted}*`;

  if (customerInfo && customerInfo.name) {
    msg += `\n\n*CUSTOMER DETAILS:*\n- Name: ${customerInfo.name}\n- City/Location: ${customerInfo.city}\n- Address: ${customerInfo.address}`;
  }

  msg += `\n\nPlease confirm availability, payment method (Cash on Delivery / Mobile Money / Bank Transfer), and estimated delivery time.`;
  return msg;
}
