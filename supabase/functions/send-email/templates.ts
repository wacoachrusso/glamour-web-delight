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

const generateEmailLayout = (content: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #FAF9F6;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <!-- Header with Logo -->
        <div style="text-align: center; margin-bottom: 30px; padding: 20px;">
          <img src="https://gwwjldekqleocsbsoybx.supabase.co/storage/v1/object/public/salon_images/513dcf5a-b256-4137-a428-3656375e1aa4.png" alt="Glamour's Beauty Salon" style="max-width: 200px; height: auto;">
        </div>
        
        <!-- Content -->
        \${content}
        
        <!-- Contact Information -->
        <div style="background-color: #FAF9F6; padding: 30px; border-radius: 8px; margin-top: 20px;">
          <div style="text-align: center; color: #1A1A1A;">
            <p style="margin: 10px 0;">
              <strong>Visit Us:</strong><br>
              275 Adams St, Newark NJ 07105
            </p>
            <p style="margin: 10px 0;">
              <strong>Call Us:</strong><br>
              (973) 344-5199
            </p>
            <p style="margin: 10px 0;">
              <strong>Hours:</strong><br>
              Open everyday 10am - 7pm
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #D4AF37;">
          <p style="color: #666; font-size: 14px;">
            Visit our website: <a href="https://www.glamours-beautysalon.com" style="color: #D4AF37; text-decoration: none;">glamours-beautysalon.com</a>
          </p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            © \${new Date().getFullYear()} Glamour's Beauty Salon. All rights reserved.
          </p>
        </div>
      </div>
    </body>
  </html>
`;

export const generateOrderConfirmationEmail = (
  orderDetails: OrderDetails,
  language: Language
) => {
  const t = translations[language].orderConfirmation;
  
  const itemsList = orderDetails.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
      </tr>
    `
    )
    .join("");

  const content = `
    <div style="padding: 0 30px; margin-bottom: 40px;">
      <h1 style="color: #1A1A1A; text-align: center; font-family: 'Playfair Display', serif; font-size: 32px; margin-bottom: 20px;">${t.greeting}</h1>
      
      <div style="background-color: #FAF9F6; padding: 30px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #D4AF37; font-family: 'Playfair Display', serif; margin-bottom: 20px;">${t.orderDetails}</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #F8D7D7;">
              <th style="padding: 12px; text-align: left; color: #1A1A1A;">Product</th>
              <th style="padding: 12px; text-align: center; color: #1A1A1A;">Quantity</th>
              <th style="padding: 12px; text-align: right; color: #1A1A1A;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 12px; text-align: right; font-weight: bold; color: #1A1A1A;">${t.total}:</td>
              <td style="padding: 12px; text-align: right; font-weight: bold; color: #D4AF37;">$${orderDetails.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://glamoursalon.com/support" style="display: inline-block; background-color: #D4AF37; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">
          ${t.support}
        </a>
      </div>
    </div>
  `;

  return generateEmailLayout(content);
};

export const generateInquiryResponseEmail = (
  inquiryDetails: InquiryDetails,
  language: Language
) => {
  const t = translations[language].inquiryResponse;
  
  const content = `
    <div style="padding: 0 30px; margin-bottom: 40px;">
      <h1 style="color: #1A1A1A; text-align: center; font-family: 'Playfair Display', serif; font-size: 32px; margin-bottom: 20px;">${t.greeting} ${inquiryDetails.customerName}!</h1>
      
      <div style="background-color: #FAF9F6; padding: 30px; border-radius: 8px; margin: 20px 0;">
        <p style="color: #1A1A1A; line-height: 1.6; margin-bottom: 20px;">${t.thanks}</p>
        <p style="color: #1A1A1A; line-height: 1.6; margin-bottom: 20px;">${t.response}</p>
        <p style="color: #666; font-style: italic; padding: 20px; background-color: #fff; border-radius: 4px; border-left: 4px solid #D4AF37;">"${inquiryDetails.message}"</p>
      </div>
      
      <div style="width: 80px; height: 2px; background-color: #D4AF37; margin: 30px auto;"></div>
    </div>
  `;

  return generateEmailLayout(content);
};