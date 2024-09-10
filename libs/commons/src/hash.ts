import * as bcrypt from 'bcrypt';

export const _hash = async (
  password: string,
  saltRounds = 10,
): Promise<string> => {
  return await bcrypt.hash(password, saltRounds);
};

export const _compare = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
