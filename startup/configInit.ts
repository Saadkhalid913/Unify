// this module asserts that all required configurations variables are defined at startup 


import config from "config"

module.exports = () => {
    if (!config.get("URI")) throw new Error("URI config variable not found")
    if (!config.get("key")) throw new Error("key config variable not found")
}