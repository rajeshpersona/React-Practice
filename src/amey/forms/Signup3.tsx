import React, { useState } from "react";

const Signup3 = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    password: "",
  });
  const [isError, setIsError] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [id]: value }; // adding firstName : value
    });
  };

  const validateForm = (fieldName: string, fieldLabel: string) => {
    let letters = /^[\d\s]+$/;

    if (!fieldName || fieldName.trim() === "") {
      return `${fieldLabel} is required`;
    }
    if (fieldName.length < 2) {
      return `${fieldLabel} must have atleast 2 characters`;
    }
    if (fieldName.length > 10) {
      return `${fieldLabel} must have maximum 10 characters`;
    }
    if (fieldLabel !== "Password" && letters.test(fieldName)) {
      return `${fieldLabel} only letters`;
    }
    return "";
  };

  const handleSignupForm = (e: React.SubmitEvent) => {
    e.preventDefault();
    // console.log("success form ", formData);

    const errors = {
      firstName: validateForm(formData?.firstName, "First Name"),
      middleName: validateForm(formData?.middleName, "Middle Name"),
      lastName: validateForm(formData?.lastName, "Last Name"),
      password: validateForm(formData?.password, "Password"),
    };

    // if (!formData.firstName || formData.firstName.trim() === "") {
    //   errors.firstName = "First Name is required";
    // }
    // if (!formData.middleName || formData.middleName.trim() === "") {
    //   errors.middleName = "Middle Name is required";
    // }
    // if (!formData.lastName || formData.lastName.trim() === "") {
    //   errors.lastName = "Last Name is required";
    // }
    // if (!formData.password || formData.password.trim() === "") {
    //   errors.password = "Password is required";
    // }

    setIsError(errors);

    // let passOn = Object.values(errors).some((error) => error);
    let validFields = Object.values(errors).filter((error) => error !== "");
    console.log(validFields);
    // if (!passOn) {
    if (validFields.length === 0) {
      console.log("success form ", formData);
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        password: "",
      });
    }
  };
  // console.log(isError);
  return (
    <div>
      <h2>signup3</h2>

      <div className="container">
        <div className="row">
          <form onSubmit={handleSignupForm}>
            <div className="col-3 offset-4">
              <input
                onChange={handleChange}
                type="text"
                className="form-control mb-3"
                id="firstName"
                value={formData.firstName}
                placeholder="first name"
              />
              <p className="text-danger">
                {isError.firstName && isError.firstName}
              </p>
            </div>
            <div className="col-3 offset-4">
              <input
                onChange={handleChange}
                type="text"
                className="form-control mb-3"
                id="middleName"
                value={formData.middleName}
                placeholder="middleName"
              />
              <p className="text-danger">
                {isError.middleName && isError.middleName}
              </p>
            </div>
            <div className="col-3 offset-4">
              <input
                onChange={handleChange}
                type="text"
                className="form-control mb-3"
                id="lastName"
                value={formData.lastName}
                placeholder="lastName"
              />
              <p className="text-danger">
                {isError.lastName && isError.lastName}
              </p>
            </div>
            <div className="col-3 offset-4">
              <input
                onChange={handleChange}
                type="text"
                className="form-control mb-3"
                id="password"
                value={formData.password}
                placeholder="password"
              />
              <p className="text-danger">
                {isError.password && isError.password}
              </p>
            </div>
            <div className="col-3 offset-4">
              <button type="submit" className="btn btn-primary w-100">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup3;
