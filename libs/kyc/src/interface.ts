export interface IKycService<P> {
  send(payload: P): Promise<void> | void;
  sendBackUp(payload: P): Promise<void> | void;
}
