const Transaction = require("../models/Transaction");

async function getTransactions(req, res) {
  const user_id = req.user_id;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  try {
    const results = await Transaction.TransactionWithinPeriod(
      user_id,
      startDate,
      endDate
    );
    res.status(200).json({ "transactions within given period": results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

async function addTransaction(req, res) {
  const type = req.body.type;
  const amount = req.body.amount;
  const description = req.body.description;

  try {
    await Transaction.addTransaction(req.user_id, type, amount, description);
    res.status(200).json({ message: "transaction added. " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

async function getSummary(req, res) {
  const user_id = req.user_id;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  try {
    const results = await Transaction.TransactionSummary(
      user_id,
      startDate,
      endDate
    );
    res.status(200).json({ "transactions summary": results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

async function deleteTransaction(req, res) {
  const transactionId = req.params.id;
  try {
    await Transaction.deleteTransaction(transactionId);
    res.status(200).json({ message: "transaction deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

module.exports = {
  getTransactions: getTransactions,
  addTransaction: addTransaction,
  getSummary: getSummary,
  deleteTransaction: deleteTransaction,
};

