import { NodeFetch } from "../../../../utils/NodeFetch";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const handler = async (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(400).json({ missing: "token" });

  await NodeFetch(
    `${process.env.NEXT_PUBLIC_FETCH_URI}/app/mailer/token/${token}`,
    {
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${process.env.NEXT_PUBLIC_APP_ID}`,
      },
    }
  ).then(
    () => {
      res.redirect("/email-status");
    },
    (err) => {
      console.info(err);
      res.status(500).json({ error: "server-error" });
    }
  );
};

export default handler;
