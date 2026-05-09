const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB connecté ');

    } catch (erreur) {
        console.error("Erreur MongoDB  :", erreur);
        process.exit(1);
    }
}

module.exports = connectDB;