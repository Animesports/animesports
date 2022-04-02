import NextCors from "nextjs-cors";
import responseError from "../../utils/Error";

/**
 *
 * @param {Request} req register request
 * @param {Response} res register response
 */
const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["POST"],
    origin: "animesports.cf",
    optionsSuccessStatus: 200,
  });

  return res.send("ok");

  const { APP_TOKEN, APP_ID } = process.env;
  const { name, email, password } = JSON.parse(req.body);

  if (!name || !email || !password)
    return responseError(res, 400, "missing parameters");

  await fetch("https://ans-service.herokuapp.com/app/clients", {
    method: "POST",
    headers: {
      authorization: `${APP_TOKEN}@${APP_ID}`,
    },

    body: {
      name,
      email,
      password,
    },
  }).then(
    async (response) => {
      res.send(response);
    },
    (error) => {
      res.send(error);
    }
  );
};

export default handler;
