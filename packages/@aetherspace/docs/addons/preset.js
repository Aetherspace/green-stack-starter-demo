function managerEntries(entry = []) {
    return [...entry, require.resolve("./gqlPlaygroundAddon.js")];
}

module.exports = {
    managerEntries,
}
