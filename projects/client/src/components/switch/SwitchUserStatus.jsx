import { useFormikContext } from 'formik'

const SwitchUserStatus = ({ name }) => {
  const { values, setFieldValue } = useFormikContext()
  const isOn = values[name]

  const toggleSwitch = (event) => {
    event.preventDefault() // Prevent the event from triggering a form submit
    setFieldValue(name, !isOn)
  }

  return (
    <button
      onClick={toggleSwitch}
      className={`w-12 h-6 flex items-center bg-${
        isOn ? 'orange-700' : 'black'
      } rounded-full p-1 duration-300 ease-in-out`}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform ${
          isOn ? 'translate-x-6' : 'translate-x-0'
        } duration-300 ease-in-out`}
      ></div>
    </button>
  )
}

export default SwitchUserStatus
