const fs = require("fs");
const util = require("util");
const XLSX = require("xlsx");
const writeFile = util.promisify(fs.writeFile);

const workbook = XLSX.readFile("./frontend_test.xlsx");
const sheets = workbook.Sheets;


const data = Object.entries(sheets)
	.map(([name, sheet]) => {
		return [name, XLSX.utils.sheet_to_json(sheet)];
	})
	.reduce((acc, [name, sheet]) => {
		acc[name] = sheet;
		return acc;
	}, {});

writeFile("./db.json", JSON.stringify(data))
	.then(() => console.log("Database written..."))
	.catch(err => console.error(err));
