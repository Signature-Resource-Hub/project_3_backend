const PropertiesModel = require('../model/properties');

exports.registerProperties = (req, res) => {
    let { userId, price,bhk, description, phone, email, whatsapp, location, property_type } = req.body;

    // Trim userId to remove leading and trailing spaces
    userId = userId.trim();

    // Check if any field is empty
    if (!userId || !price ||! bhk || !description || !phone || !email || !whatsapp || !location || !property_type) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    // Check if phone and WhatsApp have 10 digits
    if (!(/^\d{10}$/.test(phone)) || !(/^\d{10}$/.test(whatsapp))) {
        return res.status(400).json({ error: "Phone and WhatsApp must be 10 digits" });
    }

    // Check if email contains "@gmail.com"
    if (!email.endsWith('@gmail.com')) {
        return res.status(400).json({ error: "Email must end with @gmail.com" });
    }

    // Create a new instance of PropertiesModel
    const newProperty = new PropertiesModel({
        user_id: userId, // Include user ID here
        price: price,
        bhk:bhk,
        description: description,
        phone: phone,
        email: email,
        whatsapp: whatsapp,
        location: location,
        property_type: property_type,
    
    });

    newProperty.save().then(property => {
        res.status(201).json({ message: "Property registered successfully", property: property });
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
};

// Rest of the controller functions...

// Controller function to update a Property (using POST)
exports.updateProperty = async (req, res) => {
    try {
        // Extract id from request body
        const { userId, id, email, phone, whatsapp, price,bhk, description, property_type, location } = req.body;
        const updates = req.body;
        const options = { new: true };

        // Check if any update fields are empty
        if (!email && !phone && !whatsapp && !price && !description &&!bhk && !property_type && !location) {
            return res.status(400).json({ status: "error", msg: "At least one field for update is required" });
        }

        // Validation: Check if email ends with '@gmail.com' if email is being updated
        if (email && !email.endsWith('@gmail.com')) {
            return res.status(400).json({ status: "error", msg: "Email must end with @gmail.com" });
        }

        // Validation: Check if phone or whatsapp is being updated and has 10 digits
        if ((phone && !(/^\d{10}$/.test(phone))) || (whatsapp && !(/^\d{10}$/.test(whatsapp)))) {
            return res.status(400).json({ status: "error", msg: "Phone and WhatsApp must be 10 digits" });
        }

        // Update the property
        const updatedProperty = await PropertiesModel.findByIdAndUpdate(id, updates, options);

        if (!updatedProperty) {
            return res.status(404).json({ status: "error", msg: "Property not found" });
        }
        
        return res.status(200).json({ status: "success", property: updatedProperty });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
};


// Controller function to delete a Property (using POST)
exports.deleteProperty = async (req, res) => {
    try {
        const { userId, id } = req.body; // Access id from request body
        const deletedProperty = await PropertiesModel.findOneAndDelete({ _id: id, user_id: userId });
    
        if (!deletedProperty) {
            return res.status(404).json({ status: "error", msg: "Property not found" });
        }
    
        return res.status(200).json({ status: "success", msg: "Property deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
};

// Controller function to view all properties based on property_type
// Controller function to view properties by property_type
exports.getPropertiesByType = async (req, res) => {
    try {
        const { property_type } = req.body; // Access property_type from request body
        if (!property_type) {
            return res.status(400).json({ status: "error", msg: "Property type parameter is missing" });
        }

        // Find properties based on property_type
        const properties = await PropertiesModel.find({ property_type: property_type });

        if (!properties || properties.length === 0) {
            return res.status(404).json({ status: "error", msg: "Properties not found for the specified property type" });
        }

        return res.status(200).json({ status: "success", properties: properties });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
};

exports.getPropertyById = async (req, res) => {
    try {
        const { id } = req.body; // Access id from request body
        if (!id) {
            return res.status(400).json({ status: "error", msg: "Property ID is missing" });
        }

        // Find property by ID
        const property = await PropertiesModel.findOne({ _id: id });

        if (!property) {
            return res.status(404).json({ status: "error", msg: "Property not found" });
        }

        return res.status(200).json({ status: "success", property: property });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
};





// Controller function to view all properties
// Controller function to view all properties
// exports.getAllProperties = async (req, res) => {
//     try {
//         // Find all properties including the image field
//         const properties = await PropertiesModel.find({}, 'user_id price description phone email whatsapp location property_type image');

//         if (!properties || properties.length === 0) {
//             return res.status(404).json({ status: "error", msg: "No properties found" });
//         }

//         return res.status(200).json({ status: "success", properties: properties });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ status: "error", msg: "Internal Server Error" });
//     }
// };

exports.getAllProperties = async (req, res) => {
    try {
        // Find all properties including the image field
        const properties = await PropertiesModel.find({}, 'user_id price description phone email whatsapp location property_type image');

        if (!properties || properties.length === 0) {
            return res.status(404).json({ status: "error", msg: "No properties found" });
        }

        return res.status(200).json({ status: "success", properties: properties });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
};



exports.getRentProperties = async (req, res) => {
    try {
        // Find properties where property_type is "rent"
        const properties = await PropertiesModel.find({ property_type: "rent" }, 'user_id price description phone email whatsapp location property_type image');

        if (!properties || properties.length === 0) {
            return res.status(404).json({ status: "error", msg: "No properties found for rent" });
        }

        return res.status(200).json({ status: "success", properties: properties });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
};

exports.getSaleProperties = async (req, res) => {
    try {
        // Find properties where property_type is "rent"
        const properties = await PropertiesModel.find({ property_type: "sale" }, 'user_id price description phone email whatsapp location property_type image');

        if (!properties || properties.length === 0) {
            return res.status(404).json({ status: "error", msg: "No properties found for rent" });
        }

        return res.status(200).json({ status: "success", properties: properties });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
};
