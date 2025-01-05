import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { Resend } from "https://esm.sh/@resend/node";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const OWNER_EMAIL = "glamoursbeautysalon1@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { booking, service } = await req.json();
    console.log("Received booking:", booking);
    console.log("Service details:", service);

    // Send email to salon owner
    const ownerEmailResponse = await resend.emails.send({
      from: "Glamour's Beauty Salon <onboarding@resend.dev>",
      to: OWNER_EMAIL,
      subject: "New Booking Request",
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Service:</strong> ${service.name}</p>
        <p><strong>Customer:</strong> ${booking.customer_name}</p>
        <p><strong>Email:</strong> ${booking.customer_email}</p>
        <p><strong>Phone:</strong> ${booking.customer_phone}</p>
        <p><strong>Date:</strong> ${booking.booking_date}</p>
        <p><strong>Time:</strong> ${booking.booking_time}</p>
        ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
      `,
    });

    console.log("Owner email sent:", ownerEmailResponse);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Glamour's Beauty Salon <onboarding@resend.dev>",
      to: booking.customer_email,
      subject: "Booking Confirmation - Glamour's Beauty Salon",
      html: `
        <h2>Booking Confirmation</h2>
        <p>Thank you for booking with Glamour's Beauty Salon!</p>
        <p><strong>Service:</strong> ${service.name}</p>
        <p><strong>Date:</strong> ${booking.booking_date}</p>
        <p><strong>Time:</strong> ${booking.booking_time}</p>
        <p>If you need to make any changes to your appointment, please contact us:</p>
        <p>Phone: (973) 344-5199</p>
        <p>Email: ${OWNER_EMAIL}</p>
        <p>Address: 275 Adams St, Newark NJ 07105</p>
      `,
    });

    console.log("Customer email sent:", customerEmailResponse);

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