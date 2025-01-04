import { translations } from "./translations.ts";

export interface OrderDetails {
  orderId: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  customerEmail: string;
}

export interface InquiryDetails {
  customerName: string;
  customerEmail: string;
  message: string;
}

export type Language = "en" | "es" | "pt";

const LOGO_URL = "/lovable-uploads/61e5db9a-2533-4a68-a338-13395392c7ed.png";

export const generateOrderConfirmationEmail = (
  orderDetails: OrderDetails,
  language: Language
) => {
  const t = translations[language].orderConfirmation;
  
  const itemsList = orderDetails.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">$${item.price.toFixed(2)}</td>
      </tr>
    `
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF9F6;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="${LOGO_URL}" alt="Glamour's Beauty Salon" style="max-width: 200px;">
      </div>
      
      <h1 style="color: #1A1A1A; text-align: center;">${t.greeting}</h1>
      
      <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #D4AF37;">${t.orderDetails}</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #F8D7D7;">
              <th style="padding: 10px; text-align: left;">Product</th>
              <th style="padding: 10px; text-align: left;">Quantity</th>
              <th style="padding: 10px; text-align: left;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">${t.total}:</td>
              <td style="padding: 10px; font-weight: bold;">$${orderDetails.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <p style="text-align: center; margin-top: 30px;">
        <a href="https://your-salon-website.com/support" style="background-color: #D4AF37; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          ${t.support}
        </a>
      </p>
      
      <p style="text-align: center; color: #666; margin-top: 30px;">${t.footer}</p>
    </div>
  `;
};

export const generateInquiryResponseEmail = (
  inquiryDetails: InquiryDetails,
  language: Language
) => {
  const t = translations[language].inquiryResponse;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF9F6;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="${LOGO_URL}" alt="Glamour's Beauty Salon" style="max-width: 200px;">
      </div>
      
      <h1 style="color: #1A1A1A; text-align: center;">${t.greeting} ${inquiryDetails.customerName}!</h1>
      
      <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="color: #1A1A1A; line-height: 1.6;">${t.thanks}</p>
        <p style="color: #1A1A1A; line-height: 1.6;">${t.response}</p>
        <p style="color: #666; font-style: italic;">"${inquiryDetails.message}"</p>
      </div>
      
      <p style="text-align: center; color: #666; margin-top: 30px;">${t.footer}</p>
    </div>
  `;
};