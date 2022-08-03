const { Pool } = require('pg');
const format = require("pg-format");

const connectionPool = new Pool({
	ssl: {
		rejectUnauthorized: false,
	},
});


async function getUserPassword(username) {	
	try {
		const res = await connectionPool.query('SELECT password FROM admin WHERE username=$1', [username]);
		
		if (res.rowCount != 1) return null;

		return res.rows[0].password;
	} catch (err) {
		return null;
	}
}

async function signupUser(username, password) {
	try {
		const res = await connectionPool.query('INSERT INTO admin(username,password) VALUES ($1,$2)', [username, password]);

		return true;
	} catch (err) {
		return false;
	}
}

const orderByQueryAscending = "SELECT * FROM %I ORDER BY %I ASC LIMIT %L OFFSET %L";
const orderByQueryDescending = "SELECT * FROM %I ORDER BY %I DESC LIMIT %L OFFSET %L";
const noOrderByQuery = "SELECT * FROM %I LIMIT %L OFFSET %L";
async function getTable(tableName, limit, offset, orderBy, ascending) {
	try {
		if (orderBy != "" && (!!orderBy)) {
			if (ascending)
				return await connectionPool.query(format(orderByQueryAscending, tableName, orderBy, limit, offset));
			else
				return await connectionPool.query(format(orderByQueryDescending, tableName, orderBy, limit, offset));
		} else {
			return await connectionPool.query(format(noOrderByQuery, tableName, limit, offset));
		}
	} catch (err) {
		return null;
	}
}

const getCountQuery = "SELECT COUNT(*) FROM %I";
async function getEntryCount(tableName) {
	try {
		return await (await connectionPool.query(format(getCountQuery, tableName))).rows[0].count;
	} catch (err) {
		return null;
	}
}

const equalityConditional = "%I=%L AND ";
function generateSQLEqualityCheckFromObject(rowIdentifiers) {
	let currentEqualityConditional = " WHERE ";
	for (const [key, value] of Object.entries(rowIdentifiers)) {
		currentEqualityConditional += format(equalityConditional, key, value); 
	}
	if (currentEqualityConditional.endsWith("AND ")) {
		currentEqualityConditional = currentEqualityConditional.substring(0, currentEqualityConditional.length - 4);
	}

	return currentEqualityConditional;
}

function generateValueArrayString(values, formatTemplate) {
	let currentArrayString = "("
	values.forEach(element => {
		currentArrayString += format(formatTemplate, element) + ","
	});
	if (currentArrayString.endsWith(",")) {
		currentArrayString = currentArrayString.substring(0, currentArrayString.length - 1);
	}
	currentArrayString += ")"
	return currentArrayString;
}

const setString = "%I=%L,";
function generateSetString(values) {
	let currentSetString = "SET ";
	for (const [key, value] of Object.entries(values)) {
		currentSetString += format(setString, key, value); 
	}
	if (currentSetString.endsWith(",")) {
		currentSetString = currentSetString.substring(0, currentSetString.length - 1);
	}

	return currentSetString;
}

const deleteRowPartialQuery = "DELETE FROM %I "
async function deleteRow(tableName, rowIdentifiers) {
	try {
		const deleteRowQuery = format(deleteRowPartialQuery, tableName) + generateSQLEqualityCheckFromObject(rowIdentifiers);
		await connectionPool.query(deleteRowQuery);

		return true;
	} catch (err) {
		return false;
	}
}

const createRowPartialQuery = "INSERT INTO %I"
async function createRow(tableName, values) {
	try {
		const keys = Object.keys(values);
		const objectValues = Object.values(values);

		const keyString = generateValueArrayString(keys, "%I");
		const valueString = generateValueArrayString(objectValues, "%L");

		const createRowQuery = format(createRowPartialQuery, tableName) + " " + keyString + " VALUES " + valueString;

		await connectionPool.query(createRowQuery);

		return true;
	} catch (err) {
		return false;
	} 
}

const modifyRowPartialQuery = "UPDATE %I "
async function modifyRow(tableName, rowIdentifiers, newValues) {
	try {
		const conditional = generateSQLEqualityCheckFromObject(rowIdentifiers);
		const setter = generateSetString(newValues);
		const modifyRowQuery = format(modifyRowPartialQuery, tableName) + setter + conditional;

		await connectionPool.query(modifyRowQuery);

		return true;
	} catch (err) {
		return false;
	}
}

const getRowsPartialQuery = "SELECT * FROM %I "
async function getRows(tableName, searchValue) {
	try {
		const getRowsQuery = format(getRowsPartialQuery, tableName) + generateSQLEqualityCheckFromObject(rowIdentifiers);
		return await connectionPool.query(getRowsQuery);

	} catch (err) {
		return null;
	}
}

module.exports = { getUserPassword, signupUser, getTable, getEntryCount, deleteRow, createRow, modifyRow, getRows };
