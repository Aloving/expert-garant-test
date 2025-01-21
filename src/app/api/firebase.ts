"use client";

import { initializeApp } from "firebase/app";
import { redirect } from "next/navigation";
import {
  getAuth,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { saveToken, clearToken } from "../lib/storage";

import { IRegistrationForm, ILoginForm } from "../interfaces/IUser";

const firebaseConfig = {
  apiKey: "AIzaSyAFGMsZbKdqZVK7rIjo4GT_zo0m_TMjadY",
  authDomain: "expert-test-1b3bc.firebaseapp.com",
  projectId: "expert-test-1b3bc",
  storageBucket: "expert-test-1b3bc.firebasestorage.app",
  messagingSenderId: "816897771083",
  appId: "1:816897771083:web:9c66b19f208a2847c92fce",
};

export const firebase = initializeApp(firebaseConfig);
export const signOut = () => {
  firebaseSignOut(getAuth());
  clearToken();
  redirect("/auth");
};
export const signIn = async ({ email, password }: ILoginForm) =>
  signInWithEmailAndPassword(getAuth(), email, password).then(
    async (userCredential) => {
      const user = userCredential.user;

      user.getIdToken().then((token) => {
        saveToken(token);
        redirect("/table");
      });
    }
  );

export const createUser = ({ email, password }: IRegistrationForm) =>
  createUserWithEmailAndPassword(getAuth(), email, password).then(
    (userCredential) => {
      const user = userCredential.user;

      if (user) {
        signIn({ email, password });
      }
    }
  );
