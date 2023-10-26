import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context); //re-renders the component
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useNavigate();

	// const token = sessionStorage.getItem("token");

	// console.log("This is your token", store.token);
	const handleClick = () => {
		actions.login(email, password);
	};

	if (store.token && store.token != "" && store.token != undefined) history("/");

	return (
		<div className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://www.onelogin.com/blog/wp-content/uploads/2023/05/advanced-authentication-blog-image.jpg.optimal.jpg')", height: 642, color: "white" }}>

			{store.token && store.token != "" && store.token != undefined ? (
				"You are logged in" + store.token
			) : (
				<div className="container col-3 bg-dark"
					style={{
						"height": "330px",
						"width": "350px",
						"padding": "20px",
						"borderRadius": "13px"
					}}>
					<h3 className="mb-4">Login</h3>
					<div className="mb-3 mt-3">
						<label htmlFor="exampleInputEmail1" className="form-label text-start ps-1" style={{ color: "white", width: 280}}>Username</label>
						<input className="p-2" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="mb-4">
						<label htmlFor="exampleInputPassword1" className="form-label text-start ps-1" style={{ color: "white", width: 280}}>Password</label>
						<input className="p-2" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					</div>
					<button className="btn btn-warning col-5" onClick={handleClick}>Login</button>
				</div>
			)}
		</div>
	);
};
