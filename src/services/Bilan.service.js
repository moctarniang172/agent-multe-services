const Operation = require("../models/Operation.model"); // ✅ import ajouté

exports.getDailyReport = async (userId) => {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const operations = await Operation.find({
        agent: userId,
        createdAt: { $gte: today }
    });

    const totalAmount = operations.reduce(
        (acc, op) => acc + op.montant, 
        0
    );

    const totalProfit = operations.reduce(
        (acc, op) => acc + op.profit,
        0
    );

    return {
        totalOperations: operations.length,
        totalAmount,
        totalProfit,
        operations
    };
};