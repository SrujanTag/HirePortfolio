import emailjs from '@emailjs/browser';

// ─────────────────────────────────────────────────────────────────────────────
// EmailJS Configuration
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO SET UP (one-time):
//  1. Log in to https://www.emailjs.com/
//  2. Go to "Email Templates" → Create New Template
//     Subject:  New Hiring Inquiry for {{to_name}} from {{company_name}}
//     Body (HTML):
//       <h2>Hi {{to_name}},</h2>
//       <p>You have a new hiring inquiry from <strong>{{company_name}}</strong>!</p>
//       <p><strong>Recruiter Email:</strong> {{from_email}}</p>
//       <p><strong>Role:</strong> {{role}}</p>
//       <p><strong>Budget:</strong> {{budget}}</p>
//       <p><strong>Message:</strong><br/>{{message}}</p>
//       <hr/>
//       <p style="color:#888">Sent via HirePortfolio</p>
//     "To Email" field: {{to_email}}
//  3. Save the template and copy its Template ID below.
//  4. Go to Account → API Keys and copy your Public Key below.
// ─────────────────────────────────────────────────────────────────────────────

export const EMAILJS_CONFIG = {
  serviceId:  'service_d9opiud',    // ← ✅ Gmail service ID
  templateId: 'template_lpglr5u',  // ← ✅ EmailJS template ID
  publicKey:  'iABNkGJPZCvwBfeab', // ← ✅ EmailJS public key
};

/**
 * sendHireInquiry
 * Sends an email to the target member notifying them of a hire request.
 *
 * @param {object} params
 * @param {string} params.toName     - Recipient's full name
 * @param {string} params.toEmail    - Recipient's email address
 * @param {string} params.fromEmail  - Recruiter's email
 * @param {string} params.company    - Recruiter's company name
 * @param {string} params.role       - Role being hired for
 * @param {string} params.budget     - Budget range
 * @param {string} params.message    - Project description / custom message
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendHireInquiry({ toName, toEmail, fromEmail, company, role, budget, message }) {
  try {
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        to_name:      toName,
        to_email:     toEmail,
        from_email:   fromEmail,
        company_name: company,
        role,
        budget,
        message,
      },
      EMAILJS_CONFIG.publicKey
    );
    return { success: true };
  } catch (error) {
    console.error('[EmailJS] Send failed:', error);
    return { success: false, error: error?.text || 'Failed to send email' };
  }
}
