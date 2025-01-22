import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useSignIn } from "./useSignIn";

import { IRegistrationForm } from "../interfaces/IUser";

export const useCreateUser = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useSignIn();

  const createUser = ({
    email,
    password,
    repeatedPassword,
  }: IRegistrationForm) => {
    if (password !== repeatedPassword) {
      setError(() => "Пароли не совпадают");
      return;
    }

    setIsloading(() => true);
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user) {
          signIn({ email, password }).then(() => {
            setIsloading(() => false);
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;

        setError(errorCode);
      })
      .finally(() => {
        setIsloading(() => false);
      });
  };

  return {
    isLoading,
    error,
    createUser,
  };
};
