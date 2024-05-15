const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Service = require('../model/Services'); // Importing the Service model from model.js

// Controller function to register a new service
exports.registerService = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ status: "error", msg: errorMessages.join(" and ") });
    }
    
    // Get the user ID from the request body
    const { user_id, title, picture, phone, description, location, Category, SubCategory } = req.body;

    // Create a new service instance
    const newService = new Service({
      user_id,
      title,
      picture,
      phone,
      description,
      location,
      Category,
      SubCategory
    });

    // Save the new service to the database
    const service = await newService.save();

    return res.status(201).json({ status: "success", service });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
};

// Controller function to update a service (using POST)
exports.updateService = async (req, res) => {
  try {
    const { _id, updates } = req.body; // Extract ID and updates from request body

    // Check if any of the update fields are empty
    const emptyFields = Object.entries(updates).filter(([key, value]) => value === '');
    if (emptyFields.length > 0) {
      const fields = emptyFields.map(([key]) => key).join(', ');
      return res.status(400).json({ status: 'error', msg: `Cannot set ${fields} to empty` });
    }

    const options = { new: true };
    
    // Find the service by ID and retrieve the original document
    const originalService = await Service.findById(_id);

    // Update the service
    const updatedService = await Service.findByIdAndUpdate(_id, updates, options);

    if (!updatedService) {
      return res.status(404).json({ status: "error", msg: "Service not found" });
    }

    // Construct a message indicating which fields have been updated
    const updatedFields = Object.keys(updates);
    const updatedFieldsMsg = updatedFields.map(field => `${field} has been updated`).join(", ");

    // Return a response with the updated service and the message
    return res.status(200).json({ status: "success", service: updatedService, msg: updatedFieldsMsg });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
};

// Controller function to delete a service (using POST)
exports.deleteService = async (req, res) => {
  try {
    const { _id } = req.body; // Extract ID from request body
    const deletedService = await Service.findByIdAndDelete(_id);

    if (!deletedService) {
      return res.status(404).json({ status: "error", msg: "Service not found" });
    }

    return res.status(200).json({ status: "success", msg: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
};


// // Controller function to get services by category ID
// exports.getServicesByCategoryId = async (req, res) => {
//   try {
//     const { categoryId } = req.body;

//     // Find all services with the specified category ID
//     const services = await Service.find({ Category: categoryId });

//     // Return the services
//     return res.status(200).json({ status: 'success', services });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ status: 'error', msg: 'Internal Server Error' });
//   }
// };
// Controller function to get services by category ID
exports.getServicesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params; // Update from req.body to req.params

    // Find all services with the specified category ID
    const services = await Service.find({ Category: categoryId });

    // Return the services
    return res.status(200).json({ status: 'success', services });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', msg: 'Internal Server Error' });
  }
};


// Controller function to get services by service IDs
exports.getServicesByServiceIds = async (req, res) => {
  try {
    const { serviceIds } = req.body;

    // Find all services with the specified service IDs
    const services = await Service.find({ _id: { $in: serviceIds } });

    // Return the services
    return res.status(200).json({ status: 'success', services });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', msg: 'Internal Server Error' });
  }
};
// Controller function to get all services
exports.getAllServices = async (req, res) => {
  try {
    // Retrieve all services from the database
    const services = await Service.find();

    // Return the services in the response
    return res.status(200).json({ status: 'success', services });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', msg: 'Internal Server Error' });
  }
};

// Controller function to get household services by category ID
exports.getHouseholdServicesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params; // Access category ID from URL parameter

    // Find all household services with the specified category ID
    const householdServices = await Service.find({ Category: categoryId });

    // Return the household services
    return res.status(200).json({ status: 'success', householdServices });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', msg: 'Internal Server Error' });
  }
};



