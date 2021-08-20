export {};

export function exampleControllerFunction(req, res) {
  try {

    res.send(`<h1>Yaniv's App</h1>`,{ message: "hello world" });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}
