const pg = require('pg');
const tdaURI = "postgres://vdoxbxjaqxnsno:999f2f2993e7b8b9a34de8602571741c122cd539e136ad5d981b6a773b86dd5a@ec2-52-214-178-113.eu-west-1.compute.amazonaws.com:5432/ddghcl0kmg4ejf";
const connstring = process.env.DATABASE_URL || tdaURI;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl: { rejectUnauthorized: false }
});

// database methods ---------------------------
let databaseMethods = {}; //create empty object

// ----------------------------
databaseMethods.getAllLists = function() {
    let sql = "SELECT * FROM todoapp";
    return pool.query(sql); //return the promise
}

// ----------------------------
databaseMethods.createLists = function(heading, listtext, userid) {
    let sql = "INSERT INTO todoapp (id, date, heading, listtext, userid) VALUES(DEFAULT, DEFAULT, $1, $2, $3) returning*";
    let values = [heading, listtext, userid];
    return pool.query(sql, values); //return the promise
}

// ----------------------------
databaseMethods.deleteLists = function(id, userid) {
    let sql = "DELETE FROM todoapp WHERE id = $1 AND userid = $2 RETURNING*";
    let values = [id, userid];
    return pool.query(sql, values); //return the promise
}

// Users -----------------------

databaseMethods.getAllUsers = function(){
    let sql = "SELECT id, username FROM users";
    return pool.query(sql); //return the promise
}

//-------------------------------
databaseMethods.getUser = function(username) {
    let sql = "SELECT * FROM users WHERE username = $1";
    let values = [username];
    return pool.query(sql,values); //return the promise
}

//-------------------------------
databaseMethods.createUser = function(username, password, salt){
    let sql = "INSERT INTO users (id, username, password, salt) VALUES(DEFAULT, $1, $2, $3) returning *";
    let values = [username, password, salt];
    return pool.query(sql, values); //return the promise
}

//-------------------------------
databaseMethods.deleteUser = function(id) {
    let sql = "DELETE FROM users WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values); //return the promise 
}


// export databaseMethods ----------------------------
module.exports = databaseMethods;

