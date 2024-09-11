import { v4 as genV4 } from 'uuid';
export const genUUID = () => {
  return genV4();
};

export * from './models/common.model';
