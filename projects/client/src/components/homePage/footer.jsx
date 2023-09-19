import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-wrap justify-center">
        <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-400">Email: contact@example.com</p>
          <p className="text-gray-400">Phone: +62 (123) 456-7890</p>
          <p className="text-gray-400">Address: 1234 Street, City, Country</p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
          <h2 className="text-xl font-semibold mb-4">Links</h2>
          <ul className="list-none">
            <li className="mb-2">
              <a
                href="/product"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Products
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                About Us
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <ul className="list-none">
            <li className="mb-2">
              <a
                href="https://web.facebook.com/"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Facebook
              </a>
            </li>
            <li className="mb-2">
              <a
                href="https://twitter.com/"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Twitter
              </a>
            </li>
            <li className="mb-2">
              <a
                href="https://www.instagram.com/"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-600 mt-6 pt-4 text-center">
        &copy; {new Date().getFullYear()} AKUI. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
