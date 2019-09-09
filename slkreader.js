const slk2csv = require('./slk2csv')
const csv2json = require('./csv2json')
const fs = require('fs')
const xlsx = require('xlsx');

module.exports = async (source_file, output_file) => {

    await slk2csv(source_file, output_file)
    const workbook = await xlsx.readFileSync(output_file)
    const json = csv2json(workbook)
    fs.unlink(source_file, () => {
        console.log(`delete the source_file: ${source_file}`)
    })

    fs.unlink(output_file, () => {
        console.log(`delete the output_file: ${output_file}`)
    })



    return {data: json}
}
