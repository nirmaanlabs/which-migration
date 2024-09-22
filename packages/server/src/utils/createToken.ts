import jwt from "jsonwebtoken";

export const createToken = (payload: any) => {
  const secretKey = "SECRET_KEY"; // Replace with your own secret key
  const options = {
    expiresIn: "1h", // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};
