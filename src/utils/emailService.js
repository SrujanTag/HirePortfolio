import emailjs from '@emailjs/browser';
export const EMAILJS_CONFIG = {
  serviceId: 'service_d9opiud',
  templateId: 'template_lpglr5u',
  publicKey: 'iABNkGJPZCvwBfeab'
};
export async function sendHireInquiry({
  toName,
  toEmail,
  fromEmail,
  company,
  role,
  budget,
  message
}) {
  try {
    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
      to_name: toName,
      to_email: toEmail,
      from_email: fromEmail,
      company_name: company,
      role,
      budget,
      message
    }, EMAILJS_CONFIG.publicKey);
    return {
      success: true
    };
  } catch (error) {
    console.error('[EmailJS] Send failed:', error);
    return {
      success: false,
      error: error?.text || 'Failed to send email'
    };
  }
}