import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { 
  generateOrderConfirmationEmail, 
  generateInquiryResponseEmail,
  type Language,
  type OrderDetails,
  type InquiryDetails 
} from "./templates.ts";
import { translations } from "./translations.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: "order_confirmation" | "inquiry_response" | "test";
  language?: Language;
  to?: string;
  data?: {
    orderDetails?: OrderDetails;
    inquiryDetails?: InquiryDetails;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, language = "en", to, data }: EmailRequest = await req.json();
    console.log("Received email request:", { type, language, to, data });

    let emailContent: string;
    let subject: string;
    let recipients: string[];

    // For testing purposes, always send to the verified email
    const VERIFIED_EMAIL = "mikescordcutters@gmail.com";

    if (type === "order_confirmation" && data?.orderDetails) {
      emailContent = generateOrderConfirmationEmail(data.orderDetails, language);
      subject = translations[language].orderConfirmation.subject;
      recipients = [data.orderDetails.customerEmail];
    } else if (type === "inquiry_response" && data?.inquiryDetails) {
      emailContent = generateInquiryResponseEmail(data.inquiryDetails, language);
      subject = translations[language].inquiryResponse.subject;
      recipients = [data.inquiryDetails.customerEmail];
    } else if (type === "test") {
      emailContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Test Email - Glamour's Beauty Salon</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #FAF9F6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header with Logo -->
              <div style="text-align: center; margin-bottom: 30px; padding: 20px;">
                <img src="https://gwwjldekqleocsbsoybx.supabase.co/storage/v1/object/public/salon_images/513dcf5a-b256-4137-a428-3656375e1aa4.png?t=${Date.now()}" alt="Glamour's Beauty Salon" style="max-width: 200px; height: auto;">
              </div>
              
              <!-- Content -->
              <div style="padding: 0 30px; margin-bottom: 40px;">
                <h1 style="color: #1A1A1A; text-align: center; font-family: 'Playfair Display', serif; font-size: 32px; margin-bottom: 20px;">Welcome to Luxury</h1>
                <p style="color: #1A1A1A; line-height: 1.6; text-align: center; font-size: 16px;">This is a test email to verify that our email system is working correctly. Experience luxury beauty services in an elegant setting.</p>
                
                <!-- Decorative Line -->
                <div style="width: 80px; height: 2px; background-color: #D4AF37; margin: 30px auto;"></div>
              </div>
              
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
                  Visit our website: <a href="https://www.glamours-beautysalon.com" style="color: #D4AF37; text-decoration: none;">www.glamours-beautysalon.com</a>
                </p>
                <p style="color: #666; font-size: 12px; margin-top: 20px;">
                  © ${new Date().getFullYear()} Glamour's Beauty Salon. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `;
      subject = "Welcome to Glamour's Beauty Salon";
      // Use the verified email for testing
      recipients = [VERIFIED_EMAIL];
      console.log("Using verified email for testing:", VERIFIED_EMAIL);
    } else {
      throw new Error("Invalid email type or missing required data");
    }

    console.log("Sending email to:", recipients);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Glamour's Beauty Salon <onboarding@resend.dev>",
        to: recipients,
        subject,
        html: emailContent,
        reply_to: "info@glamoursalon.com",
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Error from Resend API:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const result = await res.json();
    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);