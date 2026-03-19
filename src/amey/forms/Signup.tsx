import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    password: "",
  });

  const handleSignupForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // this is to understand what is happening with isValid function
    const isValid = (value: string) => {
      if (value === undefined) {
        return false;
      }
      if (value === null) {
        return false;
      }
      if (value === "") {
        return false;
      }
      if (value.trim() === "") {
        return false;
      }
      return true;
    };
    // const isValid = (value: string) => value && value.trim() !== "";

    if (
      isValid(formData.firstName) &&
      isValid(formData.middleName) &&
      isValid(formData.lastName) &&
      isValid(formData.password)
    ) {
      console.log("formdata ", formData);
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        password: "",
      });
    } else {
      console.log("Please fill all fields");
      // You could show error messages to user here
    }
    // if( !== ""){

    // }

    // if (
    //   formData.firstName !== "" &&
    //   formData.firstName !== null &&
    //   formData.firstName !== undefined &&
    //   formData.firstName.trim() &&
    //   formData.middleName !== "" &&
    //   formData.middleName !== null &&
    //   formData.middleName !== undefined &&
    //   formData.middleName.trim() &&
    //   formData.lastName !== "" &&
    //   formData.lastName !== null &&
    //   formData.lastName !== undefined &&
    //   formData.lastName.trim() &&
    //   formData.password !== "" &&
    //   formData.password !== null &&
    //   formData.password !== undefined &&
    //   formData.password.trim()
    // ) {
    //   console.log("formdata ", formData);
    //   setFormData({
    //     firstName: "",
    //     middleName: "",
    //     lastName: "",
    //     password: "",
    //   });
    // }
  };

  //   console.log(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => {
      console.log(prev);
      return { ...prev, [id]: value }; // { firstName: amey }
    });
  };

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSignupForm}>
        <label htmlFor="firstName">First Name</label>
        <input
          className=""
          id="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="middleName">Middle Name</label>
        <input
          className=""
          id="middleName"
          type="text"
          value={formData.middleName}
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="lastName">Last Name</label>
        <input
          className=""
          id="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="password">Password</label>
        <input
          className=""
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Signup;
