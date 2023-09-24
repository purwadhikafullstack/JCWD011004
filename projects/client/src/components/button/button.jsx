const IconButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      style={{ width: '170px' }}
    >
      {text}
    </button>
  )
}

export default IconButton
