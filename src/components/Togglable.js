import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const componentHidden = { display: visible ? 'none' : '' }
    const componentShown = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
            return {
                toggleVisibility
            }
        }
    )

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
})

export default Togglable