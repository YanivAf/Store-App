export {};

export function exampleControllerFunction(req, res) {
  try {

    res.send({h1Text:`Yaniv's App`, message: "hello world" });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}
