import * as Yup from "yup";
export function gameValidate({ visitor, visited }, onValidate, formRef) {
  const fields = Yup.object().shape({
    visitor: Yup.number()
      .moreThan(-1, "Minimo de 0")
      .lessThan(100, "Máximo de 99")
      .required("Insira [0-100]"),
    visited: Yup.number()
      .moreThan(-1, "Minimo de 0")
      .lessThan(100, "Máximo de 99")
      .required("Insira [0-100]"),
  });

  fields.validate({ visited, visitor }, { abortEarly: false }).then(
    () => {
      onValidate();
    },
    (error) => {
      formErrors(error, formRef);
    }
  );
}
export function codeValidation({ code }, onValidate, formRef) {
  const fields = Yup.object().shape({
    code: Yup.string()
      .min(6, "O código tem 6 dígitos")
      .max(6, "O código tem 6 dígitos")
      .required("Insira o código de confirmação"),
  });

  fields.validate({ code }, { abortEarly: false }).then(
    () => {
      onValidate();
    },
    (error) => {
      formErrors(error, formRef);
    }
  );
}

export function loginValidation({ email, password }, onValidate, formRef) {
  const fields = Yup.object().shape({
    email: Yup.string()
      .email("Insira um email válido")
      .required("Insira o email da sua conta"),
    password: Yup.string().required("Insira sua senha de acesso"),
  });

  fields.validate({ email, password }, { abortEarly: false }).then(
    () => {
      onValidate();
    },
    (error) => {
      formErrors(error, formRef);
    }
  );
}

export function registerValidation(
  { name, email, password },
  onValidate,
  formRef
) {
  const fields = Yup.object().shape({
    name: Yup.string()
      .min(3, "O nome deve ter ao menos 3 caracteres")
      .required("Insira seu nome"),

    email: Yup.string()
      .email("Insira um email válido")
      .required("Insira seu endereço de email"),
    password: Yup.string()
      .matches(/[A-Z]/, "Ao menos um caractere maiúsculo")
      .matches(/[a-z]/, "Ao menos um caractere minúsculo")
      .matches(/[0-9]/, "Ao menos um número")
      .min(8, "A senha deve ter ao menos 8 caracteres")
      .required("Crie uma senha de acesso"),
  });

  fields.validate({ name, email, password }, { abortEarly: false }).then(
    () => {
      onValidate();
    },
    (error) => {
      formErrors(error, formRef);
    }
  );
}

export function configValidation(config, onValidate, formRef) {
  const fields = Yup.object().shape({
    email: Yup.string()
      .nullable(true)
      .email("Insira um endereço de email válido")
      .required("Este campo não pode ficar vazio"),
    pix: Yup.string().nullable(true),
    password: Yup.string()
      .nullable(true)
      .label("Chave PIX para receber as recompensas")
      .matches(/[A-Z]/, "Ao menos um caractere maiúsculo")
      .matches(/[a-z]/, "Ao menos um caractere minúsculo")
      .matches(/[0-9]/, "Ao menos um número")
      .min(8, "A senha deve ter ao menos 8 caracteres")
      .required("Crie uma senha de acesso"),
    twosteps: Yup.bool(),
    video: Yup.bool(),
    darkmode: Yup.bool(),
  });

  fields.validate(config, { abortEarly: false }).then(
    (_valid) => {
      onValidate();
    },
    (error) => {
      formErrors(error, formRef);
    }
  );
}

function formErrors(error, formRef) {
  if (error instanceof Yup.ValidationError) {
    const errorMessages = {};
    error.inner.forEach((err) => {
      errorMessages[err.path] = err.message;
    });
    formRef.current.setErrors(errorMessages);
  }
}
