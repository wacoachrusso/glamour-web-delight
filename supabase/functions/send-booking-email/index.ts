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
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const bookingData: BookingEmailRequest = await req.json();
    console.log("Received booking data:", bookingData);

    // Send email to salon owner
    const ownerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Glamour's Beauty Salon <onboarding@resend.dev>",
        to: OWNER_EMAIL,
        subject: "New Booking Request",
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

    console.log("Owner email response:", ownerEmailResponse.status);

    // Send confirmation email to customer
    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Glamour's Beauty Salon <onboarding@resend.dev>",
        to: bookingData.customerEmail,
        subject: "Booking Confirmation - Glamour's Beauty Salon",
        html: `
          <h2>Booking Confirmation</h2>
          <p>Thank you for booking with Glamour's Beauty Salon!</p>
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

    console.log("Customer email response:", customerEmailResponse.status);

    return new Response(
      JSON.stringify({ message: "Emails sent successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send emails" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});