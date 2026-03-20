import React, { useEffect, useState } from "react";

const Checkout = () => {
  const [isTabOpen, setIsTabOpen] = useState("tab1");
  const [billingFormData, setBillingFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    city: "",
    state: "",
    mobile: "",
    country: "",
  });
  const [isError, setIsError] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    city: "",
    state: "",
    mobile: "",
    country: "",
  });
  const [steps, setSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
  });

  useEffect(() => {
    loadSavedData();
  }, []);

  // if you want to bring data from localstorage back onclick of edit button
  const loadSavedData = () => {
    const savedData = localStorage.getItem("billingformdata");
    if (savedData) {
      setBillingFormData(JSON.parse(savedData));
    } else {
      console.log("No saved data found");
    }
  };

  const handleTabMenus = (tab: string) => {
    setIsTabOpen(tab);
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBillingFormData((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const handleBillingForm = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errors = {
      firstName: validateForm(billingFormData.firstName, "First Name"),
      middleName: validateForm(billingFormData.middleName, "Middle Name"),
      lastName: validateForm(billingFormData.lastName, "Last Name"),
      city: validateForm(billingFormData.city, "City"),
      state: validateForm(billingFormData.state, "State"),
      mobile: validateForm(billingFormData.mobile, "Mobile"),
      country: validateForm(billingFormData.country, "Country"),
    };
    setIsError(errors);

    let validBillingForm = Object.values(errors).every((item) => item === "");
    console.log(validBillingForm);

    if (validBillingForm) {
      console.log(billingFormData);

      localStorage.setItem("billingformdata", JSON.stringify(billingFormData));

      // disable if want to restore data
      setBillingFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        city: "",
        state: "",
        mobile: "",
        country: "",
      });

      setSteps((prev) => ({ ...prev, step1: true }));
      setIsTabOpen("tab2");
    }
  };

  const validateForm = (fieldName: string, labelName: string) => {
    const lettersOnly = /^[A-Za-z\s]+$/;
    const numbersOnly = /^\d{10}$/;
    if (labelName === "Mobile") {
      if (!fieldName || fieldName.trim() === "") {
        return "Mobile is required";
      }
      if (!numbersOnly.test(fieldName)) {
        return "Mobile must be exactly 10 digits";
      }
      return "";
    }

    if (!fieldName || fieldName.trim() === "") {
      return `${labelName} is required`;
    }
    if (fieldName.length < 2) {
      return `${labelName} should be atleast 2 characters`;
    }
    if (fieldName.length > 15) {
      return `${labelName} should be maximum 15 characters`;
    }
    if (!lettersOnly.test(fieldName)) {
      return `${labelName} should contain only letters`;
    }

    return "";
  };

  return (
    <>
      <h2>Checkout</h2>

      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Tabs navigation */}
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  id="tab1"
                  className="nav-link d-block active"
                  onClick={() => handleTabMenus("tab1")}
                >
                  Billing
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="tab1"
                  className={`nav-link d-block ${!steps.step1 && "disabled"}`}
                  onClick={() => handleTabMenus("tab2")}
                  disabled={!steps.step1}
                >
                  Payment
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="tab1"
                  className={`nav-link d-block ${!steps.step2 && "disabled"}`}
                  onClick={() => handleTabMenus("tab3")}
                  disabled={!steps.step2}
                >
                  Shipping
                </button>
              </li>
            </ul>

            {/* Billing Tab */}
            <div
              id="tabpane1"
              className={`tab-pane active ${isTabOpen === "tab1" ? "d-block" : "d-none"}`}
            >
              <div className="bg-dark p-3 rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>billing form</h5>
                  <button className="btn btn-primary" onClick={loadSavedData}>
                    edit
                  </button>
                </div>
                <div className="row">
                  <form id="billingForm" onSubmit={handleBillingForm}>
                    <div className="col-12">
                      <input
                        onChange={handleBillingChange}
                        value={billingFormData.firstName}
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="First Name"
                        id="firstName"
                      />
                      <p className="error">{isError?.firstName}</p>
                    </div>
                    <div className="col-12">
                      <input
                        onChange={handleBillingChange}
                        value={billingFormData.middleName}
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="Middle Name"
                        id="middleName"
                      />
                      <p className="error">{isError?.middleName}</p>
                    </div>
                    <div className="col-12">
                      <input
                        onChange={handleBillingChange}
                        value={billingFormData.lastName}
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="Last Name"
                        id="lastName"
                      />
                      <p className="error">{isError?.lastName}</p>
                    </div>
                    <div className="col-12">
                      <input
                        onChange={handleBillingChange}
                        value={billingFormData.city}
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="City"
                        id="city"
                      />
                      <p className="error">{isError?.city}</p>
                    </div>
                    <div className="col-12">
                      <input
                        onChange={handleBillingChange}
                        value={billingFormData.state}
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="State"
                        id="state"
                      />
                      <p className="error">{isError?.state}</p>
                    </div>
                    <div className="col-12">
                      <input
                        onChange={handleBillingChange}
                        value={billingFormData.mobile}
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="Mobile"
                        id="mobile"
                      />
                      <p className="error">{isError?.mobile}</p>
                    </div>
                    <div className="col-12">
                      <input
                        onChange={handleBillingChange}
                        value={billingFormData.country}
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="Country"
                        id="country"
                      />
                      <p className="error">{isError?.country}</p>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">
                        submit billing form
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Payment Tab */}
            <div
              id="tabpane2"
              className={`tab-pane active ${isTabOpen === "tab2" ? "d-block" : "d-none"}`}
            >
              <div className="bg-dark p-3 rounded mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>payment form</h5>
                  <button className="btn btn-primary">edit</button>
                </div>
                <div className="row">
                  <form id="paymentForm">
                    <div className="col-12">
                      <input
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="Card Holder Name"
                        id="cardHolderName"
                      />
                      {/* <p className="error">{isErrors}</p> */}
                    </div>
                    <div className="col-12">
                      <input
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="Card Number"
                        id="cardNumber"
                      />
                      {/* <p className="error">{isErrors}</p> */}
                    </div>
                    <div className="col-12">
                      <input
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="Expiry Date (MM/YY)"
                        id="expiryDate"
                      />
                      {/* <p className="error">{isErrors}</p> */}
                    </div>
                    <div className="col-12">
                      <input
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="CVV"
                        id="cvv"
                      />
                      {/* <p className="error">{isErrors}</p> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Shipping Tab */}
            <div
              id="tabpane3"
              className={`tab-pane active ${isTabOpen === "tab3" ? "d-block" : "d-none"}`}
            >
              <div className="bg-dark p-3 rounded mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>shipping form</h5>
                  <button className="btn btn-primary">edit</button>
                </div>
                <div className="row">
                  <form id="shippingForm">
                    <div className="col-12">
                      <input
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="Address Line 1"
                        id="address1"
                      />
                      {/* <p className="error">{isErrors}</p> */}
                    </div>
                    <div className="col-12">
                      <input
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="Address Line 2"
                        id="address2"
                      />
                      {/* <p className="error">{isErrors}</p> */}
                    </div>
                    <div className="col-12">
                      <input
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="City"
                        id="shippingCity"
                      />
                      {/* <p className="error">{isErrors}</p> */}
                    </div>
                    <div className="col-12">
                      <input
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="ZIP Code"
                        id="zipCode"
                      />
                      {/* <p className="error">{isErrors}</p> */}
                    </div>
                    <div className="col-12">
                      <input
                        className="form-control p-1 px-2"
                        type="text"
                        placeholder="Country"
                        id="country"
                      />
                      {/* <p className="error">{isErrors}</p> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
