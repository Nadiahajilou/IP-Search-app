
import React, { useState } from "react";

function SendOtpForm({ mobile, setMobile, setStep }) {
  const [validNumber, setValidNumber] = useState(true);
  const [inputValue, setInputValue] = useState(mobile);

  
  const handleInputChange = (e) => {
    const value = e.target.value;

    const numberOnly = /^[0-9]*$/;
    if (numberOnly.test(value) || value === "") {
      setInputValue(value);
      setMobile(value);
      console.log(inputValue)
     
    }
    
  };

  const submitHandler = (event) => {
    event.preventDefault();

    //validation
    const mobileRegex = /^((0?9)|(\+?989))\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      console.log("invalid phone number");
      setValidNumber(false);
      setInputValue("");
    } else {
      setValidNumber(true);
      setStep(2);
    }
  };

  return (
    <div className="font-iransans mx-auto mt-32 w-[375px] h-[410px]  border-solid border-2  border-gray-300 rounded-[16px] bg-[#FFFFFF] py-42 px-8 ">
      <span>
        <img src="/LogoType.svg" alt="logo" className="mx-auto mt-9" />
      </span>
      <h3 className="font-bold text-lg text-center mt-4 ">
        به پنل مدیریت تسک پادرو خوش آمدید
      </h3>
      <p className="text-center mt-2 mb-6 text-gray-400 font-semibold">
        برای ورود، لطفا شماره موبایل خود را وارد کنید
      </p>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          id="input"
          placeholder="شماره موبایل "
          value={inputValue}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full text-white py-2 rounded hover:bg-blue-700 transition duration-300"
          style={{
            background: "linear-gradient(to right, #1043A6 100%, #0C317C 100%)",
          }}
        >
          ارسال کد تایید
        </button>
      </form>
      <p className="text-center mt-4">
        حساب کاربری ندارید؟
        <a href="#" className="text-blue-600 mr-1">
          ثبت‌ نام
        </a>
      </p>
      <div>
        {!validNumber && (
          <p className="text-center mt-4 font-bold text-lg">
            شماره معتبر وارد کنید
          </p>
        )}
      </div>
    </div>
  );
}

export default SendOtpForm;
