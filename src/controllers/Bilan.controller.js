const bilanService = require("../services/Bilan.service");

exports.dailyReport = async (req, res) => {
    try {
        const report = await bilanService.getDailyReport(req.user._id);

        res.status(200).json(report);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};