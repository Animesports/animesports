import { Form } from "@unform/web";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { Input } from "../components/Input";
import { Loading } from "../components/Loading";
import { authContext } from "../contexts/AuthContext";
import {
  requestCodeConfirmation,
  requestCodeValidation,
} from "../services/email";
import styles from "../styles/pages/UserAuth.module.css";
import { useNextOnEnter } from "../utils/Inputs";

import { codeValidation, registerValidation } from "../utils/Yup";

export default function Register() {
  const [currentStep, setCurrentStep] = useState("initial");
  const { signUp, isFetched, isAuthenticated } = useContext(authContext);
  const formRef = useRef(null);

  if (!isFetched)
    return (
      <div className="container-fwh">
        <div className={styles.content}>
          <h1>Registrar</h1>
          <p>
            Cadastre-se em nossa plataforma ou faça{" "}
            <Link href="/login">login</Link>
          </p>

          <Loading />
        </div>
      </div>
    );

  if (isAuthenticated) return Router.push("/soccer") && null;

  function handleNextStep({ name, email, password }, { reset }) {
    registerValidation(
      { name, email, password },
      () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useNextOnEnter(
          ["name", "email", "password"].map((name) =>
            formRef.current.getFieldRef(name)
          ),
          () => {
            signUp({ name, email, password }).then(
              () => {
                requestCodeValidation({ email }).then((success) => {
                  if (!success) throw "fetch-error";
                  setCurrentStep("email-validation");
                  reset();
                });
              },
              (error) => {
                if (error?.message === "invalid email address") {
                  return formRef.current.setErrors({
                    email: "Já existe uma conta com este email",
                  });
                }

                formRef.current.setErrors({
                  password: "Não foi possível criar uma conta",
                });
              }
            );
          }
        );
      },
      formRef
    );
  }

  function handleEmailValidation({ code }, { reset }) {
    codeValidation(
      { code },
      () => {
        requestCodeConfirmation({ code }).then(
          (success) => {
            if (!success) {
              formRef.current.setErrors({ code: "O código não corresponde" });
              throw "invalid-code";
            }
            Router.push("/soccer");
            reset();
          },
          () => {
            formRef.current.setErrors({
              code: "Ocorreu um erro",
            });
          }
        );
      },
      formRef
    );
  }

  return (
    <div className="container-fwh">
      <div className={styles.content}>
        <h1>Registrar</h1>
        <p>
          Cadastre-se em nossa plataforma ou faça{" "}
          <Link href="/login">login</Link>
        </p>

        {["initial"].includes(currentStep) && (
          <Form ref={formRef} onSubmit={handleNextStep}>
            <Input
              name="name"
              placeholder="Introduza seu nome"
              tag="nome"
            ></Input>
            <Input
              name="email"
              placeholder="Insira seu email"
              tag="email"
            ></Input>
            <Input
              name="password"
              autoComplete="off"
              type="password"
              placeholder="Crie uma senha"
              tag="senha"
            ></Input>
            <button type="submit">Próximo</button>
          </Form>
        )}

        {["email-validation"].includes(currentStep) && (
          <Form ref={formRef} onSubmit={handleEmailValidation}>
            <Input
              name="code"
              placeholder="Código de 6 dígitos enviado por email"
              tag="código"
            ></Input>
            <button type="submit">Confirmar</button>
          </Form>
        )}
      </div>
    </div>
  );
}
