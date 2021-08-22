export {};

export function welcome(req, res) {
  try {
    res.send({h1Text:`Shop Shop Shop`, message: "We wish you happy Shopping 🛒"});

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export const adminPanel = (req, res)=>{
  try {
    res.send({adminPanel:true})

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function register(req, res) {
  try {
    // const { username, password } = req.body;

    // if (username && password) {
    //   res.cookie('role', {role: 'admin'}, {maxAge: 900000, httpOnly: true});
    // }
    
    res.send({ register: true });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export function login(req, res) {
  try {
    const { username, password } = req.body;

    if (username && password) {
      res.cookie('userRole', {role: 'admin'}, {maxAge: 900000, httpOnly: true});
    }

    res.send({ login: true });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}