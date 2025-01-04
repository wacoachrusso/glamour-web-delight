export const sendTestEmail = async (to: string) => {
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF9F6;">
      <h1 style="color: #1A1A1A; text-align: center;">Test Email from Glamour's Beauty Salon</h1>
      <p style="color: #1A1A1A; line-height: 1.6;">This is a test email to verify that our email system is working correctly.</p>
      <p style="text-align: center; color: #666; margin-top: 30px;">Thank you for choosing Glamour's Beauty Salon</p>
    </div>
  `;

  return {
    from: "Glamour's Beauty Salon <onboarding@resend.dev>",
    to: [to],
    subject: "Test Email - Glamour's Beauty Salon",
    html: emailContent,
  };
};