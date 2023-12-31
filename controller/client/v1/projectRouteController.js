/**
 * projectRouteController.js
 * @description :: exports action methods for projectRoute.
 */

const ProjectRoute = require('../../../model/projectRoute');
const projectRouteSchemaKey = require('../../../utils/validation/projectRouteValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

/**
 * @description : create record of ProjectRoute in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created ProjectRoute. {status, message, data}
 */ 
const addProjectRoute = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      projectRouteSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdProjectRoute = await dbService.createOne(ProjectRoute,dataToCreate);
    return  res.success({ data :createdProjectRoute });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of ProjectRoute in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created ProjectRoutes. {status, message, data}
 */
const bulkInsertProjectRoute = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdProjectRoute = await dbService.createMany(ProjectRoute,dataToCreate); 
      return  res.success({ data :{ count :createdProjectRoute.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of ProjectRoute from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found ProjectRoute(s). {status, message, data}
 */
const findAllProjectRoute = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundProjectRoute;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      projectRouteSchemaKey.findFilterKeys,
      ProjectRoute.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundProjectRoute = await dbService.count(ProjectRoute, query);
      if (!foundProjectRoute) {
        return res.recordNotFound();
      } 
      foundProjectRoute = { totalRecords: foundProjectRoute };
      return res.success({ data :foundProjectRoute });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundProjectRoute = await dbService.paginate( ProjectRoute,query,options);
    if (!foundProjectRoute){
      return res.recordNotFound();
    }
    return res.success({ data:foundProjectRoute }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of ProjectRoute from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found ProjectRoute. {status, message, data}
 */
const getProjectRoute = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundProjectRoute = await dbService.findOne(ProjectRoute,{ id :id });
    if (!foundProjectRoute){
      return res.recordNotFound();
    }
    return  res.success({ data :foundProjectRoute });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of ProjectRoute.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getProjectRouteCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      projectRouteSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedProjectRoute = await dbService.count(ProjectRoute,where);
    if (!countedProjectRoute){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedProjectRoute } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of ProjectRoute with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated ProjectRoute.
 * @return {Object} : updated ProjectRoute. {status, message, data}
 */
const updateProjectRoute = async (req, res) => {
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
      projectRouteSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedProjectRoute = await dbService.update(ProjectRoute,query,dataToUpdate);
    return  res.success({ data :updatedProjectRoute }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of ProjectRoute with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated ProjectRoutes.
 * @return {Object} : updated ProjectRoutes. {status, message, data}
 */
const bulkUpdateProjectRoute = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedProjectRoute = await dbService.update(ProjectRoute,filter,dataToUpdate);
    if (!updatedProjectRoute){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedProjectRoute.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of ProjectRoute with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated ProjectRoute.
 * @return {Object} : updated ProjectRoute. {status, message, data}
 */
const partialUpdateProjectRoute = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      projectRouteSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedProjectRoute = await dbService.update(ProjectRoute, query, dataToUpdate);
    if (!updatedProjectRoute) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedProjectRoute });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of ProjectRoute from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of ProjectRoute.
 * @return {Object} : deactivated ProjectRoute. {status, message, data}
 */
const softDeleteProjectRoute = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedProjectRoute = await deleteDependentService.softDeleteProjectRoute(query, updateBody);
    if (!updatedProjectRoute){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedProjectRoute });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of ProjectRoute from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted ProjectRoute. {status, message, data}
 */
const deleteProjectRoute = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedProjectRoute = await deleteDependentService.countProjectRoute(query);
      if (!countedProjectRoute){
        return res.recordNotFound();
      }
      return res.success({ data :countedProjectRoute });
    }
    let deletedProjectRoute = await deleteDependentService.deleteUser(query);
    if (!deletedProjectRoute){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedProjectRoute });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of ProjectRoute in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyProjectRoute = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedProjectRoute = await deleteDependentService.countProjectRoute(query);
      if (!countedProjectRoute) {
        return res.recordNotFound();
      }
      return res.success({ data: countedProjectRoute });            
    }
    let deletedProjectRoute = await deleteDependentService.deleteProjectRoute(query);
    if (!deletedProjectRoute) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedProjectRoute });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of ProjectRoute from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of ProjectRoute.
 * @return {Object} : number of deactivated documents of ProjectRoute. {status, message, data}
 */
const softDeleteManyProjectRoute = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    if (!req.params || !req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }            
    query = { id:{ $in:dataToUpdate.ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedProjectRoute = await deleteDependentService.softDeleteProjectRoute(query, updateBody);
    if (!updatedProjectRoute) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedProjectRoute });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addProjectRoute,
  bulkInsertProjectRoute,
  findAllProjectRoute,
  getProjectRoute,
  getProjectRouteCount,
  updateProjectRoute,
  bulkUpdateProjectRoute,
  partialUpdateProjectRoute,
  softDeleteProjectRoute,
  deleteProjectRoute,
  deleteManyProjectRoute,
  softDeleteManyProjectRoute,
};
