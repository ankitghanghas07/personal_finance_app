const bcrypt = require("bcryptjs");
const db = require("../database/database-connection");

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  static async findUser(email) {
    const [user] = await db.query("SELECT * from users where email = ?", [email]);
    return user; 
  }

  async save() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    await db.query("INSERT INTO users (email, password) VALUES (?)", [
      this.email,
      hashedPassword,
    ]);
  }
}

module.exports = User;
