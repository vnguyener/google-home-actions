"use strict";

const mongoose = require("mongoose"),
    q = require("q"),
    config = require("../configs/database.json");

const uri = config.env.dev.clearGroceryList;

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
    removeGroceryItem: removeGroceryItem,
    addGroceryItem: addGroceryItem,
    clearGroceryList: clearGroceryList
};

function getGroceryList() {

};

function removeGroceryItem() {

};

function addGroceryItem() {

};

function clearGroceryList() {

};
