/**
 * encounterRoutes.js
 * @description :: CRUD API routes for encounter
 */

const express = require('express');
const router = express.Router();
const encounterController = require('../../../controller/client/v1/encounterController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/encounter/create').post(auth(PLATFORM.CLIENT),checkRolePermission,encounterController.addEncounter);
router.route('/client/api/v1/encounter/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,encounterController.bulkInsertEncounter);
router.route('/client/api/v1/encounter/list').post(auth(PLATFORM.CLIENT),checkRolePermission,encounterController.findAllEncounter);
router.route('/client/api/v1/encounter/count').post(auth(PLATFORM.CLIENT),checkRolePermission,encounterController.getEncounterCount);
router.route('/client/api/v1/encounter/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,encounterController.getEncounter);
router.route('/client/api/v1/encounter/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,encounterController.updateEncounter);    
router.route('/client/api/v1/encounter/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,encounterController.partialUpdateEncounter);
router.route('/client/api/v1/encounter/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,encounterController.bulkUpdateEncounter);
router.route('/client/api/v1/encounter/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,encounterController.softDeleteEncounter);
router.route('/client/api/v1/encounter/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,encounterController.softDeleteManyEncounter);
router.route('/client/api/v1/encounter/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,encounterController.deleteEncounter);
router.route('/client/api/v1/encounter/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,encounterController.deleteManyEncounter);

module.exports = router;
