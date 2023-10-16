function createHtmlTemplate(email, token) {
  const WHITELISTED_DOMAIN = process.env.WHITELISTED_DOMAIN
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Account Registration Confirmation</title>
    </head>
    <body>
        <div style="text-align: center;">
            <h1>Welcome to AKUI!</h1>
            <p>Hello ${email},</p>
            <p>Your account has been created. Please click the button below to set your data</p>
            <p>Please click the button below, or paste this into your browser to complete the process within one hour of receiving it:</p>
            <a href="${WHITELISTED_DOMAIN}/verify/${token}" style="background-color: orange; color: white; padding: 10px 20px; text-decoration: none;">Set Password</a>
            <br/>
            <p>Best regards,</p>
            <p>Your Service Team AKUI</p>
        </div>
    </body>
    </html>
  `
}

module.exports = { createHtmlTemplate }
