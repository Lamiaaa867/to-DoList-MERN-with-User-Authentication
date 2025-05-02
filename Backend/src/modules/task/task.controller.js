import { taskModel } from "../../../DB/models/task.model.js";
import { userModel } from "../../../DB/models/user.model.js";
//==========================add task=====================

export const addTask=async(req,res,next)=>{
   const {_id}=req.user
  
    const {title,description,status,deadline}=req.body;
    const task=await taskModel.findOne({title});
    if (task){
        return res.status(401).json({message:"task already exist "})
    }

    const taskInstance=new taskModel({title,description, userid:_id,status,deadline})
    taskInstance.save()
    console.log(taskInstance)
 
    return res.status(201).json({
        message:"success",
        taskInstance})


}
//=========================update task==================
export const updateTask=async(req,res,next)=>{
  
    const { id } = req.params;
    const { title, description, status, deadline } = req.body;

    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { title, description, status, deadline },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task updated", task: updatedTask });

}
//===========================delete task===================
export const deleteTask=async(req,res,next)=>{
   
   
    const {_id}=req.params
   // const {title,description,status,deadline}=req.body;
    const task=await taskModel.findById(_id);
    if (!task){
        return res.status(401).json({message:"invalid task"})
    }
 
    await taskModel.findByIdAndDelete({_id},
        {new:true})
        return res.status(200).json({message:"task deleted"}) 

}

//==================get all tasks =======================

export const getAllTasks = async (req, res, next) => {

    const userId = req.user._id;

    const userTasks = await taskModel.find({ userid: userId });

    if (!userTasks || userTasks.length === 0) {
      return res.status(200).json({ message: "No tasks found. Start by adding a new task." });
    }

    return res.status(200).json({ message: "success", tasks: userTasks });
 
};
//===========search for task with title ==========

export const getTasksTitle = async (req, res, next) => {
  const { searchKey } = req.params;
  const userId = req.user._id; // from auth middleware


  const tasks = await taskModel.find({
    userid: userId,
    $or: [
      { title: { $regex: searchKey, $options: 'i' } },
    
    ]
  });

if(!tasks){
  return  res.status(200).json({ message: 'no tasks'});}

   return  res.status(200).json({ message: 'Done', tasks });

};

