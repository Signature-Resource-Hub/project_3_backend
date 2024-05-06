const ContactModel = require('../model/contact');

exports.registerContact = (req, res) => {
    let { email, issue, topic, category, description } = req.body;

    // Trim userId to remove leading and trailing spaces
    // userId = userId.trim();

    // Check if any field is empty
    if (!email || !issue || !topic || !category || !description ) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    // Check if phone and WhatsApp have 10 digits
    // if (!(/^\d{10}$/.test(phone)) || !(/^\d{10}$/.test(whatsapp))) {
    //     return res.status(400).json({ error: "Phone and WhatsApp must be 10 digits" });
    // }

    // Check if email contains "@gmail.com"
    if (!email.endsWith('@gmail.com')) {
        return res.status(400).json({ error: "Email must end with @gmail.com" });
    }

    // Create a new instance of PropertiesModel
    const newContact = new ContactModel({
        // Include user ID here
       
        email: email,
        issue:issue,
        topic:topic,
        category:category,
        description: description
        
       
    });

    newContact.save().then(contact => {
        res.status(201).json({ message: "issue registered successfully", contact: contact });
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
};
