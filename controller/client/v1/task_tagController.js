/**
 * task_tagController.js
 * @description :: exports action methods for task_tag.
 */

const Task_tag = require('../../../model/task_tag');
const task_tagSchemaKey = require('../../../utils/validation/task_tagValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Task_tag in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Task_tag. {status, message, data}
 */ 
const addTask_tag = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      task_tagSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdTask_tag = await dbService.createOne(Task_tag,dataToCreate);
    return  res.success({ data :createdTask_tag });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Task_tag in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Task_tags. {status, message, data}
 */
const bulkInsertTask_tag = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdTask_tag = await dbService.createMany(Task_tag,dataToCreate); 
      return  res.success({ data :{ count :createdTask_tag.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Task_tag from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Task_tag(s). {status, message, data}
 */
const findAllTask_tag = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundTask_tag;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      task_tagSchemaKey.findFilterKeys,
      Task_tag.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundTask_tag = await dbService.count(Task_tag, query);
      if (!foundTask_tag) {
        return res.recordNotFound();
      } 
      foundTask_tag = { totalRecords: foundTask_tag };
      return res.success({ data :foundTask_tag });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundTask_tag = await dbService.paginate( Task_tag,query,options);
    if (!foundTask_tag){
      return res.recordNotFound();
    }
    return res.success({ data:foundTask_tag }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Task_tag from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Task_tag. {status, message, data}
 */
const getTask_tag = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundTask_tag = await dbService.findOne(Task_tag,{ id :id });
    if (!foundTask_tag){
      return res.recordNotFound();
    }
    return  res.success({ data :foundTask_tag });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Task_tag.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getTask_tagCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      task_tagSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedTask_tag = await dbService.count(Task_tag,where);
    if (!countedTask_tag){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedTask_tag } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Task_tag with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Task_tag.
 * @return {Object} : updated Task_tag. {status, message, data}
 */
const updateTask_tag = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      task_tagSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedTask_tag = await dbService.update(Task_tag,query,dataToUpdate);
    return  res.success({ data :updatedTask_tag }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Task_tag with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Task_tags.
 * @return {Object} : updated Task_tags. {status, message, data}
 */
const bulkUpdateTask_tag = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedTask_tag = await dbService.update(Task_tag,filter,dataToUpdate);
    if (!updatedTask_tag){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedTask_tag.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Task_tag with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Task_tag.
 * @return {Object} : updated Task_tag. {status, message, data}
 */
const partialUpdateTask_tag = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      task_tagSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedTask_tag = await dbService.update(Task_tag, query, dataToUpdate);
    if (!updatedTask_tag) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedTask_tag });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Task_tag from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Task_tag.
 * @return {Object} : deactivated Task_tag. {status, message, data}
 */
const softDeleteTask_tag = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Task_tag, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Task_tag from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Task_tag. {status, message, data}
 */
const deleteTask_tag = async (req, res) => {
  const result = await dbService.deleteByPk(Task_tag, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Task_tag in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyTask_tag = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedTask_tag = await dbService.destroy(Task_tag,query);
    return res.success({ data :{ count :deletedTask_tag.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Task_tag from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Task_tag.
 * @return {Object} : number of deactivated documents of Task_tag. {status, message, data}
 */
const softDeleteManyTask_tag = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedTask_tag = await dbService.update(Task_tag,query,updateBody, options);
    if (!updatedTask_tag) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedTask_tag.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addTask_tag,
  bulkInsertTask_tag,
  findAllTask_tag,
  getTask_tag,
  getTask_tagCount,
  updateTask_tag,
  bulkUpdateTask_tag,
  partialUpdateTask_tag,
  softDeleteTask_tag,
  deleteTask_tag,
  deleteManyTask_tag,
  softDeleteManyTask_tag,
};
