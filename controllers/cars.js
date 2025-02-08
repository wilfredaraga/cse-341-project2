const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAll = async (req, res, next) => {
    //#swagger.tags=['Cars']
    try {
        const result = await mongodb.getDatabase().db().collection('cars').find();
        result.toArray().then((cars) => {
            if(cars === null || cars === 0) {
            next(createError(404, 'No car found.'));
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars);
    });
    } catch (error) {
        next(createError(500, 'Something went wrong.'));
    }
    
}

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Cars']
    if(!(req.params.id.length === 24)) {
        next(createError(400, 'A valid id must have 24 characters'));
        return; 
    }
    try {
        const carId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('cars').find({ _id: carId });
        result.toArray().then((cars) => {
            if(cars === null || cars === 0) {
                next(createError(404, 'No car found with the entered id.'));
                return;
                }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(cars);
        });
    } catch (error) {
        next(createError(500, 'Something went wrong.'));
    }
    
}

const createCar = async(req, res) => {
    //#swagger.tags=['Cars']
    const car = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        transmission: req.body.transmission
    };
    const response = await mongodb.getDatabase().db().collection('cars').insertOne(car);
    if (response.acknowledged) {
        res.status(201).json({
            'Added Car:' : car
        });
    } else {
        res.status(500).json(response.error || 'Some error occurred while adding the car.');
    }
};

const updateCar = async(req, res, next) => {
    //#swagger.tags=['Cars']
    if(!(req.params.id.length === 24)) {
        next(createError(400, 'A valid id must have 24 characters'));
        return; 
    }
    const carId = new ObjectId(req.params.id);
    const car = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        transmission: req.body.transmission
    };
    const response = await mongodb.getDatabase().db().collection('cars').replaceOne({_id : carId}, car);
    if (response.modifiedCount > 0) {
        res.status(200).json({
            'Updated Car' : car
        });
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the car. Please check the id.');
    }
};

const deleteCar = async(req, res, next) => {
    //#swagger.tags=['Cars']
    if(!(req.params.id.length === 24)) {
        next(createError(400, 'A valid id must have 24 characters'));
        return; 
    }
    const carId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('cars').deleteOne({_id : carId});
    if (response.deletedCount > 0) {
        res.status(200).send('The car has been successfully deleted.');
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the car. Please check the id');
    }
};


module.exports = {
    getAll,
    getSingle,
    createCar,
    updateCar,
    deleteCar
};