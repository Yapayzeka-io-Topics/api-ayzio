/**
 * index route file of device platform.
 * @description: exports all routes of device platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./CommentRoutes'));
router.use(require('./patientRoutes'));
router.use(require('./Appointment_scheduleRoutes'));
router.use(require('./ToDoRoutes'));
router.use(require('./Appointment_slotRoutes'));
router.use(require('./BlogRoutes'));
router.use(require('./departmentsRoutes'));
router.use(require('./orderItemRoutes'));
router.use(require('./TaskRoutes'));
router.use(require('./EventRoutes'));
router.use(require('./MasterRoutes'));
router.use(require('./enterpriseRoutes'));
router.use(require('./encounterRoutes'));
router.use(require('./CustomerRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./Chat_groupRoutes'));
router.use(require('./userRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./taskRoutes'));
router.use(require('./tagRoutes'));
router.use(require('./task_tagRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
