export class User {
  id = String;
  data = {
    name: String,
    email: {
      address: String,
      verified: Boolean,
    },
    pix: String,
    password: String,
    admin: Boolean,
  };
  config = {
    twosteps: Boolean,
    video: Boolean,
    darkmode: Boolean,
  };
}
