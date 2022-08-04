import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggalable = forwardRef((props, refs) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisible
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}> {props.buttonLabel} </button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}> cancel </button>
      </div>
    </div>
  )


})

Toggalable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggalable.displayName = 'Toggalable'


export default Toggalable