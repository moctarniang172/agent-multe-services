const Operation = require("../models/Operation.model");

// CREATE OPERATION
exports.createOperation = async (data, userId) => {

    if (!userId) throw new Error("Utilisateur non identifié"); 

    const { clientName, type, montant } = data;

    if (!clientName || !type || !montant) {
        throw new Error("Champs obligatoires manquants");
    }

    const operation = await Operation.create({
        agent: userId,
        clientName,
        type,
        montant,
    });

    return operation;
};

exports.getOperations = async (userId) => {

    if (!userId) throw new Error("Utilisateur non identifié"); 

    const operations = await Operation.find({ agent: userId })
        .sort({ createdAt: -1 });

    return operations;
};