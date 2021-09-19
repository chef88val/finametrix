const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewsSchema = new Schema({
    title: { type: String },
    description: { type: String },
    date: { type: Date },
    content: { type: String },
    author: { type: String },
    archiveDate: { type: Date },
    archived: { type: Boolean },
    removed: { type: Boolean }
});

module.exports = mongoose.model('news', NewsSchema);