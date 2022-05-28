import { Form } from "@unform/web";
import { Input } from "./Input";
import styles from "../styles/components/ImageUpload.module.css";
import { useContext, useRef, useState } from "react";
import { updateProfileImage } from "../services/config";
import { authContext } from "../contexts/AuthContext";

import { Image as CloudImage, Transformation } from "cloudinary-react";

export function ImageUpload({ close }) {
  const { user, sessionId, setUser } = useContext(authContext);
  const [selected, select] = useState(null);
  const [finish, setFinish] = useState(false);

  const [reference, setReference] = useState(useRef(null));

  function saveImage() {
    // Validar imagem como base64

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const percent = 160 / image.width;

      (canvas.width = image.width * percent),
        (canvas.height = image.height * percent);

      ctx.drawImage(image, 0, 0, image.width * percent, image.height * percent);

      const newImageUri = canvas.toDataURL();

      updateProfileImage(newImageUri, sessionId).then(apply);
    };

    image.src = selected;
  }

  function apply(data) {
    setFinish(true);

    setUser({
      ...user,
      profile: () => (
        <CloudImage publicId={data.secure_url} width="0.1" alt="user">
          <Transformation defaultImage="user_default.svg" />
        </CloudImage>
      ),
    });
  }

  function chooseFile() {
    document.getElementById("fileInput").click();
  }

  function selectFile() {
    if (!reference?.current?.files?.[0]) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      // Validar imagem como Base64
      select(reader.result);
    });

    reader.readAsDataURL(reference.current.files[0]);
  }

  if (finish)
    return (
      <>
        <div className={styles.overlay} onClick={close} />

        <div className={styles.container}>
          <div>
            <user.profile />

            <strong>Foto Atualizada</strong>

            <span>Pode levar um tempo para ela aparecer.</span>
          </div>

          <button onClick={close}>Voltar</button>
        </div>
      </>
    );

  return (
    <>
      <div className={styles.overlay} onClick={close} />

      <div className={styles.container}>
        <div>
          {!selected && <user.profile />}

          {selected && <img src={selected ?? "/icons/user.svg"} alt="user" />}

          <strong>Atualizar foto de perfil</strong>
        </div>

        <Form onSubmit={saveImage} onChange={selectFile}>
          <Input
            getRef={setReference}
            id="fileInput"
            type="file"
            name="picture"
            accept="image/jpeg, image/png, image/jpg"
          />

          {selected && (
            <div className={styles.buttons}>
              <button type="submit">Salvar</button>

              <button
                onClick={() => select(null)}
                className={styles.cancel}
                type="button"
              >
                Cancelar
              </button>
            </div>
          )}

          {!selected && (
            <button onClick={chooseFile} type="button">
              Escolher Imagem
            </button>
          )}
        </Form>
      </div>
    </>
  );
}
