const bcrypt = require("bcryptjs");
const db = require("../database/database-connection");

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  static async findUser(email) {
    const database = await db.getDb();
    const [user] = await database.query("SELECT * from users where email = ?", [email]);
    return user[0]; 
  }

  async save() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    const database = await db.getDb();
    await database.query("INSERT INTO users (email, password) VALUES (?, ?)", [this.email, hashedPassword]);
  }
}

module.exports = User;
