// create inventory

const userModels = require("../models/userModels");
const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");

const createInventoryController = async (req, res) => {
    try {
        const { email } = req.body;
        // validation
        const user = await userModels.findOne({ email });
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }
        // if (inventoryType === 'in' && user.role !== 'donar') {
        //     return res.status(403).send({ success: false, message: 'Not an owner account' });
        // }
        // if (inventoryType === 'out' && user.role !== 'hospital') {
        //     return res.status(403).send({ success: false, message: 'Not a hospital' });
        // }

        
        if(req.body.inventoryType == 'out'){
            const requestedBloodGroup = req.body.bloodGroup
            const requestedQuantityOfBlood = req.body.quantity
            const organization = new mongoose.Types.ObjectId(req.body.userId)
            // calculate blood quantity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {$match:{
                    organization,
                    inventoryType:'in',
                    bloodGroup:requestedBloodGroup
                }},{
                    $group:{
                        _id:'$bloodGroup',
                        total:{$sum:'$quantity'}
                    },
                },
            ])
            // console.log('Total in', totalInOfRequestedBlood);
            const totalIn = totalInOfRequestedBlood[0]?.total || 0
            // calculate out quantity
            const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
                {$match:{
                    organization,
                    inventoryType:'out',
                    bloodGroup:requestedBloodGroup
                }},
                {
                    $group:{
                        _id:'$bloodGroup',
                        total:{$sum:'$quantity'}
                    }
                }
            ])
            const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0
            // in and out calculate
            const availaibleQauntityOfBlood = totalIn - totalOut
            // validation
            if(availaibleQauntityOfBlood < requestedQuantityOfBlood){
                return res.status(500).send({
                    success:false,
                    message:`Only ${availaibleQauntityOfBlood}ml of ${requestedBloodGroup.toUpperCase()} is availaible`
                })
            }
            req.body.hospital = user?._id;
        }else{
            req.body.donar = user?._id
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

// get donar records
const getDonarsController = async (req,res) => {
    try {
        const organization = req.body.userId
        const donarId = await inventoryModel.distinct('donar',{
            organization
        })

        const donars = await userModels.find({_id:{$in:donarId }})
        return res.status(200).send({
            success:true,
            message:'Donar record fetched successfully',
            donars
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:'Error in Donar records',
            error
        })
    }
}

const getHospitalsController = async (req, res) => {
    try {
        const organization = req.body.userId;
        // Fetch hospital records where the user's role is "hospital"
        const hospitals = await userModels.find({
            role: "hospital"
        });
        console.log("Hospitals:", hospitals); // Log hospitals to inspect the data
        return res.status(200).send({
            success: true,
            message: "Hospitals Data fetched successfully",
            hospitals
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in get Hospital API',
            error
        });
    }
};


const getOrganizationsController = async (req,res) => {
    try {
        const donar = req.body.userId
        const orgId = await inventoryModel.distinct('organization',{donar})
        // find ORG
        const organizations = await userModels.find({
            role:"organization"
        })
        return res.status(200).send({
            success:true,
            message:"Data fetched successfully",
            organizations
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Org API",
            error
        })
    }
}


// GET hospital Blood records

const getInventoryHospitalController = async (req,res) =>{
    try {
        const inventory = await inventoryModel
        .find(req.body.filters)
        .populate("donar")
        .populate("hospital")
        .populate("organization")
        .sort({createdAt : -1})
        return res.status(200).send({
            success:true,
            message:"get all hospital consumers records successfull",
            inventory
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            error:"Error in get consumer inventory",
            error
        })
    }
}

module.exports = { createInventoryController,  getInventoryController, getDonarsController, getHospitalsController, getOrganizationsController, getInventoryHospitalController};