import React from "react";
import { useState } from "react";

import CheckOtpForm from "../components/CheckOtpForm";
import SendOtpForm from "../components/SendOtpForm";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  return (
    <div>
      {step === 1 && (
        <SendOtpForm mobile={mobile} setMobile={setMobile} setStep={setStep} />
      )}
      {step === 2 && (
        <CheckOtpForm
          setCode={setCode}
          code={code}
          setStep={setStep}
          mobile={mobile}
          setMobile={setMobile}
        />
      )}
    </div>
  );
}

export default AuthPage;
