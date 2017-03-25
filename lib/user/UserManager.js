const allUsers = [
  { id: 1, username: 'a', password: 'a' },
  { id: 2, username: 'b', password: 'b' },
  { id: 3, username: 'c', password: 'c' }
];

export default class UserManager {

  static async verifyPassword(loginName, password) {
    const user = allUsers.filter(val => val.username === loginName)[0];
    if (user.password === password) {
      return user;
    }

    return false;
  }
}
