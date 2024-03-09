const db = require('../database/database-connection');

class Transaction{
    constructor(){}

    static async TransactionWithinPeriod(user_id, startDate, endDate){
        const [result] = await db.query('select * from transactions where user_id = ? AND date BETWEEN ? AND ?', [user_id, startDate, endDate]);

        return result;
    }

    static async TransactionSummary(startDate, endDate, user_id){
        const [result] = await db.query('SELECT user_id, SUM(CASE WHEN type = `income` THEN amount ELSE 0 END) AS total_income, SUM(CASE WHEN type = `expense` THEN amount ELSE 0 END) AS total_expense, SUM(CASE WHEN type = `income` THEN amount ELSE -amount END) AS savings, FROM transactions WHERE user_id = ? AND date BETWEEN ? AND ?', [user_id, startDate, endDate]);

        return result;
    }

    static async addTransaction(user_id, type, amount, description){   
        await db.query('INSERT INTO transactions (user_id, type, amount, description) VALUES (?)', [user_id, type, amount,description]);
    }

    static async deleteTransaction(id){
        await db.query('DELETE FROM transactions where transaction_id = ?', [id]);
    }
}

module.exports = Transaction;