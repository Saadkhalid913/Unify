"use strict";
exports.__esModule = true;
var config_1 = require("config");
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var app = express_1["default"]();
// add middlewear and check config vars 
require("./startup/middlewearInit")(app);
require("./startup/configInit")();
mongoose_1["default"].connect(config_1["default"].get("URI"), { useUnifiedTopology: true, useNewUrlParser: true });
require("./startup/routesInit")(app);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () { console.log("Listening on port: " + PORT); });
