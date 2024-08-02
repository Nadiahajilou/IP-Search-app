import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function CheckOtpForm({ mobile, setStep, setCode, code }) {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [seconds, setSeconds] = useState(1);
  const [minutes, setMinutes] = useState(2);
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [alert, setAlert] = useState(false);
const navigate=useNavigate()
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          setIsButtonDisable(false);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [seconds, minutes]);
  const handleChange = (index, value) => {
   
    const numberOnly = /^[0-9]$/;

    if (value === "" || numberOnly.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      setOtpValues(newOtpValues);
      console.log(otpValues);
      setCode(newOtpValues.join(""));

     
      if (value !== "" && index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index < 3 && otpValues[index] === "") {
      inputRefs[index + 1].current.focus();
    }
  };
  const handleResendCode = () => {
 د
    setMinutes(2);
    setSeconds(0);
    setIsButtonDisable(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //validation
    if (otpValues.join("") !== "1111") {
      setAlert(true);
      setOtpValues(["", "", "", ""]);

      console.log(alert);
    } else {
      setAlert(false);
      console.log(alert);
      navigate("/IP-page")
  
    }
  };
  const handleStepBack = () => {
    setStep(1);
  };
  return (
    <div className="relative mx-auto mt-32 w-[375px] h-[430px] border-solid border-2 border-gray-300 rounded-[16px] bg-[#FFFFFF] py-42 px-8">
      <button className="absolute top-9 left-4" onClick={handleStepBack}>
        <img src="/Button.svg" alt="logo" />
      </button>
      <span>
        <img src="/LogoType.svg" alt="logo" className="mx-auto mt-9" />
      </span>
      <h3 className="font-medium text-lg text-center mt-4">
        کد تایید را وارد کنید
      </h3>
      <p className="text-center mt-2 text-gray-400 font-semibold">
        کد تایید برای شماره {mobile} پیامک شد
      </p>
      
        <p className="text-blue-600 mt-2 text-center cursor-pointer" onClick={handleStepBack}>تغییر شماره تلفن همراه</p>
     

      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-4 gap-1 justify-around mt-10">
          {otpValues.map((value, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              className="w-[64px] h-[48px]  border-2 border-gray-400 rounded text-center"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 mt-4">
          <p className="font-medium">کد را دریافت نکردید؟</p>
          <button
            onClick={handleResendCode}
            disabled={isButtonDisable}
            className={` font-medium underline ${
              isButtonDisable ? "text-gray-400" : "text-sky-700"
            }`}
          >
            {isButtonDisable
              ? `ارسال مجدد (${minutes}:${
                  seconds < 10 ? `0${seconds}` : seconds
                })`
              : "ارسال مجدد"}
          </button>
        </div>

        <button
          type="submit"
          className={`w-full text-white py-2 rounded hover:bg-blue-700 transition duration-300 mt-5 ${
            alert && "border-4 border-red-700"
          } `}
          style={{
            background: "linear-gradient(to right, #1043A6 100%, #0C317C 100%)",
          }}
        >
          تایید
        </button>
        {alert && (
          <p className="text-red-700 text-center my-4 font-medium">
            کد وارد شده صحیح نمیباشد
          </p>
        )}
      </form>
    </div>
  );
}

export default CheckOtpForm;
