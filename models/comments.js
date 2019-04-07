const mongoose = require('mongoose');
let commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    thread_id: {
        type: String,
        required: true
    },
    member_id: {
        type: String,
        required: true
    }
});