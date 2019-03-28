const mongoose = require('mongoose');
let forumSchema = mongoose.Schema({
    forum_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
module.exports=mongoose.model('Forum',forumSchema);