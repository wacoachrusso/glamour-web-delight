import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { translations } from "./translations.ts";
import { 
  generateOrderConfirmationEmail, 
  generateInquiryResponseEmail,
  type Language,
  type OrderDetails,
  type InquiryDetails 
} from "./templates.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: "order_confirmation" | "inquiry_response";
  language: Language;
  data: {
    orderDetails?: OrderDetails;
    inquiryDetails?: InquiryDetails;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, language, data }: EmailRequest = await req.json();
    console.log("Received email request:", { type, language, data });

    let emailContent: string;
    let subject: string;
    let to: string[];

    if (type === "order_confirmation" && data.orderDetails) {
      emailContent = generateOrderConfirmationEmail(data.orderDetails, language);
      subject = translations[language].orderConfirmation.subject;
      to = [data.orderDetails.customerEmail];
    } else if (type === "inquiry_response" && data.inquiryDetails) {
      emailContent = generateInquiryResponseEmail(data.inquiryDetails, language);
      subject = translations[language].inquiryResponse.subject;
      to = [data.inquiryDetails.customerEmail];
    } else {
      throw new Error("Invalid email type or missing data");
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Glamour's Beauty Salon <noreply@your-salon-domain.com>",
        to,
        subject,
        html: emailContent,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Error sending email:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const result = await res.json();
    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);