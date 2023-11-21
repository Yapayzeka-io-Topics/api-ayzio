/**
 * patientRoutes.js
 * @description :: CRUD API routes for patient
 */

const express = require('express');
const router = express.Router();
const patientController = require('../../../controller/client/v1/patientController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/patient/create').post(auth(PLATFORM.CLIENT),checkRolePermission,patientController.addPatient);
router.route('/client/api/v1/patient/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,patientController.bulkInsertPatient);
router.route('/client/api/v1/patient/list').post(auth(PLATFORM.CLIENT),checkRolePermission,patientController.findAllPatient);
router.route('/client/api/v1/patient/count').post(auth(PLATFORM.CLIENT),checkRolePermission,patientController.getPatientCount);
router.route('/client/api/v1/patient/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,patientController.getPatient);
router.route('/client/api/v1/patient/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,patientController.updatePatient);    
router.route('/client/api/v1/patient/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,patientController.partialUpdatePatient);
router.route('/client/api/v1/patient/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,patientController.bulkUpdatePatient);
router.route('/client/api/v1/patient/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,patientController.softDeletePatient);
router.route('/client/api/v1/patient/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,patientController.softDeleteManyPatient);
router.route('/client/api/v1/patient/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,patientController.deletePatient);
router.route('/client/api/v1/patient/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,patientController.deleteManyPatient);

module.exports = router;
