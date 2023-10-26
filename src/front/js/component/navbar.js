import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	let token = false;

	useEffect(() => {
		if (store.token && store.token != "" && store.token != undefined) actions.getMessage();
		if (store.token && store.token != "" && store.token != undefined) actions.getStatus();
		if (store.token == null) token = false;
		if (store.token !== null) token = true;
	},
		[store.token]
	);

	return (
		// <nav className="navbar bg-dark d-flex justify-content-end">
		// 	<div className="container">
		// 		<Link to="/">
		// 			<i className="fa-solid fa-house" style={{ color: "#ffffff" }}></i>
		// 		</Link>
		// 		{store.token ?
		// 			<p className="online-status" style={{ color: "white", marginBottom: "0px", fontSize: "12px", marginLeft: "800px" }}>
		// 				<span className="logged-in-dot" style={{ color: "green", marginRight: "5px", fontSize: "12px"}}>●</span>
		// 				{store.status}
		// 			</p>
		// 			:
		// 			<p style={{ color: "white", display: "none" }}>{store.greeting}</p>
		// 		}
		// 		<div className="ml-auto">

		// 			{store.token ?
		// 				<button className="btn btn-link" style={{ color: "#ffffff" }}>
		// 					<Link to={"/private/"}
		// 						className="btn btn-info"
		// 						style={{ color: "black", border: "none" }}>
		// 						{store.message}
		// 					</Link>
		// 				</button>
		// 				:
		// 				<button className="btn btn-link" style={{ color: "#ffffff" }}>
		// 					<Link to={"/private/"}
		// 						className="btn btn-info"
		// 						style={{ color: "black", border: "none", display: "none" }}>
		// 						{store.message}
		// 					</Link>
		// 				</button>

		// 			}
		// 			{!store.token ?
		// 				<Link to="/login">
		// 					<button className="btn btn-dark">
		// 						Login
		// 						<i className="fa-solid fa-right-to-bracket ps-2" style={{ color: "#ffffff" }}></i>
		// 					</button>
		// 				</Link>
		// 				:
		// 				<button onClick={() => actions.logout()} className="btn btn-dark">
		// 					Logout
		// 					<i className="fa-solid fa-right-from-bracket ps-2" style={{ color: "#ffffff" }}></i>
		// 				</button>
		// 			}
		// 		</div>
		// 	</div>
		// </nav>
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<Link to="/" className="navbar-brand">
					<i className="fa-solid fa-house" style={{ color: "#ffffff" }}></i>
				</Link>

				{store.token && (
					<div className="d-flex align-items-center">
						<span className="online-status me-2" style={{ color: "green", fontSize: "12px" }}>
							●
						</span>
						<p className="mb-0" style={{ color: "white", fontSize: "12px" }}>
							{store.status}
						</p>
					</div>
				)}

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						{store.token ?
							<button className="btn btn-link" style={{ color: "#ffffff" }}>
								<Link to={"/private/"}
									className="btn btn-info"
									style={{ color: "black", border: "none" }}>
									{store.message}
								</Link>
							</button>
							:
							<button className="btn btn-link" style={{ color: "#ffffff" }}>
								<Link to={"/private/"}
									className="btn btn-info"
									style={{ color: "black", border: "none", display: "none" }}>
									{store.message}
								</Link>
							</button>

						}

						{!store.token ? (
							<li className="nav-item mt-1">
								<Link to="/login" className="nav-link">
									Login
									<i className="fa-solid fa-right-to-bracket ps-2" style={{ color: "#ffffff" }}></i>
								</Link>
							</li>
						) : (
							<li className="nav-item mt-1">
								<button onClick={() => actions.logout()} className="btn btn-link nav-link">
									Logout
									<i className="fa-solid fa-right-from-bracket ps-2" style={{ color: "#ffffff" }}></i>
								</button>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>

	);
};
