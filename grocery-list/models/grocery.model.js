"use strict";

const mongoose = require("mongoose");

module.exports = mongoose.model("Grocery", {
    name: {
        type: String,
        default: null,
        required: true,
        unique: true
    }
});
