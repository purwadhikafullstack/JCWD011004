const axios = require('axios')

const opencage = {
  longlat: async (req, res) => {
    const { cityRegency, province } = req.query
    const location = `${cityRegency}, ${province}, Indonesia`
    const language = 'en'
    const pretty = 1
    try {
      const response = await axios.get(
        'https://api.opencagedata.com/geocode/v1/json',
        {
          params: {
            q: location,
            key: process.env.KEY_OPENCAGE,
            language: language,
            pretty: pretty
          }
        }
      )
      res.json(response.data)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = opencage
