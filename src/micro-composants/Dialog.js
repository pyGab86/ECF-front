import { useState } from "react";

// 2 types de dialogue : 
// - dialogue de confirmation
// - dialogue d'information (log erreurs, notif)
// La dialogue de conf doit avoir comme props onCancel et onConfirm
// qui sont des fonctions éxécutées au cancel et au confirm
const Dialog = (props) => {

    if (props.type === 'confirm') {
        return (
            <div id="dialog" className="confirm-dialog flex column justify-evenly align-center">
                <h3>Confirmation</h3>
                <p>{typeof props.text != "undefined" ? props.text : "Veuillez confirmer ce changement" }</p>
                <div id="dialog-confirm-btns" className="flex column align-center gap10">
                    <button id="cancel" onClick={() => { props.onCancel() }}>Annuler</button>
                    <button onClick={() => { props.onConfirm() }}>Confirmer</button>
                </div>
            </div>
        )
    }

}

export default Dialog