const xlsx = require('xlsx')

function to_json(w/*:JWorkbook*/, raw/*:?boolean*/) {
    var result = {};
    w.SheetNames.forEach(function(sheetName) {
        var roa = xlsx.utils.sheet_to_json(w.Sheets[sheetName], typeof raw == "object" ? raw : {raw:raw});
        if(roa.length > 0) result[sheetName] = roa;
    });
    return result;
}


module.exports = to_json
