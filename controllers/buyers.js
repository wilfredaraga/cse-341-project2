const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAll = async (req, res, next) => {
    //#swagger.tags=['Buyers']
    try {
        const result = await mongodb.getDatabase().db().collection('buyers').find();
        result.toArray().then((buyers) => {
            if(buyers === null || buyers === 0) {
            next(createError(404, 'No buyer found.'));
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(buyers);
    });
    } catch (error) {
        next(createError(500, 'Something went wrong.'));
    }
    
}

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Buyers']
    if(!(req.params.id.length === 24)) {
        next(createError(400, 'A valid id must have 24 characters'));
        return; 
    }
    try {
        const buyerId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('buyers').find({ _id: buyerId });
        result.toArray().then((buyers) => {
            if(buyers === null || buyers === 0) {
                next(createError(404, 'No buyer found with the entered id.'));
                return;
                }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(buyers);
        });
    } catch (error) {
        next(createError(500, 'Something went wrong.'));
    }
    
}

const createBuyer = async(req, res) => {
    //#swagger.tags=['Buyers']
    const buyer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        country: req.body.country,
        occupation: req.body.occupation,
        preferredCar: req.body.preferredCar,
        preferredColor: req.body.preferredColor
    };
    const response = await mongodb.getDatabase().db().collection('buyers').insertOne(buyer);
    if (response.acknowledged) {
        res.status(201).json({
            'Added Buyer:' : buyer
        });
    } else {
        res.status(500).json(response.error || 'Some error occurred while adding the buyer.');
    }
};

const updateBuyer = async(req, res, next) => {
    //#swagger.tags=['Buyers']
    if(!(req.params.id.length === 24)) {
        next(createError(400, 'A valid id must have 24 characters'));
        return; 
    }
    const buyerId = new ObjectId(req.params.id);
    const buyer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        country: req.body.country,
        occupation: req.body.occupation,
        preferredCar: req.body.preferredCar,
        preferredColor: req.body.preferredColor
    };
    const response = await mongodb.getDatabase().db().collection('buyers').replaceOne({_id : buyerId}, buyer);
    if (response.modifiedCount > 0) {
        res.status(200).json({
            'Updated Buyer' : buyer
        });
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the buyer. Please check the id.');
    }
};

const deleteBuyer = async(req, res, next) => {
    //#swagger.tags=['Buyers']
    if(!(req.params.id.length === 24)) {
        next(createError(400, 'A valid id must have 24 characters'));
        return; 
    }
    const buyerId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('buyers').deleteOne({_id : buyerId});
    if (response.deletedCount > 0) {
        res.status(200).send('The buyer has been successfully deleted.');
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the buyer. Please check the id');
    }
};


module.exports = {
    getAll,
    getSingle,
    createBuyer,
    updateBuyer,
    deleteBuyer
};