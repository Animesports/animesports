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

export class Config {
  email = String;
  pix = String;
  password = String;
  twosteps = Boolean;
  video = Boolean;
  darkmode = Boolean;
}

export class DbConfig {
  email = "data.email.address";
  pix = "data.pix";
  password = "data.password";
  twosteps = "config.twosteps";
  video = "config.video";
  darkmode = "config.darkmode";
}

export class UseNextOp {
  ignoreEmpty = Boolean;
}

export class DefaultOp {
  ignoreEmpty = true;
}
