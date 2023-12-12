import User from "../models/userModel.js"

//API MANAGEMENT ------------------------------------------------



// CREATE API  --------------------------------------------------
export const create = async (req,res)=>{
    try {
        const userData = new User(req.body);
        if(!userData){
            return res.status(404).json({msg:"User Data Not Found"})
        }

        const savedData = await userData.save();
         res.status(200).json({message:"User Created Successfully",savedData})
    } catch (error) {
         res.status(500).json({error:error});
    }
}

// GET ALL API  ------------------------------------------------
export const getAll = async (req,res)=>{
    try {
        const userData =await User.find();
        if(!userData){
            return res.status(404).json({msg:"User Data Not Found"})
        }
        res.status(200).json(userData)

    } catch (error) {
        res.status(500).json({error:error});
    }
}

// GET BY ID API  -----------------------------------------------
export const getOne = async (req,res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);

        if(!userExist){
            return res.status(404).json({msg:"User Not Found"})
        }
        res.status(200).json(userExist)

    } catch (error) {
        res.status(500).json({error:error});
    }
}

// UPDATE API  --------------------------------------------------
export const update = async (req,res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);

        if(!userExist){
            return res.status(401).json({msg:"User Not Found"})
        }

        const updatedData = await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({message:"User Updated Successfully",updatedData})

    } catch (error) {
        res.status(500).json({error:error});
    }
}

// DELETE API  --------------------------------------------------
export const deleteUser = async (req,res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);

        if(!userExist){
            return res.status(404).json({msg:"User Not Found"})
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({message:"User Deleted Successfully"})

    } catch (error) {
        res.status(500).json({error:error});
    }
}