const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Token is missing" });
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "imf_gadget");
    req.user = decoded; 
    next(); 
  } catch (err) {
    return res.status(403).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = { authenticate };
