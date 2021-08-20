export {};

export function welcome(req, res) {
  try {

    res.send({h1Text:`Yaniv's App`, message: "hello world" });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function login(req, res) {
  try {

    res.send({ login: true });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function register(req, res) {
  try {

    res.send({ register: true });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}