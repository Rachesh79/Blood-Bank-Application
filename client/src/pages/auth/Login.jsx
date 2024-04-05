import React from "react";
import Form from "../../components/shared/form/Form";

function Login() {
  return (
    <div className="row g-0">
      <div className="col-md-8 form-banner">
        <img src="./images/login image.jpg" alt="" />
      </div>
      <div className="col-md-4 form-container">
        <Form formTitle={"Login"} submitBtn={"Login"} formType={"login"} />
      </div>
    </div>
  );
}

export default Login;
