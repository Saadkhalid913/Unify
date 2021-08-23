const config = require("config")

module.exports = () => {
    if (!config.get("URI")) throw new Error("URI config variable not found")
}