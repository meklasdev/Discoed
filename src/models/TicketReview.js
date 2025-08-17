const { Schema, model } = require('mongoose');

const ticketReviewSchema = new Schema({
    ticketId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    supportId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        maxlength: 500,
        default: ''
    },
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    channelId: {
        type: String,
        required: true
    }
});

module.exports = model('TicketReview', ticketReviewSchema);