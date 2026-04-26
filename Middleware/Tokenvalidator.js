import jwt from "jsonwebtoken"
export const tokenvalidator = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next()
  }

  const authheader = req.headers.authorization
  console.log("AUTH HEADER:", authheader)
  const token = authheader.split(" ")[1]
    console.log("token",token)
  try {
    const token = authheader.split(" ")[1]
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: decoded.id }
    next()
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Invalid token"
    })
  }
}
