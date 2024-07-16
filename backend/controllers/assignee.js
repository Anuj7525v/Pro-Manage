const Assignee = require('../model/assignee');
//const catchAsync = require('../utils/catchAsync');
//const AppError = require('../utils/AppError');


const getAssignees = async (req, res, next) => {
  try {
    const assignees = await Assignee.find({ createdBy: req.user._id });

    res.status(200).json({
      status: 'success',
      results: assignees.length,
      data: assignees,
    });
  }
  catch (error) {
    next(error)
  }
};


const createAssignee = async (req, res, next) => {
  try {
    const { email } = req.body;
    const createdBy = req.user._id;

    const existingAssignee = await Assignee.findOne({ email });

    if (existingAssignee) {

      const assigneeForUser = await Assignee.findOne({ email, createdBy });

      if (assigneeForUser) {
        throw new AppError('* This member is already in the board', 400);
      }
    }


    const newAssignee = new Assignee({ email, createdBy });
    const savedAssignee = await newAssignee.save();

    res.status(201).json({
      status: 'success',
      data: savedAssignee,
    });
  }
  catch (error) {
    next(error)
  }
};


const getAssignee = async (req, res, next) => {
  try {
    const { assigneeId } = req.params;
    const assignee = await Assignee.findOne({ _id: assigneeId, createdBy: req.user._id });

    if (!assignee) {
      throw new AppError('Assignee not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: assignee,
    });
  }
  catch (error) {
    next(error)
  }
};


const updateAssignee = async (req, res, next) => { 
   try{
  const { assigneeId } = req.params;
  const { email } = req.body;

  const existingAssignee = await Assignee.findOne({ email, createdBy: req.user._id });
  if (existingAssignee) {
    throw new AppError('* You have already added this assignee', 400);
  }


  const updatedAssignee = await Assignee.findOneAndUpdate(
    { _id: assigneeId, createdBy: req.user._id },
    { email },
    { new: true, runValidators: true }
  );

  if (!updatedAssignee) {
    throw new AppError('Assignee not found', 404);
  }

  res.status(200).json({
    status: 'success',
    data: updatedAssignee,
  });
}
catch(error){
  next(error)
}
};


const deleteAssignee = async (req, res, next) => {
  try{
  const { assigneeId } = req.params;

  const deletedAssignee = await Assignee.findOneAndDelete({
    _id: assigneeId,
    createdBy: req.user._id,
  });

  if (!deletedAssignee) {
    throw new AppError('Assignee not found', 404);
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
}
catch(error){
  next(error)
}
};

module.exports = {deleteAssignee,updateAssignee,getAssignee,createAssignee,getAssignees};