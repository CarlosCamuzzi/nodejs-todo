const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdDate: {
    type: Date,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
});

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;
