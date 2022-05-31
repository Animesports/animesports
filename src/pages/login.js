import { Form } from "@unform/web";
import Link from "next/link";
import Router from "next/router";
import { useRef } from "react";
import { useContext } from "react";
import { Input } from "../components/Input";
import { Loading } from "../components/Loading";
import { authContext } from "../contexts/AuthContext";
import styles from "../styles/pages/UserAuth.module.css";
import { useAnimate } from "../utils/Global";
import { useNextOnEnter } from "../utils/Inputs";

import { loginValidation } from "../utils/Yup";

export default function Login() {
  const formRef = useRef(null);
  const { signIn, isAuthenticated, isFetched } = useContext(authContext);
  const [animate, setAnimate] = useAnimate("three-dots accessing");

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

  async function handleSubmit({ email, password }, { reset }) {
    setAnimate(true);
    loginValidation(
      { email, password },
      () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useNextOnEnter(
          ["email", "password"].map((name) =>
            formRef.current.getFieldRef(name)
          ),
          async () => {
            signIn({ email, password })
              .then(
                () => {
                  Router.push("/soccer");
                  reset();
                },
                (error) => {
                  if (error?.valid === false) {
                    return formRef.current.setErrors({
                      password: "Credenciais inválidas",
                    });
                  }
                  formRef.current.setErrors({
                    password: "Não foi possível concluir o login",
                  });
                }
              )
              .finally(() => setAnimate(false));
          }
        );
      },
      formRef
    );
  }

  return (
    <div className="container-fwh">
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Entrar</h1>
          <p>
            Entre com sua conta ou <Link href="/register">registre-se</Link>
          </p>
        </div>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="email"
            placeholder="Introduza seu email"
            tag="email"
          ></Input>
          <Input
            name="password"
            autoComplete="off"
            type="password"
            placeholder="Insira sua senha"
            tag="senha"
          ></Input>
          <button className={animate} type="submit">
            {!animate && "Acessar"}
          </button>
        </Form>
      </div>
    </div>
  );
}
