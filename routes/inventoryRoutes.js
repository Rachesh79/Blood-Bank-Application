const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createInventoryController, getInventoryController, getDonarsController, getHospitalsController, getOrganizationsController, getInventoryHospitalController } = require('../controllers/inventoryController')

const router = express.Router()

// routes
// Add inventory || port

router.post('/create-inventory',authMiddleware, createInventoryController)

// get all blood records
router.get('/get-inventory',authMiddleware,getInventoryController)

// get hospital blood records
router.post('/get-inventory-hospital',authMiddleware,getInventoryHospitalController)

// get donars records
router.get('/get-donars',authMiddleware, getDonarsController)

// Get hospital records
router.get('/get-hospitals',authMiddleware, getHospitalsController)

// Get organization records
router.get('/get-organizations',authMiddleware, getOrganizationsController)



module.exports = router