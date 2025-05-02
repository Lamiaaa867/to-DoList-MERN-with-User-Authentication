 import { userModel } from "../../../DB/models/user.model.js";
  import {taskModel} from "../../../DB/models/task.model.js"
//====================== update User data ====================
export const updateData = async (req, res, next) => {
    
      const { _id } = req.user; // user ID from token
      const { name, phone } = req.body;
    
      const userExist = await userModel.findById(_id);
  
      if (!userExist) {
        return res.status(400).json({ message: "Invalid user" });
      }
  
    
  
      const updatedUser = await userModel.findByIdAndUpdate(
        _id,
        { name,  phone },
        { new: true }
      ).select("-password");
  
      return res.status(200).json({ message: 'Done', updatedUser });
  
  
  };

//================display personsl data=============

export const displayUserData = async (req, res, next) => {

    const user = await userModel.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const tasks = await taskModel.find({ userid: req.user._id });

    return res.status(200).json({
      user,
      tasks
    });
 
};
