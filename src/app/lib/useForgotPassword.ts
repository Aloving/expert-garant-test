import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { firebase } from "../api/firebase";

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [succeed, setSucceed] = useState(false);
  const [error, setError] = useState("");

  const forgotPassword = (email: string) => {
    setIsLoading(() => true);
    sendPasswordResetEmail(getAuth(firebase), email)
      .then(() => {
        setSucceed(() => true);
      })
      .catch((error) => {
        const errorCode = error.code;

        setError(errorCode);
      })
      .finally(() => {
        setIsLoading(() => false);
      });
  };

  return {
    succeed,
    isLoading,
    error,
    forgotPassword,
  };
};
