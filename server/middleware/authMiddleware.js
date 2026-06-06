const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log("AUTH HEADER:", req.headers.authorization);

      token = req.headers.authorization.split(" ")[1];

      console.log("TOKEN:", token);
      console.log("JWT SECRET:", process.env.JWT_SECRET);

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("DECODED:", decoded);

      req.user = decoded;

      next();
    } catch (error) {
  console.log("JWT ERROR MESSAGE:", error.message);
  console.log("JWT ERROR OBJECT:", error);

  res.status(401);
  throw new Error("Not authorized");
}
  }

  if (!token) {
    res.status(401);
    throw new Error("No token provided");
  }
});

module.exports = { protect };