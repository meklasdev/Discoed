const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    channelId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: false,
        default: null
    },
    status: {
        type: String,
        default: 'unClaimed',
    },
    claimedBy: {
        type: String,
        default: null
    }
}, { timestamps: true });

ticketSchema.index({ userId: 1 });

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;