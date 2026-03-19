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
    const success = validateForm(formData);
    console.log("success", success);
  };

  const validateName = (fieldName: string, fieldLabel: string) => {
    // Check if empty
    if (!fieldName || fieldName.trim() === "") {
      return `${fieldLabel} is required`;
    }

    // Check length
    if (fieldName.length < 2) {
      return `${fieldLabel} must be at least 2 characters`;
    }
    if (fieldName.length > 10) {
      return `${fieldLabel} must be less than 10 characters`;
    }

    // Check letters only
    const onlyLetters = /^[A-Za-z\s]+$/;
    if (!onlyLetters.test(fieldName)) {
      return `${fieldLabel} should contain only letters`;
    }

    // No error
    return "";
  };

  const validateForm = (formData: any) => {
    // Start with empty errors
    let newErrors = {
      firstName: validateName(formData.firstName, "First name"),
      middleName: validateName(formData.middleName, "Middle name"),
      lastName: validateName(formData.lastName, "Last name"),
      password:
        !formData.password || formData.password.trim() === ""
          ? "Password is required"
          : "",
    };

    // Set all errors at once
    setIsError(newErrors);

    // Check if any errors exist
    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    console.log("Has errors:", hasErrors);

    if (!hasErrors) {
      console.log("Form valid:", formData);
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        password: "",
      });
      return formData;
    } else {
      return null;
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
          placeholder="First Name"
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{isError.firstName}</p>

        <input
          type="text"
          id="middleName"
          value={formData.middleName}
          placeholder="Middle Name"
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{isError.middleName}</p>

        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          placeholder="Last Name"
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{isError.lastName}</p>

        <input
          type="password"
          id="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{isError.password}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup2;
