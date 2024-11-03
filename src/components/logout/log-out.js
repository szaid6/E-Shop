import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Logout = ({ sx }) => {
	// Ensure sx is defined
	if (sx === null || sx === undefined) {
		sx = {};
	}

	const navigate = useNavigate();

	let performLogout = () => {
		// Perform logout logic here (e.g., clearing tokens or session storage)
		navigate("/login");
	}

	return (
		<Button sx={sx}
				variant="contained"
				color="secondary"
				onClick={() => performLogout()}>
			LOGOUT
		</Button>
	);
};

const mapStateToProps = (state) => {
	return {
		sortBy: state.metadata?.selectedSortBy,
		category: state.metadata?.selectedCategory,
	};
};

// Remove mapDispatchToProps since clearAllMetadata is no longer needed
export default connect(mapStateToProps)(Logout);
