import { useState, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 5px 15px;
    color: #fff;
    background-color: #FF715B;
    border: none;
    border-radius: 5px;
`

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const showWhenClosed = { display: visible ? 'none' : '' }
    const showWhenOpen = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={showWhenClosed}>
                <StyledButton onClick={toggleVisibility}>{props.buttonLabel}</StyledButton>
            </div>
            <div style={showWhenOpen}>
                {props.children}
                <StyledButton onClick={toggleVisibility}>Cancel</StyledButton>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable