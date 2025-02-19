export class UserModel {
  setKey(uid: string) {
    this.key = uid;
    return this;
  }
  key = '';
  birthDate: string | number = '';
  email = '';
  firstName = '';
  lastName = '';
  password = '';
  phoneNumber = '';
  role = '';
  userName = '';
  constructor(args?: {}) {
    this.build(args);
  }

  build(args?: {}) {
    Object.assign(this, args);

    return this;
  }
  serialize() {
    return {
      key: this.key,
      birthDate: this.birthDate,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      role: this.role,
      userName: this.userName,
    };
  }
}
