const db = require('../../../models')
const Product = db.Product
const ProductImage = db.Product_Image
const upload = require('../../middleware/userAvatar')
const fs = require('fs')
const serverBaseURL = process.env.SERVER_BASE_URL || 'http://localhost:8000'
const path = require('path')

const product = {
  addProduct: async (req, res) => {
    try {
      const { name, price, description, weight, categoryId } = req.body

      const product = await db.sequelize.transaction(async (t) => {
        const getProduct = await Product.findOne(
          {
            where: { name }
          },
          {
            transaction: t
          }
        )

        if (getProduct) {
          if (getProduct.categoryId === 99) {
            const data = await Product.update(
              {
                categoryId,
                isActive: 1
              },
              { where: { id: getProduct.id }, transaction: t }
            )
            return data
          } else {
            throw new Error('Duplicate product name')
          }
        } else {
          const data = await Product.create(
            {
              name,
              price,
              description,
              weight,
              categoryId
            },
            {
              transaction: t
            }
          )
          return data
        }
      })

      return res.status(200).json({
        success: 'Create product succeed',
        product
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Create product failed',
        message: err.message
      })
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { name, price, description, weight, categoryId, isActive, id } =
        req.body

      const dataProductId = parseInt(id)
      const dataCategoryId = parseInt(categoryId)

      const product = await db.sequelize.transaction(async (t) => {
        const getProduct = await Product.findOne(
          {
            where: { name }
          },
          {
            transaction: t
          }
        )

        if (getProduct) {
          if (getProduct.id !== id) {
            throw new Error('Duplicate product name')
          } else {
            const data = await Product.update(
              {
                name,
                price,
                description,
                weight,
                isActive,
                categoryId: dataCategoryId
              },
              {
                where: { id: dataProductId },
                transaction: t
              }
            )
            return data
          }
        } else {
          const data = await Product.update(
            {
              name,
              price,
              description,
              weight,
              isActive,
              categoryId: dataCategoryId
            },
            {
              where: { id: dataProductId },
              transaction: t
            }
          )
          return data
        }
      })

      return res.status(200).json({
        success: 'Update product succeed',
        product
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Update product failed',
        message: err.message
      })
    }
  },

  uploadImage: async (req, res) => {
    const productId = req.params.productId
    upload(req, res, (err) => {
      if (err) {
        res.json({
          msg: err
        })
      } else {
        if (req.file == undefined) {
          res.json({
            msg: 'Error: No File Selected!'
          })
        } else {
          ProductImage.create({
            productId,
            image: `${serverBaseURL}/uploads/${req.file.filename}`
          })
            .then(() => {
              res.json({
                msg: 'File Uploaded!',
                file: `${serverBaseURL}/uploads/${req.file.filename}`
              })
            })
            .catch((err) => {
              res.json({
                msg: 'Error occurred while saving to database.'
              })
            })
        }
      }
    })
  },

  deleteImage: async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      // const { image } = req.body

      await db.sequelize.transaction(async (t) => {
        const getImage = await ProductImage.findOne(
          {
            where: { id }
          },
          {
            transaction: t
          }
        )
        const imageUrl = getImage.image

        const parts = imageUrl.split('/')
        const fileName = parts[parts.length - 1]

        if (fs.existsSync(path.resolve(__dirname, `../../../public/uploads/${fileName}`))) {
          fs.unlinkSync(path.resolve(__dirname, `../../../public/uploads/${fileName}`))
        } else {
          res.status(404).send('Image not found')
        }

        await ProductImage.destroy(
          {
            where: { id }
          },
          {
            transaction: t
          }
        )
      })

      return res.status(200).json({
        success: 'Delete image succeed'
      })
    } catch (err) {
      return res.status(500).json({
        error: 'Delete image failed',
        message: err.message
      })
    }
  }
}

module.exports = product
