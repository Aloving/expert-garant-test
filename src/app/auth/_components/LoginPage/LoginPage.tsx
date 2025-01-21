"use client";

import React, { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { Alert, Button, Divider, Tabs } from "antd";

import { signIn, createUser } from "../../../api/firebase";
import { EAuthForm } from "../../../enum/EAuthForm";

import { ILoginForm, IRegistrationForm } from "../../../interfaces/IUser";

export const requredFieldRule = {
  required: true,
  message: "Обязательное поле!",
};

interface ILoginPageProps {
  loginErrorMessage?: string;
  registrationErrorMessage?: string;
  isLoading?: boolean;
}

export const LoginPage: React.FC<ILoginPageProps> = ({
  loginErrorMessage,
  registrationErrorMessage,
  isLoading,
}) => {
  const [form, setForm] = useState<EAuthForm>(EAuthForm.AUTHORIZATION);
  const setRegistrationForm = () => setForm(EAuthForm.REGISTRATION);
  const isAuthForm = form === EAuthForm.AUTHORIZATION;
  const isRegistrationForm = form === EAuthForm.REGISTRATION;

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
          }}
          disabled={isLoading}
          title="Login"
          submitter={{
            render: () => {
              return (
                <div>
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
          {form === EAuthForm.AUTHORIZATION && (
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
          {form === EAuthForm.REGISTRATION && (
            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: "large",
                  prefix: <MailOutlined className={"prefixIcon"} />,
                }}
                placeholder="Введите email"
                rules={[requredFieldRule]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className={"prefixIcon"} />,
                }}
                placeholder="Пароль"
                rules={[requredFieldRule]}
              />
              <ProFormText.Password
                name="repeatedPassword"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className={"prefixIcon"} />,
                }}
                placeholder="Пароль"
                rules={[requredFieldRule]}
              />
              {registrationErrorMessage && (
                <Alert description={registrationErrorMessage} type="error" />
              )}
              <Divider />
            </>
          )}
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
