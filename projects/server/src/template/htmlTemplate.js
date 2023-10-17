const createHtmlContent = (email, subject) => {
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
              <p>${subject}</p>
              <br/>
              <p>Best regards,</p>
              <p>Your Service Team AKUI</p>
          </div>
      </body>
      </html>
    `
}

module.exports = createHtmlContent
