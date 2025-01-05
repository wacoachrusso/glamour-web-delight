import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const OWNER_EMAIL = "glamoursbeautysalon1@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  notes?: string;
  employeeId?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingEmailRequest = await req.json();
    console.log("Processing booking email request:", bookingData);

    // Send email to customer
    console.log("Sending confirmation email to customer:", bookingData.customerEmail);
    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Glamour's Beauty Salon <onboarding@resend.dev>",
        to: [bookingData.customerEmail],
        subject: "Your Booking Confirmation - Glamour's Beauty Salon",
        html: `
          <h2>Booking Confirmation</h2>
          <p>Dear ${bookingData.customerName},</p>
          <p>Thank you for booking with Glamour's Beauty Salon! Your appointment details are:</p>
          <p><strong>Service:</strong> ${bookingData.serviceName}</p>
          <p><strong>Date:</strong> ${bookingData.bookingDate}</p>
          <p><strong>Time:</strong> ${bookingData.bookingTime}</p>
          <p>If you need to make any changes to your appointment, please contact us:</p>
          <p>Phone: (973) 344-5199</p>
          <p>Email: ${OWNER_EMAIL}</p>
          <p>Address: 275 Adams St, Newark NJ 07105</p>
        `,
      }),
    });

    if (!customerEmailResponse.ok) {
      const errorData = await customerEmailResponse.text();
      console.error("Error sending customer email:", errorData);
      throw new Error(`Failed to send customer email: ${errorData}`);
    }

    console.log("Customer email sent successfully");

    // Send notification to salon owner
    console.log("Sending notification email to salon owner");
    const ownerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Glamour's Beauty Salon <onboarding@resend.dev>",
        to: [OWNER_EMAIL],
        subject: "New Booking Notification",
        html: `
          <h2>New Booking Request</h2>
          <p><strong>Service:</strong> ${bookingData.serviceName}</p>
          <p><strong>Customer:</strong> ${bookingData.customerName}</p>
          <p><strong>Email:</strong> ${bookingData.customerEmail}</p>
          <p><strong>Phone:</strong> ${bookingData.customerPhone}</p>
          <p><strong>Date:</strong> ${bookingData.bookingDate}</p>
          <p><strong>Time:</strong> ${bookingData.bookingTime}</p>
          ${bookingData.notes ? `<p><strong>Notes:</strong> ${bookingData.notes}</p>` : ''}
        `,
      }),
    });

    if (!ownerEmailResponse.ok) {
      const errorData = await ownerEmailResponse.text();
      console.error("Error sending owner email:", errorData);
      throw new Error(`Failed to send owner email: ${errorData}`);
    }

    console.log("Owner notification email sent successfully");

    return new Response(
      JSON.stringify({ message: "Booking emails sent successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing booking emails:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send booking emails", 
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});