export interface IJwtServicePayload {
  userId: string;
  username: string;
  email: string;
  dateExpire: Date;
  permissions: string[];
}

export interface IJwtService {
  checkToken(token: string): Promise<any>;
  createToken(payload: IJwtServicePayload): string;
}
