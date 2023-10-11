import { confirmAlert } from "react-confirm-alert";





const Modal = () => {
	confirmAlert({
		customUi: ({ onClose }) => {
			return (
				<div style={{ color: "secondary.main" }}>
					<p style={{ color: "primary.main" }}>
						are you sure you want to reload? you will have to sign in again.
					</p>
						<button
						onClick={() => {
							navigate("/sign-up")
							onClose();
						}}
						style={{ backgroundColor: "#ccc" }}
						>
						Yes
						</button>
						<button
						onClick={onClose}
						style={{ backgroundColor: "#ccc" }}
						>
						No
						</button>
				</div>
			)
		}
	})
}

export default Modal;