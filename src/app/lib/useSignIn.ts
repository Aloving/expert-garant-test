import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from "next/navigation";

import * as storage from "./storage";
import { firebase } from "../api/firebase";

import { ILoginForm } from "../interfaces/IUser";

export const useSignIn = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  const signIn = async ({ email, password }: ILoginForm) =>
    signInWithEmailAndPassword(getAuth(firebase), email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        user.getIdToken().then((token) => {
          storage.saveToken(token);
          redirect("/table");
        });
      })
      .catch((error) => {
        const errorCode = error.code;

        setError(errorCode);
      })
      .finally(() => {
        setIsloading(() => false);
      });

  return {
    isLoading,
    error,
    signIn,
  };
};
