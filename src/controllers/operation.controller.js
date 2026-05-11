const operationService = require("../services/operation.service");

// CREATE
exports.createOperation = async (req, res) => {
    try {
        const operation = await operationService.createOperation(
            req.body,
            req.user._id
        );

        res.status(201).json({
            message: "Opération enregistrée",
            operation
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET ALL  ajout
exports.getOperations = async (req, res) => {
    try {
        const operations = await operationService.getOperations(req.user._id);

        res.status(200).json({ operations });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};