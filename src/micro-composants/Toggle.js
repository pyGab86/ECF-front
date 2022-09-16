import { useEffect, useState } from "react"
import Dialog from "./Dialog"

/*
    Le toggle comprend 3 props: onActivate, onDesactivate et le label
    On peut executer les fonctions
    passées dans onActivate et onDesactivate
*/

const Toggle = (props) => {

    const [toggleState, setToggleState] = useState(props.default)
    const [dialogShown, setDialogShown] = useState(false)

    const toggleManager = () => {
        if (props.canEdit) {
            if (toggleState) {
                setToggleState(false)
                props.onDesactivate()
            } else {
                setToggleState(true)
                props.onActivate()
            }
        } else if (!dialogShown) {
            setDialogShown(true)
            setTimeout(() => {
                setDialogShown(false)
            }, 5000)
        }
    }

    return (
        <>
            <div>
                <label>{props.label}</label>
                <div className={`toggle-container toggle-${toggleState ? 'activated' : 'desactivated'} flex align-center ${toggleState ? "justify-end" : null}`}  onClick={() => toggleManager()}>
                    <div></div>
                </div>
            </div>
            {
                dialogShown ?
                <Dialog type="log" logLevel="error" message="Vous n'êtes pas autorisé à modifier les permissions."/>:
                null
            }
        </>
    )

}

export default Toggle