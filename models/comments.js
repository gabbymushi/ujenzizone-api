const mongoose = require('mongoose');
let commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    thread_id: {
        type: String,
        
    }
});