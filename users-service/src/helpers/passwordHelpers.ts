import bcrypt from "bcryptjs";

export const passwordCompareSync = (passwordToTest: string, passwordHash: string) => {
  return bcrypt.compareSync(passwordToTest, passwordHash);
};

export const hashPassword = (passowrd: string) => {
  return bcrypt.hashSync(passowrd, bcrypt.genSaltSync(12));
};
