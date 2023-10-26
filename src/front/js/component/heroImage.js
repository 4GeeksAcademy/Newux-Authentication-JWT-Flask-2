import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export default function HeroImage() {
  const { store, actions } = useContext(Context);
	let token = false;

	useEffect(() => {
		if (store.token && store.token != "" && store.token != undefined) actions.getMessage();
		if (store.token == null) token = false;
		if (store.token !== null) token = true;
	},
		[store.token]
	);


  return (
    <header style={{ paddingLeft: 0 }}>
      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://www.onelogin.com/blog/wp-content/uploads/2023/05/advanced-authentication-blog-image.jpg.optimal.jpg')", height: 642 }}
      >
        <div className='mask pt-5 pb-5' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>JWT Flask Authentication Project</h1>
              <h4 className='mb-3'>Created with Flask and React</h4>
              <img src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/263903404/original/34ca87c30a7e23f1bd1ed175617d9ac7cdb1ea0d/create-react-web-application-with-python-flask-backend.png" style={{ height: 150 }} />
              <div className='mt-5'>
              {!store.token ?
                <Link to="/signup">
                  <button className="btn btn-warning col-4">Register</button>
                </Link>
                :
                <Link to="/signup">
                  <button className="btn btn-warning col-4" style={{display: "none"}}>Register</button>
                </Link>

              }  
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}