"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var emailValidationPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var userSchema = new mongoose_1["default"].Schema({
    username: {
        type: String,
        unique: true,
        minlength: 6,
        maxlength: 64,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 3,
        unique: true,
        maxlength: 255,
        match: emailValidationPattern
    }
});
