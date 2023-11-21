/**
 * ToDoRoutes.js
 * @description :: CRUD API routes for ToDo
 */

const express = require('express');
const router = express.Router();
const ToDoController = require('../../../controller/client/v1/ToDoController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/todo/create').post(auth(PLATFORM.CLIENT),checkRolePermission,ToDoController.addToDo);
router.route('/client/api/v1/todo/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,ToDoController.bulkInsertToDo);
router.route('/client/api/v1/todo/list').post(auth(PLATFORM.CLIENT),checkRolePermission,ToDoController.findAllToDo);
router.route('/client/api/v1/todo/count').post(auth(PLATFORM.CLIENT),checkRolePermission,ToDoController.getToDoCount);
router.route('/client/api/v1/todo/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,ToDoController.getToDo);
router.route('/client/api/v1/todo/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ToDoController.updateToDo);    
router.route('/client/api/v1/todo/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ToDoController.partialUpdateToDo);
router.route('/client/api/v1/todo/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,ToDoController.bulkUpdateToDo);
router.route('/client/api/v1/todo/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ToDoController.softDeleteToDo);
router.route('/client/api/v1/todo/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,ToDoController.softDeleteManyToDo);
router.route('/client/api/v1/todo/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,ToDoController.deleteToDo);
router.route('/client/api/v1/todo/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,ToDoController.deleteManyToDo);

module.exports = router;
