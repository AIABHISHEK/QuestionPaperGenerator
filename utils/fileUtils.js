const fs = require('fs');

function writeJSONToFile(fileName, data) {
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
}

function readJSONFromFile(fileName) {
    const data = fs.readFileSync(fileName, 'utf8');
    return JSON.parse(data);
}

module.exports = {
    writeJSONToFile,
    readJSONFromFile,
};
