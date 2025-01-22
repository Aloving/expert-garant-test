"use client";

import React, { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { Alert, Button, Divider, Tabs } from "antd";

import { useCreateUser } from "../../../lib/useCreateUser";
import { useSignIn } from "../../../lib/useSignIn";
import { useForgotPassword } from "../../../lib/useForgotPassword";
import { EAuthForm } from "../../../enum/EAuthForm";

import { ILoginForm, IRegistrationForm } from "../../../interfaces/IUser";

export const requredFieldRule = {
  required: true,
  message: "Обязательное поле!",
};

export const LoginPage: React.FC = () => {
  const { createUser, ...createUserAssets } = useCreateUser();
  const { signIn, ...signInAssets } = useSignIn();
  const { forgotPassword, ...forgotPasswordAssets } = useForgotPassword();
  const [form, setForm] = useState<EAuthForm>(EAuthForm.AUTHORIZATION);
  const setRegistrationForm = () => setForm(EAuthForm.REGISTRATION);
  const setForgotPasswordForm = () => setForm(EAuthForm.FORGOT_PASSWORD);

  const isAuthForm = form === EAuthForm.AUTHORIZATION;
  const isRegistrationForm = form === EAuthForm.REGISTRATION;
  const isForgotPasswordForm = form === EAuthForm.FORGOT_PASSWORD;

  const isLoading =
    createUserAssets.isLoading ||
    signInAssets.isLoading ||
    forgotPasswordAssets.isLoading;
  const registrationErrorMessage = createUserAssets.error;
  const loginErrorMessage = signInAssets.error;

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: "white" }}>
        <LoginForm
          onFinish={async (values: ILoginForm | IRegistrationForm) => {
            if (isRegistrationForm) {
              createUser(values as IRegistrationForm);
            }

            if (isAuthForm) {
              signIn(values as ILoginForm);
            }

            if (isForgotPasswordForm) {
              forgotPassword(values.email);
            }
          }}
          disabled={isLoading}
          title="Login"
          submitter={{
            render: () => {
              return (
                <div>
                  {isForgotPasswordForm && (
                    <Button
                      key="forgot-password"
                      block
                      type="primary"
                      style={{
                        margin: "0 auto",
                      }}
                      htmlType="submit"
                    >
                      Сбросить пароль
                    </Button>
                  )}
                  {isAuthForm && (
                    <Button
                      key="next"
                      block
                      type="primary"
                      style={{
                        margin: "0 auto",
                      }}
                      htmlType="submit"
                    >
                      Войти
                    </Button>
                  )}
                  {isRegistrationForm && (
                    <Button
                      key="next"
                      block
                      type="primary"
                      style={{
                        margin: "0 auto",
                      }}
                      htmlType="submit"
                    >
                      Регистрация
                    </Button>
                  )}
                </div>
              );
            },
          }}
        >
          <Tabs
            style={{
              padding: "22px 0",
            }}
            centered
            activeKey={form}
            onChange={(activeKey) => setForm(activeKey as EAuthForm)}
          >
            <Tabs.TabPane key={EAuthForm.AUTHORIZATION} tab="Авторизация" />
            <Tabs.TabPane key={EAuthForm.REGISTRATION} tab="Регистрация" />
          </Tabs>
          {isAuthForm && (
            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: "large",
                  prefix: <MailOutlined className="prefixIcon" />,
                }}
                placeholder="Введите email"
                rules={[requredFieldRule]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className="prefixIcon" />,
                }}
                placeholder="Пароль"
                rules={[requredFieldRule]}
              />
              {loginErrorMessage && (
                <Alert description={loginErrorMessage} type="error" />
              )}
              <Divider
                style={{
                  margin: "12px 0",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Button type="link" onClick={setForgotPasswordForm}>
                  Забыли пароль?
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                У вас нет аккаунта?
                <Button type="link" onClick={setRegistrationForm}>
                  Зарегистрироваться
                </Button>
              </div>
            </>
          )}
          {isRegistrationForm && (
            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: "large",
                  prefix: <MailOutlined className="prefixIcon" />,
                }}
                placeholder="Введите email"
                rules={[requredFieldRule]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className="prefixIcon" />,
                }}
                placeholder="Пароль"
                rules={[requredFieldRule]}
              />
              <ProFormText.Password
                name="repeatedPassword"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className="prefixIcon" />,
                }}
                placeholder="Повторите пароль"
                rules={[requredFieldRule]}
              />
              {registrationErrorMessage && (
                <Alert description={registrationErrorMessage} type="error" />
              )}
              <Divider />
            </>
          )}
          {isForgotPasswordForm && (
            <div>
              <ProFormText
                name="email"
                fieldProps={{
                  size: "large",
                  prefix: <MailOutlined className="prefixIcon" />,
                }}
                placeholder="Введите email"
                rules={[requredFieldRule]}
              />
              <div
                style={{
                  marginBottom: "12px",
                }}
              >
                <Divider />
                {forgotPasswordAssets.succeed && (
                  <Alert description="Отправка успешна" type="success" />
                )}
              </div>
            </div>
          )}
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
