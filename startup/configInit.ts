import config from "config"

module.exports = () => {
    if (!config.get("URI")) throw new Error("URI config variable not found")
}