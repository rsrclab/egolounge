import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const generateProcessToken = ({ expiresIn }: { expiresIn: string | number | undefined }) => {
  const processId = uuidv4();
  const processToken = jwt.sign({ id: processId }, process.env.JSON_WEB_TOKEN_SECURE_KEY ?? "", {
    expiresIn // in 2 minute process will be expired
  });
  return processToken;
};
