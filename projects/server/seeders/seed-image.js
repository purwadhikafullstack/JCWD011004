module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Product_Images', [
      {
        productId: 1,
        image:
          'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        image:
          'https://media.istockphoto.com/id/490673902/photo/roundabout-hi-jakarta-landmark-at-night.jpg?s=612x612&w=0&k=20&c=bv93EvZ7xJSCxfPXFbHKW_3VMi3lPmMB4Yym8fh_bfE=',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        image:
          'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9ufGVufDB8fDB8fHww&w=1000&q=80',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 4,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2vwMWrCdsPXVpmd_EnntJm36LH5vtpBkmz2hoiNPC-KK1nhVb_ebW3uKGBxGBIO6OkY4&usqp=CAU',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Product_Images', null, {})
  }
}
