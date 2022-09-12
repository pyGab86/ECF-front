import { useState } from "react"

/*
    Le toggle comprend 3 props: onActivate, onDesactivate et le label
    On peut executer les fonctions
    passées dans onActivate et onDesactivate
*/

const Toggle = (props) => {

    const [toggleState, setToggleState] = useState(props.default)

    const toggleManager = () => {
        if (toggleState === 'activated') {
            setToggleState('desactivated')
            props.onDesactivate()
        } else if (toggleState === 'desactivated') {
            setToggleState('activated')
            props.onActivate()
        }
    }

    return (
        <div>
            <label>{props.label}</label>
            <div className={`toggle-container toggle-${toggleState} flex align-center ${toggleState === 'activated' ? "justify-end" : null}`}  onClick={() => toggleManager()}>
                <div></div>
            </div>
        </div>
    )

}

export default Toggle