const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Buyers']
    const result = await mongodb.getDatabase().db().collection('buyers').find();
    result.toArray().then((buyers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(buyers);
    });
}

const getSingle = async (req, res) => {
    //#swagger.tags=['Buyers']
    const buyerId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('buyers').find({ _id: buyerId });
    result.toArray().then((buyers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(buyers);
    });
}

const createBuyer = async(req, res) => {
    //#swagger.tags=['Buyers']
    const buyer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        occupation: req.body.occupation,
        preferredCar: req.body.preferredCar,
        preferredColor: req.body.preferredColor
    };
    const response = await mongodb.getDatabase().db().collection('buyers').insertOne(buyer);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const updateBuyer = async(req, res) => {
    //#swagger.tags=['Buyers']
    const buyerId = new ObjectId(req.params.id);
    const buyer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        occupation: req.body.occupation,
        preferredCar: req.body.preferredCar,
        preferredColor: req.body.preferredColor
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id : buyerId}, buyer);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteBuyer = async(req, res) => {
    //#swagger.tags=['Buyers']
    const buyerId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id : buyerId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};


module.exports = {
    getAll,
    getSingle,
    createBuyer,
    updateBuyer,
    deleteBuyer
};