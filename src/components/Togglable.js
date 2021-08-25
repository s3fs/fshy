import React, { useState } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const componentHidden = { display: visible ? 'none' : '' }
    const componentShown = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={componentHidden}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={componentShown}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
}

export default Togglable