import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { format } from "https://deno.land/std@0.190.0/datetime/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const OWNER_EMAIL = "mikescordcutters@gmail.com"; // Owner's email

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  notes: string;
}

const generateOwnerEmail = (booking: BookingEmailData) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
    <h1>New Booking Received</h1>
    <p>You have received a new booking from ${booking.customerName}.</p>
    
    <h2>Booking Details:</h2>
    <ul>
      <li><strong>Service:</strong> ${booking.serviceName}</li>
      <li><strong>Date:</strong> ${booking.bookingDate}</li>
      <li><strong>Time:</strong> ${booking.bookingTime}</li>
      <li><strong>Customer Name:</strong> ${booking.customerName}</li>
      <li><strong>Customer Email:</strong> ${booking.customerEmail}</li>
      <li><strong>Customer Phone:</strong> ${booking.customerPhone || 'Not provided'}</li>
    </ul>
    
    ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
    
    <p>You can manage this booking in your dashboard.</p>
  </div>
`;

const generateCustomerEmail = (booking: BookingEmailData) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
    <h1>Booking Confirmation</h1>
    <p>Dear ${booking.customerName},</p>
    <p>Thank you for booking with Glamour's Beauty Salon. Here are your booking details:</p>
    
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h2>Appointment Details:</h2>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Service:</strong> ${booking.serviceName}</li>
        <li><strong>Date:</strong> ${booking.bookingDate}</li>
        <li><strong>Time:</strong> ${booking.bookingTime}</li>
      </ul>
    </div>
    
    <p>Location: 275 Adams St, Newark NJ 07105</p>
    <p>If you need to modify or cancel your appointment, please call us at (973) 344-5199.</p>
    
    <p>We look forward to seeing you!</p>
    <p>Best regards,<br>Glamour's Beauty Salon Team</p>
  </div>
`;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received booking email request");
    const booking: BookingEmailData = await req.json();
    
    // Send email to owner
    console.log("Sending email to owner");
    const ownerEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Glamour's Beauty Salon <onboarding@resend.dev>",
        to: [OWNER_EMAIL],
        subject: `New Booking: ${booking.serviceName} - ${booking.customerName}`,
        html: generateOwnerEmail(booking),
      }),
    });

    // Send confirmation email to customer
    console.log("Sending confirmation email to customer");
    const customerEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Glamour's Beauty Salon <onboarding@resend.dev>",
        to: [booking.customerEmail],
        subject: "Your Booking Confirmation - Glamour's Beauty Salon",
        html: generateCustomerEmail(booking),
      }),
    });

    if (!ownerEmailRes.ok || !customerEmailRes.ok) {
      throw new Error("Failed to send one or more emails");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending booking emails:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send booking emails" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);