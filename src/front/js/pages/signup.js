import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Signup = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context); //re-renders the component
	const [newUser, setNewUser] = useState({
		"email": "",
		"password": "",
		"password_check": "",
	});

	async function addNewUser(e) {
		e.preventDefault();
		if (newUser.password == newUser.password_check) {
			let created = await actions.register(newUser);
			if (created) navigate("/");
			else alert("An error has occured");
		} else {
			alert("Passwords do not match");
		}
	}

	return (
		<div className='p-5 text-center bg-image'
			style={{ backgroundImage: "url('https://www.onelogin.com/blog/wp-content/uploads/2023/05/advanced-authentication-blog-image.jpg.optimal.jpg')", height: 642, color: "white" }}>

			{store.token && store.token != "" && store.token != undefined ? (
				"You are logged in"
			) : (
				<form className="container col-3 bg-dark"
					style={{
						"height": "430px",
						"width": "350px",
						"padding": "20px",
						"borderRadius": "13px",
						"paddingBottom": "50px",
					}}>
					<h3 className="mb-4">Sign Up</h3>
					<div className="mb-3 mt-3">
						<label htmlFor="exampleInputEmail1" className="form-label text-start ps-1" style={{ color: "white", width: 280 }}>Email address</label>
						<input className="p-2" type="text" placeholder="email" onChange={(e) => {
							setNewUser({ ...newUser, "email": e.target.value });
						}} />
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label text-start ps-1" style={{ color: "white", width: 280 }}>Password</label>
						<input className="p-2" type="password" placeholder="password" onChange={(e) => {
							setNewUser({ ...newUser, "password": e.target.value });
						}} />
					</div>
					<div className="mb-4">
						<label htmlFor="exampleInputPassword1" className="form-label text-start ps-1" style={{ color: "white", width: 280 }}>Confirm Password</label>
						<input className="p-2" type="password" placeholder="Repeat password" onChange={(e) => {
							setNewUser({ ...newUser, "password_check": e.target.value });
						}} />
					</div>
					<button className="btn btn-warning col-5" onClick={(e) => addNewUser(e)}>Signup</button>
				</form>
			)}
		</div>
	);
};
