"use strict";

const mongoose = require("mongoose"),
    q = require("q"),
    Grocery = require('../models/grocery.model'),
    config = require("../configs/database.json");

const uri = config.env.dev.groceryList;

// database connection
mongoose.connect(uri, (err, res) => {
    if (err) {
        console.log("ERROR connecting to: " + uri + ". " + err);
    } else {
        console.log("Succeeded connected to: " + uri);
    }
});

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Mongoose default connection disconnected on app termination.");
        process.exit(0);
    });
});

// exports
module.exports = {
    getGroceryList: getGroceryList,
    removeGroceryItems: removeGroceryItems,
    addGroceryItems: addGroceryItems,
    clearGroceryList: clearGroceryList,
    checkGroceryList: checkGroceryList
};

function getGroceryList() {
    let deferred = q.defer();

    Grocery.find({}, (err, items) => {
        if (error) {
            console.log(error);
            deferred.reject(error);
        }

        if (items) {
            deferred.resolve(items);
        }
    });

    return deferred.promise;
};

function checkGroceryList(item) {
    let deferred = q.defer();

    Grocery.findOne({ "name": item }, (error, res) => {
        if (error) {
            console.log(error);
            deferred.reject(error);
        }

        if (res) {
            deferred.resolve(res);
        };

    });

    return deferred.promise;
};

function removeGroceryItems(items) {
    let deferred = q.defer();

    items.forEach((item) => {
        Grocery.findOneAndRemove({ "name": item }, (err, res) => {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } 

            if (res) {
                deferred.resolve(res);
            }
        });
    });

    return deferred.promise;
};

function addGroceryItems(items) {
    let deferred = q.defer();
    console.log(items);

    items.forEach((item) => {
        let newGrocery = new Grocery({
            name: item
        });

        newGrocery.save((err, res) => {
            if (err) {
                console.log(err);
                deferred.reject(err);
            }  
            
            if (res) {
                deferred.resolve(res);
            };
        });

    });

    return deferred.promise;
};

function clearGroceryList() {
    let deferred = q.defer();

    Grocery.remove({}, (err, res) => {
        if (err) {
            console.log(err);
            deferred.reject(err);
        } 

        if (res) {
            deferred.resolve();
        }
    });

    return deferred.promise;
};
