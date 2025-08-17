const mongoose = require('mongoose');

const dropCooldownSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    lastDrop: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model('DropCooldown', dropCooldownSchema);