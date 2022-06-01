import { Form } from "@unform/web";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
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
import { replaceUrlParameter, useAnimate } from "../utils/Global";
import { useNextOnEnter } from "../utils/Inputs";

import { codeValidation, registerValidation } from "../utils/Yup";

export default function Register() {
  const [currentStep, setCurrentStep] = useState("initial");
  const [animation, setAnimation] = useAnimate("three-dots");
  const { signUp, isFetched, isAuthenticated, user } = useContext(authContext);
  const formRef = useRef(null);

  useEffect(() => {
    if (!window) return;
    const step = new URLSearchParams(window.location.search).get("s");
    if (step === "email-validation") setCurrentStep("email-validation");
  }, []);

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

  if (isAuthenticated) {
    if (user.data.email.verified) return Router.push("/soccer") && null;
    currentStep !== "email-validation" && setCurrentStep("email-validation");
  }

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
            setAnimation(true);
            setTimeout(() => {
              signUp({ name, email, password }).then(
                async () => {
                  await requestCodeValidation({ email }).then((success) => {
                    if (!success) throw "fetch-error";
                    setCurrentStep("email-validation");
                    replaceUrlParameter(
                      new URL(window.location.href),
                      "s",
                      "email-validation"
                    );
                    reset();
                  });

                  setAnimation(false);
                },
                (error) => {
                  setAnimation(false);
                  if (error?.statusText === "invalid email address") {
                    return formRef.current.setErrors({
                      email: "Já existe uma conta com este email",
                    });
                  }

                  formRef.current.setErrors({
                    password: "Não foi possível criar uma conta",
                  });
                }
              );
            }, 100);
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
        setAnimation(true);
        setTimeout(() => {
          requestCodeConfirmation({ code })
            .then(
              (success) => {
                if (!success) {
                  formRef.current.setErrors({
                    code: "O código não corresponde",
                  });
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
            )
            .finally(() => {
              setAnimation(false);
            });
        }, 100);
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

            {animation && <button type="button" className={animation}></button>}
            {!animation && <button type="submit">Próximo</button>}
          </Form>
        )}

        {["email-validation"].includes(currentStep) && (
          <Form ref={formRef} onSubmit={handleEmailValidation}>
            <Input
              name="code"
              placeholder="Código de 6 dígitos enviado por email"
              tag="código"
            ></Input>

            {animation && <button className={animation} type="button" />}
            {!animation && (
              <>
                <div className={styles.confirmationBox}>
                  <button className="opacity" type="submit">
                    Confirmar
                  </button>
                  <span
                    onClick={() => {
                      Router.push("/soccer");
                    }}
                  >
                    Confirmar depois
                  </span>
                </div>
              </>
            )}
          </Form>
        )}
      </div>
    </div>
  );
}
