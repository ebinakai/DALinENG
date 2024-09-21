module.exports = {
  secret: process.env.SECRET_KEY,
  options: {
    algorithm: "HS256",
    expiresIn: "1h"
  }
}