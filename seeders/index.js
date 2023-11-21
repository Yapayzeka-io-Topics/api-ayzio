/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */
const model = require('../model');
const dbService = require('../utils/dbService');
const bcrypt = require('bcrypt');
const authConstant = require('../constants/authConstant');
const { replaceAll } = require('../utils/common');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = await dbService.findOne(model.user,{ 'username':'Neva.Parisian' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'Tv13D1DJPuuIiDl',
        'isDeleted':false,
        'username':'Neva.Parisian',
        'email':'Althea97@yahoo.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'Tv13D1DJPuuIiDl',
        'isDeleted':false,
        'username':'Neva.Parisian',
        'email':'Althea97@yahoo.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'username':'Neva.Parisian' }, userToBeInserted);
    }
    userToBeInserted = await dbService.findOne(model.user,{ 'username':'Sadye.Howe' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'UDBzIdVgg_E3CLw',
        'isDeleted':false,
        'username':'Sadye.Howe',
        'email':'Deon49@hotmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'UDBzIdVgg_E3CLw',
        'isDeleted':false,
        'username':'Sadye.Howe',
        'email':'Deon49@hotmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'username':'Sadye.Howe' }, userToBeInserted);
    }
    console.info('User model seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
  
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'musteri', 'admin', 'User', 'System_User' ];
    const insertedRoles = await dbService.findAll(model.role, { code: { $in: roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.createMany(model.role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes) {
      let routeName = '';
      const dbRoutes = await dbService.findAll(model.projectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.createMany(model.projectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/device/api/v1/appointment_schedule/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_schedule/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_schedule/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_schedule/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_schedule/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/device/api/v1/appointment_schedule/:id',
        role: 'admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/appointment_schedule/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/appointment_schedule/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/appointment_schedule/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_schedule/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_schedule/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_schedule/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_schedule/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_schedule/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_schedule/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_schedule/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_schedule/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_schedule/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_schedule/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_schedule/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_schedule/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_schedule/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_schedule/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_schedule/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_schedule/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_schedule/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_schedule/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/appointment_schedule/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/appointment_schedule/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_schedule/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_slot/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_slot/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_slot/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_slot/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_slot/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/device/api/v1/appointment_slot/:id',
        role: 'admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/appointment_slot/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/appointment_slot/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/appointment_slot/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_slot/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_slot/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_slot/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_slot/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_slot/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_slot/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_slot/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_slot/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_slot/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_slot/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_slot/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_slot/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_slot/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_slot/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_slot/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_slot/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_slot/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment_slot/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/appointment_slot/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/appointment_slot/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment_slot/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/create',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/addbulk',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blog/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/create',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/addbulk',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdelete/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdeletemany',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/delete/:id',
        role: 'musteri',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_group/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_group/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_group/deletemany',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdelete/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdeletemany',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/delete/:id',
        role: 'musteri',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_message/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_message/deletemany',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/comment/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/comment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/comment/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/comment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/comment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/comment/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/customer/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/device/api/v1/customer/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/customer/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/customer/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/customer/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/customer/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/customer/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/list',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/event/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/event/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/event/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/event/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/create',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/event/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/event/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/master/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/master/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/master/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/master/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/master/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/master/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/master/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/master/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/master/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/master/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/master/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/master/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/list',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/task/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/task/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/task/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/task/count',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/create',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/addbulk',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/task/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/task/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/todo/list',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/todo/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/todo/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/todo/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/todo/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/todo/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/todo/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/todo/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/todo/count',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/todo/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/todo/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/todo/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/todo/create',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/todo/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/todo/addbulk',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/todo/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/todo/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/todo/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/todo/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/todo/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/todo/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/todo/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/todo/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/todo/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/todo/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/todo/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/todo/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/todo/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/todo/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/todo/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/device/api/v1/category/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/category/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/category/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/category/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/device/api/v1/departments/:id',
        role: 'admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/departments/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/departments/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/departments/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/departments/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/departments/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/encounter/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/encounter/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/encounter/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/encounter/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/encounter/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/device/api/v1/encounter/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/encounter/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/encounter/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/encounter/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/encounter/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/encounter/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/encounter/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/encounter/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/encounter/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/encounter/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/encounter/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/encounter/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/encounter/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/encounter/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/encounter/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/encounter/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/encounter/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/encounter/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/encounter/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/encounter/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/encounter/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/encounter/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/encounter/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/encounter/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/encounter/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/device/api/v1/enterprise/:id',
        role: 'admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/enterprise/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/enterprise/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/enterprise/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enterprise/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enterprise/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enterprise/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enterprise/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enterprise/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enterprise/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enterprise/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enterprise/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enterprise/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enterprise/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/enterprise/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/enterprise/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/device/api/v1/orderitem/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/orderitem/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/orderitem/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/orderitem/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/orderitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/orderitem/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patient/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patient/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/patient/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/patient/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patient/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/patient/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/patient/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/patient/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/patient/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patient/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patient/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/patient/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patient/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patient/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patient/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patient/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patient/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patient/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patient/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patient/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patient/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patient/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patient/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patient/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patient/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patient/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patient/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/patient/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/patient/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patient/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tag/list',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tag/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tag/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tag/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tag/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/tag/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/tag/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/tag/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/tag/count',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tag/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tag/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tag/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tag/create',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tag/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tag/addbulk',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tag/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tag/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tag/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tag/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tag/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tag/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tag/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tag/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tag/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tag/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tag/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tag/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/tag/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/tag/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tag/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/list',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/task/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/task/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/task/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/task/count',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/create',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/addbulk',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/task/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/task/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/task_tag/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/device/api/v1/task_tag/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/task_tag/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/task_tag/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/task_tag/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task_tag/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task_tag/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task_tag/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task_tag/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task_tag/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task_tag/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task_tag/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task_tag/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task_tag/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task_tag/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/task_tag/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/task_tag/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'musteri',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_schedule/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_schedule/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_schedule/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_schedule/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_schedule/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/client/api/v1/appointment_schedule/:id',
        role: 'admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/appointment_schedule/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/appointment_schedule/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/appointment_schedule/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_schedule/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_schedule/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_schedule/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_schedule/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_schedule/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_schedule/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_schedule/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_schedule/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_schedule/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_schedule/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_schedule/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_schedule/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_schedule/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_schedule/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_schedule/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_schedule/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_schedule/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_schedule/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/appointment_schedule/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/appointment_schedule/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_schedule/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_slot/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_slot/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_slot/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_slot/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_slot/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/client/api/v1/appointment_slot/:id',
        role: 'admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/appointment_slot/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/appointment_slot/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/appointment_slot/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_slot/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_slot/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_slot/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_slot/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_slot/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_slot/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_slot/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_slot/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_slot/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_slot/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_slot/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_slot/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_slot/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_slot/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_slot/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_slot/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_slot/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/appointment_slot/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/appointment_slot/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/appointment_slot/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/appointment_slot/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/list',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/blog/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/blog/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/blog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/blog/count',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/create',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/addbulk',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/blog/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/create',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/addbulk',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/update/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/partial-update/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/updatebulk',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdelete/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdeletemany',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/delete/:id',
        role: 'musteri',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_group/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_group/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_group/deletemany',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'musteri',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/comment/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/comment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/comment/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/comment/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/comment/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/comment/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/comment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/comment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/comment/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/customer/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/client/api/v1/customer/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/customer/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/customer/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/customer/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/customer/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/customer/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/event/list',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/event/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/event/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/event/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/event/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/event/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/event/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/event/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/event/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/event/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/event/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/event/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/event/create',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/event/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/event/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/event/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/event/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/event/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/event/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/event/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/event/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/event/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/event/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/event/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/event/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/event/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/event/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/event/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/event/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/event/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/master/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/master/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/master/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/master/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/master/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/master/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/master/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/master/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/master/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/master/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/master/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/master/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/master/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/master/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/master/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/master/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/master/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/master/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/master/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/master/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/master/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/master/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/master/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/master/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/master/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/master/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/master/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/master/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/master/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/master/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/list',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/task/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/task/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/task/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/task/count',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/create',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/addbulk',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/task/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/task/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/todo/list',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/todo/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/todo/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/todo/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/todo/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/todo/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/todo/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/todo/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/todo/count',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/todo/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/todo/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/todo/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/todo/create',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/todo/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/todo/addbulk',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/todo/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/todo/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/todo/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/todo/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/todo/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/todo/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/todo/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/todo/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/todo/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/todo/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/todo/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/todo/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/todo/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/todo/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/todo/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/category/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/client/api/v1/departments/:id',
        role: 'admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/departments/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/departments/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/departments/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/departments/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/departments/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/encounter/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/encounter/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/encounter/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/encounter/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/encounter/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/client/api/v1/encounter/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/encounter/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/encounter/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/encounter/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/encounter/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/encounter/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/encounter/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/encounter/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/encounter/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/encounter/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/encounter/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/encounter/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/encounter/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/encounter/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/encounter/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/encounter/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/encounter/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/encounter/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/encounter/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/encounter/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/encounter/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/encounter/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/encounter/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/encounter/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/encounter/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/client/api/v1/enterprise/:id',
        role: 'admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/enterprise/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/enterprise/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/enterprise/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enterprise/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enterprise/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enterprise/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enterprise/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enterprise/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enterprise/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enterprise/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enterprise/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enterprise/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enterprise/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/enterprise/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/enterprise/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/client/api/v1/orderitem/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/orderitem/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/orderitem/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/orderitem/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/orderitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/orderitem/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patient/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patient/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/patient/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/patient/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patient/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/patient/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/patient/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/patient/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/patient/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patient/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patient/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/patient/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patient/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patient/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patient/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patient/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patient/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patient/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patient/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patient/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patient/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patient/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patient/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patient/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patient/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patient/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patient/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/patient/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/patient/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patient/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tag/list',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tag/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tag/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tag/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tag/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/tag/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/tag/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/tag/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/tag/count',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tag/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tag/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tag/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tag/create',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tag/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tag/addbulk',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tag/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tag/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tag/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tag/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tag/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tag/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tag/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tag/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tag/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tag/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tag/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tag/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/tag/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/tag/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tag/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/list',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/task/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/task/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/task/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/task/count',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/create',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/addbulk',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/task/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/task/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/list',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/list',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/task_tag/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/:id',
        role: 'musteri',
        method: 'GET'
      },
      {
        route: '/client/api/v1/task_tag/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/task_tag/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/task_tag/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/task_tag/count',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/count',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/create',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/addbulk',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task_tag/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task_tag/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task_tag/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task_tag/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task_tag/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task_tag/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task_tag/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task_tag/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task_tag/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task_tag/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/task_tag/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/task_tag/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'musteri',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'musteri',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'musteri',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'musteri',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'musteri',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'musteri', 'admin', 'User', 'System_User' ];
      const insertedProjectRoute = await dbService.findAll(model.projectRoute, {
        uri: { $in: routes },
        method: { $in: routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findAll(model.role, {
        code: { $in: roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};
    
      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(model.routeRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.createMany(model.routeRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Neva.Parisian',
      'password':'Tv13D1DJPuuIiDl'
    },{
      'username':'Sadye.Howe',
      'password':'UDBzIdVgg_E3CLw'
    }];
    const defaultRoles = await dbService.findAll(model.role);
    const insertedUsers = await dbService.findAll(model.user, { username: { $in: userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN').id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER').id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER').id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(model.userRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.createMany(model.userRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('UserRole seeder failed due to ', error.message);
  }
}

/* calls of functions to seed mock data into multiple collections */
async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
};
module.exports = seedData;