import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    !store.token && navigate("/login");
  });

  return (
    <>
      <div className="text-center body bg-black">
        <div className="h-100 row justify-content-center">
          {store.token ?
            <div className="card" aria-hidden="true">  
              <img src="https://via.placeholder.com/400x250?text=Loading..." className="card-img-top" style={{marginTop: "10px"}} alt="..."/>
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p className="card-text placeholder-glow ">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </p>
                  <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                </div>
            </div>
            :
            <div className="col-8 text-center">

            </div>
          }
        </div>
      </div>
    </>
  );
};