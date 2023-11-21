/**
 * TaskRoutes.js
 * @description :: CRUD API routes for Task
 */

const express = require('express');
const router = express.Router();
const TaskController = require('../../../controller/client/v1/TaskController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/task/create').post(auth(PLATFORM.CLIENT),checkRolePermission,TaskController.addTask);
router.route('/client/api/v1/task/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,TaskController.bulkInsertTask);
router.route('/client/api/v1/task/list').post(auth(PLATFORM.CLIENT),checkRolePermission,TaskController.findAllTask);
router.route('/client/api/v1/task/count').post(auth(PLATFORM.CLIENT),checkRolePermission,TaskController.getTaskCount);
router.route('/client/api/v1/task/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,TaskController.getTask);
router.route('/client/api/v1/task/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,TaskController.updateTask);    
router.route('/client/api/v1/task/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,TaskController.partialUpdateTask);
router.route('/client/api/v1/task/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,TaskController.bulkUpdateTask);
router.route('/client/api/v1/task/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,TaskController.softDeleteTask);
router.route('/client/api/v1/task/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,TaskController.softDeleteManyTask);
router.route('/client/api/v1/task/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,TaskController.deleteTask);
router.route('/client/api/v1/task/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,TaskController.deleteManyTask);

module.exports = router;
