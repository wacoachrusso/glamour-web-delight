import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: "order_confirmation" | "inquiry_response";
  language: "en" | "es" | "pt";
  data: {
    orderDetails?: {
      orderId: string;
      items: Array<{
        name: string;
        quantity: number;
        price: number;
      }>;
      total: number;
      customerEmail: string;
    };
    inquiryDetails?: {
      customerName: string;
      customerEmail: string;
      message: string;
    };
  };
}

const translations = {
  en: {
    orderConfirmation: {
      subject: "Order Confirmation - Glamour's Beauty Salon",
      greeting: "Thank you for your order!",
      orderDetails: "Order Details",
      total: "Total",
      support: "Need help? Contact our support team",
      footer: "Thank you for choosing Glamour's Beauty Salon",
    },
    inquiryResponse: {
      subject: "Thank you for contacting Glamour's Beauty Salon",
      greeting: "Hello",
      thanks: "Thank you for reaching out to us",
      response: "We have received your inquiry and will get back to you shortly",
      footer: "Best regards, Glamour's Beauty Salon Team",
    },
  },
  es: {
    orderConfirmation: {
      subject: "Confirmación de Pedido - Salón de Belleza Glamour",
      greeting: "¡Gracias por tu pedido!",
      orderDetails: "Detalles del Pedido",
      total: "Total",
      support: "¿Necesitas ayuda? Contacta a nuestro equipo de soporte",
      footer: "Gracias por elegir el Salón de Belleza Glamour",
    },
    inquiryResponse: {
      subject: "Gracias por contactar al Salón de Belleza Glamour",
      greeting: "Hola",
      thanks: "Gracias por contactarnos",
      response: "Hemos recibido tu consulta y te responderemos pronto",
      footer: "Saludos cordiales, Equipo del Salón de Belleza Glamour",
    },
  },
  pt: {
    orderConfirmation: {
      subject: "Confirmação de Pedido - Salão de Beleza Glamour",
      greeting: "Obrigado pelo seu pedido!",
      orderDetails: "Detalhes do Pedido",
      total: "Total",
      support: "Precisa de ajuda? Entre em contato com nossa equipe de suporte",
      footer: "Obrigado por escolher o Salão de Beleza Glamour",
    },
    inquiryResponse: {
      subject: "Obrigado por contatar o Salão de Beleza Glamour",
      greeting: "Olá",
      thanks: "Obrigado por nos contatar",
      response: "Recebemos sua consulta e responderemos em breve",
      footer: "Atenciosamente, Equipe do Salão de Beleza Glamour",
    },
  },
};

const generateOrderConfirmationEmail = (
  orderDetails: EmailRequest["data"]["orderDetails"],
  language: EmailRequest["language"]
) => {
  const t = translations[language].orderConfirmation;
  
  const itemsList = orderDetails?.items
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
        <img src="https://your-salon-logo-url.com/logo.png" alt="Glamour's Beauty Salon" style="max-width: 200px;">
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
              <td style="padding: 10px; font-weight: bold;">$${orderDetails?.total.toFixed(2)}</td>
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

const generateInquiryResponseEmail = (
  inquiryDetails: EmailRequest["data"]["inquiryDetails"],
  language: EmailRequest["language"]
) => {
  const t = translations[language].inquiryResponse;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF9F6;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://your-salon-logo-url.com/logo.png" alt="Glamour's Beauty Salon" style="max-width: 200px;">
      </div>
      
      <h1 style="color: #1A1A1A; text-align: center;">${t.greeting} ${inquiryDetails?.customerName}!</h1>
      
      <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="color: #1A1A1A; line-height: 1.6;">${t.thanks}!</p>
        <p style="color: #1A1A1A; line-height: 1.6;">${t.response}.</p>
        <p style="color: #666; font-style: italic;">"${inquiryDetails?.message}"</p>
      </div>
      
      <p style="text-align: center; color: #666; margin-top: 30px;">${t.footer}</p>
    </div>
  `;
};

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