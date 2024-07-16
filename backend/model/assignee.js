const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assigneeSchema = new Schema({
  email: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Assignee', assigneeSchema);

