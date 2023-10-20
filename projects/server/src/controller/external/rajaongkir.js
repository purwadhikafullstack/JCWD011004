const axios = require('axios')

const rajaongkir = {
  province: async (req, res) => {
    try {
      const response = await axios.get(
        'https://api.rajaongkir.com/starter/province',
        {
          headers: {
            Key: process.env.KEY_RAJAONGKIR
          }
        }
      )
      res.json(response.data)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  cityRegency: async (req, res) => {
    const dataProvince = req.query.province
    try {
      const response = await axios.get(
        `https://api.rajaongkir.com/starter/city?province=${dataProvince}`,
        {
          headers: {
            Key: process.env.KEY_RAJAONGKIR
          }
        }
      )
      res.json(response.data)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = rajaongkir
