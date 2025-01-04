import { supabase } from "@/integrations/supabase/client";

interface OrderEmailData {
  orderId: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  customerEmail: string;
}

interface InquiryEmailData {
  customerName: string;
  customerEmail: string;
  message: string;
}

export const sendTestEmail = async (to: string) => {
  try {
    const { data, error } = await supabase.functions.invoke("send-email", {
      body: {
        type: "test",
        to,
      },
    });

    if (error) throw error;
    console.log("Test email sent:", data);
    return data;
  } catch (error) {
    console.error("Error sending test email:", error);
    throw error;
  }
};

export const sendOrderConfirmationEmail = async (
  orderData: OrderEmailData,
  language: string = "en"
) => {
  try {
    const { data, error } = await supabase.functions.invoke("send-email", {
      body: {
        type: "order_confirmation",
        language,
        data: {
          orderDetails: orderData,
        },
      },
    });

    if (error) throw error;
    console.log("Order confirmation email sent:", data);
    return data;
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    throw error;
  }
};

export const sendInquiryResponseEmail = async (
  inquiryData: InquiryEmailData,
  language: string = "en"
) => {
  try {
    const { data, error } = await supabase.functions.invoke("send-email", {
      body: {
        type: "inquiry_response",
        language,
        data: {
          inquiryDetails: inquiryData,
        },
      },
    });

    if (error) throw error;
    console.log("Inquiry response email sent:", data);
    return data;
  } catch (error) {
    console.error("Error sending inquiry response email:", error);
    throw error;
  }
};