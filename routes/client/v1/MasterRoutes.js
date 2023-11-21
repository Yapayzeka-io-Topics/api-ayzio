/**
 * MasterRoutes.js
 * @description :: CRUD API routes for Master
 */

const express = require('express');
const router = express.Router();
const MasterController = require('../../../controller/client/v1/MasterController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/master/create').post(auth(PLATFORM.CLIENT),checkRolePermission,MasterController.addMaster);
router.route('/client/api/v1/master/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,MasterController.bulkInsertMaster);
router.route('/client/api/v1/master/list').post(auth(PLATFORM.CLIENT),checkRolePermission,MasterController.findAllMaster);
router.route('/client/api/v1/master/count').post(auth(PLATFORM.CLIENT),checkRolePermission,MasterController.getMasterCount);
router.route('/client/api/v1/master/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,MasterController.getMaster);
router.route('/client/api/v1/master/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,MasterController.updateMaster);    
router.route('/client/api/v1/master/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,MasterController.partialUpdateMaster);
router.route('/client/api/v1/master/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,MasterController.bulkUpdateMaster);
router.route('/client/api/v1/master/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,MasterController.softDeleteMaster);
router.route('/client/api/v1/master/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,MasterController.softDeleteManyMaster);
router.route('/client/api/v1/master/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,MasterController.deleteMaster);
router.route('/client/api/v1/master/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,MasterController.deleteManyMaster);

module.exports = router;
