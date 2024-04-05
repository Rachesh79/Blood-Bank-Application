// create inventory

const userModels = require("../models/userModels");
const inventoryModel = require("../models/inventoryModel");

const createInventoryController = async (req, res) => {
    try {
        const { email, inventoryType } = req.body;
        // validation
        const user = await userModels.findOne({ email });
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }
        if (inventoryType === 'in' && user.role !== 'donar') {
            return res.status(403).send({ success: false, message: 'Not an owner account' });
        }
        if (inventoryType === 'out' && user.role !== 'hospital') {
            return res.status(403).send({ success: false, message: 'Not a hospital' });
        }

        // save records
        const inventory = new inventoryModel(req.body);
        await inventory.save();
        res.status(201).send({
            success: true,
            message: "New blood record added"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in create inventory API',
            error: error.message
        });
    }
};


// get all blood records

const getInventoryController = async (req,res) =>{
    try {
        const inventory = await inventoryModel
        .find({organization:req.body.userId})
        
        return res.status(200).send({
            success:true,
            message:"get all records successfull",
            inventory
        })
    } 
    
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            error:"Error in get all inventory",
            error
        })
    }
}

module.exports = { createInventoryController,  getInventoryController};