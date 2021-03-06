export class Team {
  id = Number;
  name = String;
  code = String;
  country = String;
  founded = Number;
  national = Boolean;
  logo = String;
}

export class LimitedUser {
  id = String;
  data = {
    name: String,
    picture: String,
  };
}

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
    picture: String,
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

export class Payment {
  value = Number; // Valor total do pagamento
  type = "receive" || "send"; // Tipo de operação
  verified = Boolean; // Se foi confirmado por um administrador
  id = String; // Identificação do pagamento "michel-123456"
  reference = String; // Id do usuário
}

export class DbConfig {
  email = "data.email.address";
  pix = "data.pix";
  picture = "data.picture";
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

export class GameDb {
  visited = "teams.visited";
  visitor = "teams.visitor";
  date = "date";
  state = "state";
  score = "score";
}

export class Season {
  running = Boolean;
  id = String;
  ticket = Number;
}
