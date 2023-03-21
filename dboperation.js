var config = require("./dbconfig");
const sql = require("mssql");

async function getdata() {
  try {
    let pool = await sql.connect(config);
    console.log("sql server connected...");
  } catch (error) {
    console.log(" mathus-error :" + error);
  }
}

async function getdata_withQuery() {
  try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .query("SELECT *  FROM studentsInfo");
    return res.recordset;
  } catch (error) {
    console.log(" mathus-error :" + error);
  }
}

async function studentAPI(data){
  try{
    let pool = await sql.connect(config);
    let res = await pool.request()
      .input("JSON", sql.NVarChar, JSON.stringify(data))
      .execute("APIC_JCRUD_STUDENT")
    
      return res.recordsets
  }catch (error) {
    console.log(" mathus-error :" + error);
  }
}

async function getUser(email, password) {
  try{
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input("email", sql.NVarChar, email)
    .input("password", sql.NVarChar, password).query("SELECT * FROM studentsInfo where email  = @email and Number = @password  ");
    return res.recordset
  } catch (error) {
    console.log(" mathus-error :" + error);
  }
} 

async function getDropDownMaster(req){
  try {
    console.log(req.query.Key1+"  "+req.query.Key2)
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('key1', sql.NVarChar, req.query.Key1)
    .input('key2', sql.NVarChar, req.query.Key2)
    .execute('dropdownMaster');
    return res.recordsets
  } catch (error) {
    console.log(" mathus-error :" + error);
  }
}

async function ResourceWiseDailyTaskDetails(data){
  try{
    let pool = await sql.connect(config);
    let res = await pool.request()
      .input("JSON", sql.NVarChar, JSON.stringify(data))
      .execute("JCRUD_ResourceWiseDailyTaskDetails")
    
      return res.recordsets
  }catch (error) {
    console.log(" mathus-error :" + error);
  }
}

module.exports = {
  getdata: getdata,
  getdata_withQuery: getdata_withQuery,
  studentAPI:studentAPI,
  getUser: getUser,
  getDropDownMaster: getDropDownMaster,
  ResourceWiseDailyTaskDetails: ResourceWiseDailyTaskDetails
};
