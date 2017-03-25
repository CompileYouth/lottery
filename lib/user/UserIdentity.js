export default class UserIdentity {
  constructor({ id, username }) {
    this.id = id;
    this.username = username;
  }

  serialize() {
    return JSON.stringify(this);
  }

  static async deserialize(json) {
    const user = JSON.parse(json);
    return user;
  }
}
