import { useState } from "react";

const Signup2 = () => {
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

  const handleSignupForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let success = validateForm(formData);
    console.log("success", success);
  };

  const validateForm = (formData: any) => {
    // Start with empty errors
    let newErrors = {
      firstName: "",
      middleName: "",
      lastName: "",
      password: "",
    };

    // Check EACH field independently (no else-if)
    if (!formData.firstName || formData.firstName.trim() === "") {
      newErrors.firstName = "First name is required";
    }

    if (!formData.middleName || formData.middleName.trim() === "") {
      newErrors.middleName = "Middle name is required";
    }

    if (!formData.lastName || formData.lastName.trim() === "") {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.password || formData.password.trim() === "") {
      newErrors.password = "Password is required";
    }

    // Set all errors at once
    setIsError(newErrors);

    // Check if any errors exist
    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    console.log(hasErrors);
    if (!hasErrors) {
      console.log("Form valid:", formData);
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        password: "",
      });
      return formData;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [id]: value };
    });
  };

  return (
    <div>
      <h2>Signup2</h2>

      <form onSubmit={handleSignupForm}>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          placeholder="firstName"
          onChange={handleChange}
        />
        <p>{isError.firstName && isError.firstName}</p>
        <br />
        <input
          type="text"
          id="middleName"
          value={formData.middleName}
          placeholder="middleName"
          onChange={handleChange}
        />
        <p>{isError.middleName && isError.middleName}</p>
        <br />
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          placeholder="lastName"
          onChange={handleChange}
        />
        <p>{isError.lastName && isError.lastName}</p>
        <br />
        <input
          type="password"
          id="password"
          value={formData.password}
          placeholder="password"
          onChange={handleChange}
        />
        <p>{isError.password && isError.password}</p>
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Signup2;
