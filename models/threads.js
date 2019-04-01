const mongoose = require('mongoose');
let threadSchema = mongoose.Schema({
    forum_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});
module.exports=mongoose.model('Thread',threadSchema);