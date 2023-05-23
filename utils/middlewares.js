module.exports.validateEmail = (req, res, next) => {
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  if (regex.test(req.body.email)) {
    next();
  } else {
    res.send("Invalid email");
  }
};

module.exports.hasAccess = (req, res, next) => {
  const { secret } = req.body;
  if (secret === "12345") {
    console.log("Works");
    return next();
  }
  res.send("You do not have access");
};
