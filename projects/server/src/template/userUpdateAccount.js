const createHtmlContent = (email, subject, token) => {
  const WHITELISTED_DOMAIN = process.env.WHITELISTED_DOMAIN
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>${subject}</title>
    </head>
    <body>
        <div style="text-align: center;">
            <h1>${subject}</h1>
            <p>Hello ${email},</p>
            <p>You are receiving this because you (or someone else) have requested the update for your account.</p>
            <p>Please click the button below, or paste this into your browser to complete the process within one hour of receiving it:</p>
            <a href="${WHITELISTED_DOMAIN}/verify-updates/${token}" style="background-color: orange; color: white; padding: 10px 20px; text-decoration: none;">Reset Password</a>
            <br/>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            <br/>
            <p>Best regards,</p>
            <p>Your Service Team</p>
        </div>
    </body>
    </html>
  `
}

module.exports = { createHtmlContent }
