const Modal = (props) => {

    return (
        <div id="modal-container" className="flex justify-center align-center">
            <div id="modal">
                <div id="modal-close" className="flex justify-end">
                    <svg onClick={() => props.onClose()} xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24"><path fill="rgb(33,33,33)" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                </div>
                <div id="modal-content">
                    { props.content }
                </div>
            </div>
        </div>
    )

}

export default Modal