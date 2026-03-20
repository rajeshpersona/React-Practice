import { useEffect, useState } from "react";

interface BillingFormProps {
  firstName: string;
  middleName: string;
  lastName: string;
  mobile: string;
  email: string;
}

interface PaymentFormProps {
  cardHolderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const Checkout2 = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [billingFormData, setBillingFormData] = useState<BillingFormProps>({
    firstName: "",
    middleName: "",
    lastName: "",
    mobile: "",
    email: "",
  });
  const [paymentFormData, setPaymentFormData] = useState<PaymentFormProps>({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isError, setIsError] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobile: "",
    email: "",
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [steps, setSteps] = useState({
    step1: false,
    step2: true,
    step3: true,
  });

  const billingFormKey = "billingformdata";
  const paymentFormKey = "paymentformdata";

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // for adding data to localstorage
  // const loadOnLocalStorage = (
  //   key: string,
  //   obj: BillingFormProps | PaymentFormProps,
  // ) => {
  //   if (key === billingFormKey) {
  //     let stringyObject = JSON.stringify(obj);
  //     localStorage.setItem(billingFormKey, stringyObject);
  //   }
  //   if (key === paymentFormKey) {
  //     let stringyObject = JSON.stringify(obj);
  //     localStorage.setItem(paymentFormKey, stringyObject);
  //   }
  // };
  const loadOnLocalStorage = (
    key: string,
    obj: BillingFormProps | PaymentFormProps,
  ) => {
    const stringyObject = JSON.stringify(obj);
    localStorage.setItem(key, stringyObject);
  };

  // for adding data to localstorage
  // for loading data from localstorage
  const loadFromLocalStorage = (key?: string) => {
    if (key === billingFormKey) {
      let obj = localStorage.getItem(billingFormKey);
      if (obj) {
        let parseObject = JSON.parse(obj);
        setBillingFormData(parseObject);
      }
    } else if (key === paymentFormKey) {
      let obj = localStorage.getItem(paymentFormKey);
      if (obj) {
        let parseObject = JSON.parse(obj);
        setPaymentFormData(parseObject);
      }
    } else {
      // Load both on initial mount
      const billingObj = localStorage.getItem(billingFormKey);
      if (billingObj) {
        let parseBillingObject = JSON.parse(billingObj);
        setBillingFormData(parseBillingObject);
      }

      const paymentObj = localStorage.getItem(paymentFormKey);
      if (paymentObj) {
        let parsePaymentObject = JSON.parse(paymentObj);
        setPaymentFormData(parsePaymentObject);
      }
    }
  };

  // validation for all forms
  const validateForm = (fieldValue: string, labelName: string) => {
    const lettersOnly = /^[A-Za-z\s]+$/;
    const numbersOnly = /^\d{10}$/;
    const cardNumbersOnly = /^\d{16}$/;
    const cvvNumbersOnly = /^\d{3}$/;
    const emailOnly = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

    if (labelName === "Mobile") {
      if (!fieldValue || fieldValue.trim() === "") {
        return `${labelName} is required`;
      }
      if (!numbersOnly.test(fieldValue)) {
        // if fieldValue is false based on regex numbersOnly then we make it true to return below error
        return `${labelName} should contain numbers and exact 10 digits`;
      }
      return "";
    }

    if (labelName === "Email") {
      if (!fieldValue || fieldValue.trim() === "") {
        return `${labelName} is required`;
      }
      if (!emailOnly.test(fieldValue)) {
        return `${labelName} should contain valid email id`;
      }
      return "";
    }

    if (labelName === "Card Number") {
      if (!fieldValue || fieldValue.trim() === "") {
        return `${labelName} is required`;
      }
      if (!cardNumbersOnly.test(fieldValue)) {
        return `${labelName} should contain numbers and exact 16 digits`;
      }
      return "";
    }

    if (labelName === "Cvv") {
      if (!fieldValue || fieldValue.trim() === "") {
        return `${labelName} is required`;
      }
      if (!cvvNumbersOnly.test(fieldValue)) {
        return `${labelName} should contain numbers and exact 3 digits`;
      }
      return "";
    }

    if (labelName === "Expiry Date") {
      if (!fieldValue || fieldValue.trim() === "") {
        return `${labelName} is required`;
      }
      if (!expiryRegex.test(fieldValue)) {
        return "Invalid format. Use MM/YY (e.g., 12/25)";
      }
      return "";
    }

    if (!fieldValue || fieldValue.trim() === "") {
      return `${labelName} is required`;
    }
    if (!lettersOnly.test(fieldValue)) {
      return `${labelName} should contain letters only with spaces`;
    }
    if (fieldValue.length < 2) {
      return `${labelName} should be atleast 2 characters`;
    }
    if (fieldValue.length > 15) {
      return `${labelName} should be maximum 15 characters`;
    }
    return "";
  };

  // handle tab menus
  const handleTabs = (tab: string) => {
    setActiveTab(tab);
  };

  // billing form input change
  const handleBillingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(e.target.value);
    setBillingFormData((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(e.target.value);
    setPaymentFormData((prev) => {
      return { ...prev, [id]: value };
    });
  };

  // billing form on submit
  const handleBillingFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    let firstName = validateForm(billingFormData.firstName, "First Name");
    let middleName = validateForm(billingFormData.middleName, "Middle Name");
    let lastName = validateForm(billingFormData.lastName, "Last Name");
    let mobile = validateForm(billingFormData.mobile, "Mobile");
    let email = validateForm(billingFormData.email, "Email");

    const errors = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      mobile: mobile,
      email: email,
    };

    setIsError((prev) => ({ ...prev, ...errors }));

    const validBillingForm = Object.values(errors).every((item) => item === ""); // return true if values are blank

    if (validBillingForm) {
      // setBillingFormData({
      //   firstName: "",
      //   middleName: "",
      //   lastName: "",
      //   mobile: "",
      //   email: "",
      // });
      console.log(billingFormData);
      loadOnLocalStorage(billingFormKey, billingFormData);
      setSteps((prev) => {
        return { ...prev, step2: false };
      });
      setActiveTab("tab2");
    }
  };

