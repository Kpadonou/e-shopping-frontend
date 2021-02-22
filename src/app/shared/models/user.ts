import { Role } from './role';
export class User {
  roles: Role[];
  constructor(
    public id?: number,
    public username?: string,
    public password?: string,
    public email?: string
  ) {}
}