  // payment form on submit
  const handlePaymentFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    let cardHolderName = validateForm(
      paymentFormData.cardHolderName,
      "Card Holder Name",
    );
    let cardNumber = validateForm(paymentFormData.cardNumber, "Card Number");
    let expiryDate = validateForm(paymentFormData.expiryDate, "Expiry Date");
    let cvv = validateForm(paymentFormData.cvv, "Cvv");

    const errors = {
      cardHolderName: cardHolderName,
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      cvv: cvv,
    };

    setIsError((prev) => ({ ...prev, ...errors }));

    const validPaymentForm = Object.values(errors).every((item) => item === ""); // return true if values are blank

    if (validPaymentForm) {
      // setPaymentFormData({
      //   cardHolderName: "",
      //   cardNumber: "",
      //   expiryDate: "",
      //   cvv: "",
      // });
      console.log(paymentFormData);
      loadOnLocalStorage(paymentFormKey, paymentFormData);
      setSteps((prev) => {
        return { ...prev, step3: false };
      });
      setActiveTab("tab3");
    }
  };

  return (
    <>
      <h2>Checkout2</h2>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button
                    id="tab1"
                    className={`nav-link d-block `}
                    disabled={steps.step1}
                    onClick={() => handleTabs("tab1")}
                  >
                    Billing
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    id="tab2"
                    className={`nav-link d-block `}
                    disabled={steps.step2}
                    onClick={() => handleTabs("tab2")}
                  >
                    Payment
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    id="tab3"
                    className={`nav-link d-block `}
                    disabled={steps.step3}
                    onClick={() => handleTabs("tab3")}
                  >
                    Shipping
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`tabpane dvBillingForm ${activeTab === "tab1" ? "d-block" : "d-none"}`}
          >
            <div className="container">
              <div className="row">
                <form
                  onSubmit={handleBillingFormSubmit}
                  id="billingForm"
                  className="bg-dark p-4"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>Billing form</h5>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => loadFromLocalStorage(billingFormKey)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="col-12">
                    <input
                      className="form-control p-1 px-2"
                      type="text"
                      placeholder="First Name"
                      id="firstName"
                      onChange={handleBillingInputChange}
                      value={billingFormData.firstName}
                    />
                    <p className="error">{isError?.firstName}</p>
                  </div>
                  <div className="col-12">
                    <input
                      className="form-control p-1 px-2"
                      type="text"
                      placeholder="Middle Name"
                      id="middleName"
                      onChange={handleBillingInputChange}
                      value={billingFormData.middleName}
                    />
                    <p className="error">{isError?.middleName}</p>
                  </div>
                  <div className="col-12">
                    <input
                      className="form-control p-1 px-2"
                      type="text"
                      placeholder="Last Name"
                      id="lastName"
                      onChange={handleBillingInputChange}
                      value={billingFormData.lastName}
                    />
                    <p className="error">{isError?.lastName}</p>
                  </div>
                  <div className="col-12">
                    <input
                      className="form-control p-1 px-2"
                      type="text"
                      placeholder="Mobile"
                      id="mobile"
                      onChange={handleBillingInputChange}
                      value={billingFormData.mobile}
                    />
                    <p className="error">{isError?.mobile}</p>
                  </div>
                  <div className="col-12">
                    <input
                      className="form-control p-1 px-2"
                      type="text"
                      placeholder="Email"
                      id="email"
                      onChange={handleBillingInputChange}
                      value={billingFormData.email}
                    />
                    <p className="error">{isError?.email}</p>
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

          <div
            className={`tabpane dvPaymentForm ${activeTab === "tab2" ? "d-block" : "d-none"}`}
          >
            <div className="bg-dark p-3 rounded">
              <div className="d-flex justify-content-between align-items-center">
                <h5>Payment form</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => loadFromLocalStorage(paymentFormKey)}
                >
                  edit
                </button>
              </div>
              <div className="row"></div>
              <form
                onSubmit={handlePaymentFormSubmit}
                id="paymentForm"
                className=""
              >
                <div className="col-12 mb-3">
                  <input
                    className="form-control p-1 px-2"
                    type="text"
                    placeholder="Card Holder Name"
                    id="cardHolderName"
                    onChange={handlePaymentInputChange}
                    value={paymentFormData.cardHolderName}
                  />
                  <p className="error">{isError?.cardHolderName}</p>
                </div>
                <div className="col-12 mb-3">
                  <input
                    className="form-control p-1 px-2"
                    type="text"
                    placeholder="Card Number"
                    id="cardNumber"
                    onChange={handlePaymentInputChange}
                    value={paymentFormData.cardNumber}
                  />
                  <p className="error">{isError?.cardNumber}</p>
                </div>
                <div className="col-12 mb-3">
                  <input
                    className="form-control p-1 px-2"
                    type="text"
                    placeholder="Expiry Date (MM/YY)"
                    id="expiryDate"
                    onChange={handlePaymentInputChange}
                    value={paymentFormData.expiryDate}
                  />
                  <p className="error">{isError?.expiryDate}</p>
                </div>
                <div className="col-12 mb-3">
                  <input
                    className="form-control p-1 px-2"
                    type="text"
                    placeholder="CVV"
                    id="cvv"
                    onChange={handlePaymentInputChange}
                    value={paymentFormData.cvv}
                  />
                  <p className="error">{isError?.cvv}</p>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    submit payment form
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            className={`tabpane dvShippingForm ${activeTab === "tab3" ? "d-block" : "d-none"}`}
          >
            <div className="bg-dark p-3 rounded">
              <div className="d-flex justify-content-between align-items-center">
                <h5>Shipping form</h5>
                <button className="btn btn-primary">edit</button>
              </div>
              <div className="row">
                <form id="shippingForm">
                  <div className="col-12 mb-3">
                    <input
                      className="form-control p-1 px-2"
                      type="text"
                      placeholder="Address Line 1"
                      id="address1"
                    />
                    <p className="error">error</p>
                  </div>
                  <div className="col-12 mb-3">
                    <input
                      className="form-control p-1 px-2"
                      type="text"
                      placeholder="Address Line 2"
                      id="address2"
                    />
                    <p className="error">error</p>
                  </div>
                  <div className="col-12 mb-3">
                    <input
                      className="form-control p-1 px-2"
                      type="text"
                      placeholder="City"
                      id="shippingCity"
                    />
                    <p className="error">error</p>
                  </div>
                  <div className="col-12 mb-3">
                    <input
                      className="form-control p-1 px-2"
                      type="text"
                      placeholder="State"
                      id="shippingState"
                    />
                    <p className="error">error</p>
                  </div>
                  <div className="col-12 mb-3">
                    <input
                      className="form-control p-1 px-2"
                      type="text"
                      placeholder="Country"
                      id="country"
                    />
                    <p className="error">error</p>
                  </div>
                  <div className="col-12 mb-3">
                    <input
                      className="form-control p-1 px-2"
                      type="text"
                      placeholder="ZIP Code"
                      id="zipCode"
                    />
                    <p className="error">error</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout2;
