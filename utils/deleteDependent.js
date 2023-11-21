/**
  * deleteDependent.js
  * @description :: exports deleteDependent service for project.
*/

let Comment = require("../model/Comment")
let Patient = require("../model/patient")
let Appointment_schedule = require("../model/Appointment_schedule")
let ToDo = require("../model/ToDo")
let Appointment_slot = require("../model/Appointment_slot")
let Blog = require("../model/Blog")
let Departments = require("../model/departments")
let OrderItem = require("../model/orderItem")
let Task = require("../model/Task")
let Event = require("../model/Event")
let Master = require("../model/Master")
let Enterprise = require("../model/enterprise")
let Encounter = require("../model/encounter")
let Customer = require("../model/Customer")
let Chat_message = require("../model/Chat_message")
let Chat_group = require("../model/Chat_group")
let User = require("../model/user")
let Category = require("../model/category")
let Task = require("../model/task")
let Tag = require("../model/tag")
let Task_tag = require("../model/task_tag")
let UserAuthSettings = require("../model/userAuthSettings")
let UserTokens = require("../model/userTokens")
let PushNotification = require("../model/pushNotification")
let Role = require("../model/role")
let ProjectRoute = require("../model/projectRoute")
let RouteRole = require("../model/routeRole")
let UserRole = require("../model/userRole")
let dbService = require(".//dbService");

const deleteComment = async (filter) =>{
    try{
            let comment = await dbService.findAll(Comment,filter);
            if(comment && comment.length){
                comment = comment.map((obj) => obj.id);


                const CommentFilter = {$or: [{parentItem : {$in : comment }}]}
                    const CommentCnt=await dbService.destroy(Comment,CommentFilter);

            let deleted  = await dbService.destroy(Comment,filter);
            let response = {Comment :CommentCnt.length,}
            return response; 
            }else{
                return {  comment : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deletePatient = async (filter) =>{
    try{
            let response  = await dbService.destroy(Patient,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteAppointment_schedule = async (filter) =>{
    try{
            let response  = await dbService.destroy(Appointment_schedule,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteToDo = async (filter) =>{
    try{
            let response  = await dbService.destroy(ToDo,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteAppointment_slot = async (filter) =>{
    try{
            let appointment_slot = await dbService.findAll(Appointment_slot,filter);
            if(appointment_slot && appointment_slot.length){
                appointment_slot = appointment_slot.map((obj) => obj.id);


                const Appointment_scheduleFilter = {$or: [{slot : {$in : appointment_slot }}]}
                    const Appointment_scheduleCnt=await dbService.destroy(Appointment_schedule,Appointment_scheduleFilter);

            let deleted  = await dbService.destroy(Appointment_slot,filter);
            let response = {Appointment_schedule :Appointment_scheduleCnt.length,}
            return response; 
            }else{
                return {  appointment_slot : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteBlog = async (filter) =>{
    try{
            let response  = await dbService.destroy(Blog,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteDepartments = async (filter) =>{
    try{
            let response  = await dbService.destroy(Departments,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteOrderItem = async (filter) =>{
    try{
            let response  = await dbService.destroy(OrderItem,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteTask = async (filter) =>{
    try{
            let response  = await dbService.destroy(Task,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteEvent = async (filter) =>{
    try{
            let response  = await dbService.destroy(Event,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteMaster = async (filter) =>{
    try{
            let master = await dbService.findAll(Master,filter);
            if(master && master.length){
                master = master.map((obj) => obj.id);


                const MasterFilter = {$or: [{parentId : {$in : master }}]}
                    const MasterCnt=await dbService.destroy(Master,MasterFilter);

            let deleted  = await dbService.destroy(Master,filter);
            let response = {Master :MasterCnt.length,}
            return response; 
            }else{
                return {  master : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteEnterprise = async (filter) =>{
    try{
            let enterprise = await dbService.findAll(Enterprise,filter);
            if(enterprise && enterprise.length){
                enterprise = enterprise.map((obj) => obj.id);


                const departmentsFilter = {$or: [{enterprises : {$in : enterprise }}]}
                    const departmentsCnt=await dbService.destroy(Departments,departmentsFilter);

            let deleted  = await dbService.destroy(Enterprise,filter);
            let response = {departments :departmentsCnt.length,}
            return response; 
            }else{
                return {  enterprise : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteEncounter = async (filter) =>{
    try{
            let response  = await dbService.destroy(Encounter,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteCustomer = async (filter) =>{
    try{
            let response  = await dbService.destroy(Customer,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteChat_message = async (filter) =>{
    try{
            let response  = await dbService.destroy(Chat_message,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteChat_group = async (filter) =>{
    try{
            let chat_group = await dbService.findAll(Chat_group,filter);
            if(chat_group && chat_group.length){
                chat_group = chat_group.map((obj) => obj.id);


                const Chat_messageFilter = {$or: [{groupId : {$in : chat_group }}]}
                    const Chat_messageCnt=await dbService.destroy(Chat_message,Chat_messageFilter);

            let deleted  = await dbService.destroy(Chat_group,filter);
            let response = {Chat_message :Chat_messageCnt.length,}
            return response; 
            }else{
                return {  chat_group : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteUser = async (filter) =>{
    try{
            let user = await dbService.findAll(User,filter);
            if(user && user.length){
                user = user.map((obj) => obj.id);


                const CommentFilter = {$or: [{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                    const CommentCnt=await dbService.destroy(Comment,CommentFilter);

                const patientFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const patientCnt=await dbService.destroy(Patient,patientFilter);

                const Appointment_scheduleFilter = {$or: [{host : {$in : user }},{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                    const Appointment_scheduleCnt=await dbService.destroy(Appointment_schedule,Appointment_scheduleFilter);

                const ToDoFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const ToDoCnt=await dbService.destroy(ToDo,ToDoFilter);

                const Appointment_slotFilter = {$or: [{userId : {$in : user }},{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                    const Appointment_slotCnt=await dbService.destroy(Appointment_slot,Appointment_slotFilter);

                const BlogFilter = {$or: [{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                    const BlogCnt=await dbService.destroy(Blog,BlogFilter);

                const departmentsFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const departmentsCnt=await dbService.destroy(Departments,departmentsFilter);

                const orderItemFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const orderItemCnt=await dbService.destroy(OrderItem,orderItemFilter);

                const TaskFilter = {$or: [{completedBy : {$in : user }},{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                    const TaskCnt=await dbService.destroy(Task,TaskFilter);

                const EventFilter = {$or: [{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                    const EventCnt=await dbService.destroy(Event,EventFilter);

                const MasterFilter = {$or: [{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                    const MasterCnt=await dbService.destroy(Master,MasterFilter);

                const enterpriseFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const enterpriseCnt=await dbService.destroy(Enterprise,enterpriseFilter);

                const encounterFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const encounterCnt=await dbService.destroy(Encounter,encounterFilter);

                const CustomerFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const CustomerCnt=await dbService.destroy(Customer,CustomerFilter);

                const Chat_messageFilter = {$or: [{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                    const Chat_messageCnt=await dbService.destroy(Chat_message,Chat_messageFilter);

                const Chat_groupFilter = {$or: [{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                    const Chat_groupCnt=await dbService.destroy(Chat_group,Chat_groupFilter);

                const userFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const userCnt=await dbService.destroy(User,userFilter);

                const categoryFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const categoryCnt=await dbService.destroy(Category,categoryFilter);

                const taskFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const taskCnt=await dbService.destroy(Task,taskFilter);

                const tagFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const tagCnt=await dbService.destroy(Tag,tagFilter);

                const task_tagFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const task_tagCnt=await dbService.destroy(Task_tag,task_tagFilter);

                const userAuthSettingsFilter = {$or: [{userId : {$in : user }},{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const userAuthSettingsCnt=await dbService.destroy(UserAuthSettings,userAuthSettingsFilter);

                const userTokensFilter = {$or: [{userId : {$in : user }},{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                    const userTokensCnt=await dbService.destroy(UserTokens,userTokensFilter);

                const userRoleFilter = {$or: [{userId : {$in : user }}]}
                    const userRoleCnt=await dbService.destroy(UserRole,userRoleFilter);

            let deleted  = await dbService.destroy(User,filter);
            let response = {Comment :CommentCnt.length,patient :patientCnt.length,Appointment_schedule :Appointment_scheduleCnt.length,ToDo :ToDoCnt.length,Appointment_slot :Appointment_slotCnt.length,Blog :BlogCnt.length,departments :departmentsCnt.length,orderItem :orderItemCnt.length,Task :TaskCnt.length,Event :EventCnt.length,Master :MasterCnt.length,enterprise :enterpriseCnt.length,encounter :encounterCnt.length,Customer :CustomerCnt.length,Chat_message :Chat_messageCnt.length,Chat_group :Chat_groupCnt.length,user :userCnt.length + deleted.length,category :categoryCnt.length,task :taskCnt.length,tag :tagCnt.length,task_tag :task_tagCnt.length,userAuthSettings :userAuthSettingsCnt.length,userTokens :userTokensCnt.length,userRole :userRoleCnt.length,}
            return response; 
            }else{
                return {  user : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteCategory = async (filter) =>{
    try{
            let category = await dbService.findAll(Category,filter);
            if(category && category.length){
                category = category.map((obj) => obj.id);


                const categoryFilter = {$or: [{parentId : {$in : category }}]}
                    const categoryCnt=await dbService.destroy(Category,categoryFilter);

                const taskFilter = {$or: [{categoryId : {$in : category }}]}
                    const taskCnt=await dbService.destroy(Task,taskFilter);

            let deleted  = await dbService.destroy(Category,filter);
            let response = {category :categoryCnt.length + deleted.length,task :taskCnt.length,}
            return response; 
            }else{
                return {  category : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteTask = async (filter) =>{
    try{
            let task = await dbService.findAll(Task,filter);
            if(task && task.length){
                task = task.map((obj) => obj.id);


                const taskFilter = {$or: [{parentId : {$in : task }}]}
                    const taskCnt=await dbService.destroy(Task,taskFilter);

                const task_tagFilter = {$or: [{taskId : {$in : task }}]}
                    const task_tagCnt=await dbService.destroy(Task_tag,task_tagFilter);

            let deleted  = await dbService.destroy(Task,filter);
            let response = {task :taskCnt.length + deleted.length,task_tag :task_tagCnt.length,}
            return response; 
            }else{
                return {  task : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteTag = async (filter) =>{
    try{
            let tag = await dbService.findAll(Tag,filter);
            if(tag && tag.length){
                tag = tag.map((obj) => obj.id);


                const task_tagFilter = {$or: [{tagId : {$in : tag }}]}
                    const task_tagCnt=await dbService.destroy(Task_tag,task_tagFilter);

            let deleted  = await dbService.destroy(Tag,filter);
            let response = {task_tag :task_tagCnt.length,}
            return response; 
            }else{
                return {  tag : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteTask_tag = async (filter) =>{
    try{
            let response  = await dbService.destroy(Task_tag,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteUserAuthSettings = async (filter) =>{
    try{
            let response  = await dbService.destroy(UserAuthSettings,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteUserTokens = async (filter) =>{
    try{
            let response  = await dbService.destroy(UserTokens,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deletePushNotification = async (filter) =>{
    try{
            let response  = await dbService.destroy(PushNotification,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteRole = async (filter) =>{
    try{
            let role = await dbService.findAll(Role,filter);
            if(role && role.length){
                role = role.map((obj) => obj.id);


                const routeRoleFilter = {$or: [{roleId : {$in : role }}]}
                    const routeRoleCnt=await dbService.destroy(RouteRole,routeRoleFilter);

                const userRoleFilter = {$or: [{roleId : {$in : role }}]}
                    const userRoleCnt=await dbService.destroy(UserRole,userRoleFilter);

            let deleted  = await dbService.destroy(Role,filter);
            let response = {routeRole :routeRoleCnt.length,userRole :userRoleCnt.length,}
            return response; 
            }else{
                return {  role : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteProjectRoute = async (filter) =>{
    try{
            let projectroute = await dbService.findAll(ProjectRoute,filter);
            if(projectroute && projectroute.length){
                projectroute = projectroute.map((obj) => obj.id);


                const routeRoleFilter = {$or: [{routeId : {$in : projectroute }}]}
                    const routeRoleCnt=await dbService.destroy(RouteRole,routeRoleFilter);

            let deleted  = await dbService.destroy(ProjectRoute,filter);
            let response = {routeRole :routeRoleCnt.length,}
            return response; 
            }else{
                return {  projectroute : 0}
            }

    }catch(error){
        throw new Error(error.message);
    }
}

const deleteRouteRole = async (filter) =>{
    try{
            let response  = await dbService.destroy(RouteRole,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const deleteUserRole = async (filter) =>{
    try{
            let response  = await dbService.destroy(UserRole,filter);
            return response;
    }catch(error){
        throw new Error(error.message);
    }
}

const countComment = async (filter) =>{
    try{
        let comment = await dbService.findAll(Comment,filter);
        if(comment && comment.length){
            comment = comment.map((obj) => obj.id);

                const CommentFilter = {$or: [{parentItem : {$in : comment }}]}
                     const CommentCnt =  await dbService.count(Comment,CommentFilter);

            let response = {Comment : CommentCnt,}
            return response; 
        }else{
            return {  comment : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countPatient = async (filter) =>{
    try{
        const patientCnt =  await dbService.count(Patient,filter);
        return {patient : patientCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countAppointment_schedule = async (filter) =>{
    try{
        const Appointment_scheduleCnt =  await dbService.count(Appointment_schedule,filter);
        return {Appointment_schedule : Appointment_scheduleCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countToDo = async (filter) =>{
    try{
        const ToDoCnt =  await dbService.count(ToDo,filter);
        return {ToDo : ToDoCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countAppointment_slot = async (filter) =>{
    try{
        let appointment_slot = await dbService.findAll(Appointment_slot,filter);
        if(appointment_slot && appointment_slot.length){
            appointment_slot = appointment_slot.map((obj) => obj.id);

                const Appointment_scheduleFilter = {$or: [{slot : {$in : appointment_slot }}]}
                     const Appointment_scheduleCnt =  await dbService.count(Appointment_schedule,Appointment_scheduleFilter);

            let response = {Appointment_schedule : Appointment_scheduleCnt,}
            return response; 
        }else{
            return {  appointment_slot : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countBlog = async (filter) =>{
    try{
        const BlogCnt =  await dbService.count(Blog,filter);
        return {Blog : BlogCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countDepartments = async (filter) =>{
    try{
        const departmentsCnt =  await dbService.count(Departments,filter);
        return {departments : departmentsCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countOrderItem = async (filter) =>{
    try{
        const orderItemCnt =  await dbService.count(OrderItem,filter);
        return {orderItem : orderItemCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countTask = async (filter) =>{
    try{
        const TaskCnt =  await dbService.count(Task,filter);
        return {Task : TaskCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countEvent = async (filter) =>{
    try{
        const EventCnt =  await dbService.count(Event,filter);
        return {Event : EventCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countMaster = async (filter) =>{
    try{
        let master = await dbService.findAll(Master,filter);
        if(master && master.length){
            master = master.map((obj) => obj.id);

                const MasterFilter = {$or: [{parentId : {$in : master }}]}
                     const MasterCnt =  await dbService.count(Master,MasterFilter);

            let response = {Master : MasterCnt,}
            return response; 
        }else{
            return {  master : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countEnterprise = async (filter) =>{
    try{
        let enterprise = await dbService.findAll(Enterprise,filter);
        if(enterprise && enterprise.length){
            enterprise = enterprise.map((obj) => obj.id);

                const departmentsFilter = {$or: [{enterprises : {$in : enterprise }}]}
                     const departmentsCnt =  await dbService.count(Departments,departmentsFilter);

            let response = {departments : departmentsCnt,}
            return response; 
        }else{
            return {  enterprise : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countEncounter = async (filter) =>{
    try{
        const encounterCnt =  await dbService.count(Encounter,filter);
        return {encounter : encounterCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countCustomer = async (filter) =>{
    try{
        const CustomerCnt =  await dbService.count(Customer,filter);
        return {Customer : CustomerCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countChat_message = async (filter) =>{
    try{
        const Chat_messageCnt =  await dbService.count(Chat_message,filter);
        return {Chat_message : Chat_messageCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countChat_group = async (filter) =>{
    try{
        let chat_group = await dbService.findAll(Chat_group,filter);
        if(chat_group && chat_group.length){
            chat_group = chat_group.map((obj) => obj.id);

                const Chat_messageFilter = {$or: [{groupId : {$in : chat_group }}]}
                     const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

            let response = {Chat_message : Chat_messageCnt,}
            return response; 
        }else{
            return {  chat_group : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countUser = async (filter) =>{
    try{
        let user = await dbService.findAll(User,filter);
        if(user && user.length){
            user = user.map((obj) => obj.id);

                const CommentFilter = {$or: [{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                     const CommentCnt =  await dbService.count(Comment,CommentFilter);

                const patientFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const patientCnt =  await dbService.count(Patient,patientFilter);

                const Appointment_scheduleFilter = {$or: [{host : {$in : user }},{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                     const Appointment_scheduleCnt =  await dbService.count(Appointment_schedule,Appointment_scheduleFilter);

                const ToDoFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const ToDoCnt =  await dbService.count(ToDo,ToDoFilter);

                const Appointment_slotFilter = {$or: [{userId : {$in : user }},{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                     const Appointment_slotCnt =  await dbService.count(Appointment_slot,Appointment_slotFilter);

                const BlogFilter = {$or: [{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                     const BlogCnt =  await dbService.count(Blog,BlogFilter);

                const departmentsFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const departmentsCnt =  await dbService.count(Departments,departmentsFilter);

                const orderItemFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const orderItemCnt =  await dbService.count(OrderItem,orderItemFilter);

                const TaskFilter = {$or: [{completedBy : {$in : user }},{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                     const TaskCnt =  await dbService.count(Task,TaskFilter);

                const EventFilter = {$or: [{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                     const EventCnt =  await dbService.count(Event,EventFilter);

                const MasterFilter = {$or: [{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                     const MasterCnt =  await dbService.count(Master,MasterFilter);

                const enterpriseFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const enterpriseCnt =  await dbService.count(Enterprise,enterpriseFilter);

                const encounterFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const encounterCnt =  await dbService.count(Encounter,encounterFilter);

                const CustomerFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const CustomerCnt =  await dbService.count(Customer,CustomerFilter);

                const Chat_messageFilter = {$or: [{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                     const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

                const Chat_groupFilter = {$or: [{updatedBy : {$in : user }},{addedBy : {$in : user }}]}
                     const Chat_groupCnt =  await dbService.count(Chat_group,Chat_groupFilter);

                const userFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const userCnt =  await dbService.count(User,userFilter);

                const categoryFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const categoryCnt =  await dbService.count(Category,categoryFilter);

                const taskFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const taskCnt =  await dbService.count(Task,taskFilter);

                const tagFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const tagCnt =  await dbService.count(Tag,tagFilter);

                const task_tagFilter = {$or: [{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const task_tagCnt =  await dbService.count(Task_tag,task_tagFilter);

                const userAuthSettingsFilter = {$or: [{userId : {$in : user }},{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,userAuthSettingsFilter);

                const userTokensFilter = {$or: [{userId : {$in : user }},{addedBy : {$in : user }},{updatedBy : {$in : user }}]}
                     const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

                const userRoleFilter = {$or: [{userId : {$in : user }}]}
                     const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

            let response = {Comment : CommentCnt,patient : patientCnt,Appointment_schedule : Appointment_scheduleCnt,ToDo : ToDoCnt,Appointment_slot : Appointment_slotCnt,Blog : BlogCnt,departments : departmentsCnt,orderItem : orderItemCnt,Task : TaskCnt,Event : EventCnt,Master : MasterCnt,enterprise : enterpriseCnt,encounter : encounterCnt,Customer : CustomerCnt,Chat_message : Chat_messageCnt,Chat_group : Chat_groupCnt,user : userCnt,category : categoryCnt,task : taskCnt,tag : tagCnt,task_tag : task_tagCnt,userAuthSettings : userAuthSettingsCnt,userTokens : userTokensCnt,userRole : userRoleCnt,}
            return response; 
        }else{
            return {  user : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countCategory = async (filter) =>{
    try{
        let category = await dbService.findAll(Category,filter);
        if(category && category.length){
            category = category.map((obj) => obj.id);

                const categoryFilter = {$or: [{parentId : {$in : category }}]}
                     const categoryCnt =  await dbService.count(Category,categoryFilter);

                const taskFilter = {$or: [{categoryId : {$in : category }}]}
                     const taskCnt =  await dbService.count(Task,taskFilter);

            let response = {category : categoryCnt,task : taskCnt,}
            return response; 
        }else{
            return {  category : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countTask = async (filter) =>{
    try{
        let task = await dbService.findAll(Task,filter);
        if(task && task.length){
            task = task.map((obj) => obj.id);

                const taskFilter = {$or: [{parentId : {$in : task }}]}
                     const taskCnt =  await dbService.count(Task,taskFilter);

                const task_tagFilter = {$or: [{taskId : {$in : task }}]}
                     const task_tagCnt =  await dbService.count(Task_tag,task_tagFilter);

            let response = {task : taskCnt,task_tag : task_tagCnt,}
            return response; 
        }else{
            return {  task : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countTag = async (filter) =>{
    try{
        let tag = await dbService.findAll(Tag,filter);
        if(tag && tag.length){
            tag = tag.map((obj) => obj.id);

                const task_tagFilter = {$or: [{tagId : {$in : tag }}]}
                     const task_tagCnt =  await dbService.count(Task_tag,task_tagFilter);

            let response = {task_tag : task_tagCnt,}
            return response; 
        }else{
            return {  tag : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countTask_tag = async (filter) =>{
    try{
        const task_tagCnt =  await dbService.count(Task_tag,filter);
        return {task_tag : task_tagCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countUserAuthSettings = async (filter) =>{
    try{
        const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,filter);
        return {userAuthSettings : userAuthSettingsCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countUserTokens = async (filter) =>{
    try{
        const userTokensCnt =  await dbService.count(UserTokens,filter);
        return {userTokens : userTokensCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countPushNotification = async (filter) =>{
    try{
        const pushNotificationCnt =  await dbService.count(PushNotification,filter);
        return {pushNotification : pushNotificationCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countRole = async (filter) =>{
    try{
        let role = await dbService.findAll(Role,filter);
        if(role && role.length){
            role = role.map((obj) => obj.id);

                const routeRoleFilter = {$or: [{roleId : {$in : role }}]}
                     const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

                const userRoleFilter = {$or: [{roleId : {$in : role }}]}
                     const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

            let response = {routeRole : routeRoleCnt,userRole : userRoleCnt,}
            return response; 
        }else{
            return {  role : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countProjectRoute = async (filter) =>{
    try{
        let projectroute = await dbService.findAll(ProjectRoute,filter);
        if(projectroute && projectroute.length){
            projectroute = projectroute.map((obj) => obj.id);

                const routeRoleFilter = {$or: [{routeId : {$in : projectroute }}]}
                     const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

            let response = {routeRole : routeRoleCnt,}
            return response; 
        }else{
            return {  projectroute : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const countRouteRole = async (filter) =>{
    try{
        const routeRoleCnt =  await dbService.count(RouteRole,filter);
        return {routeRole : routeRoleCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const countUserRole = async (filter) =>{
    try{
        const userRoleCnt =  await dbService.count(UserRole,filter);
        return {userRole : userRoleCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteComment = async (filter,updateBody) =>{  
      try{
        let comment = await dbService.findAll(Comment,filter, {id:1});
        if(comment.length){
            comment = comment.map((obj) => obj.id);

                    const CommentFilter = {"$or": [{parentItem : {"$in" : comment }}]}
                     const CommentCnt = await dbService.update(Comment,CommentFilter,updateBody);
              let updated = await dbService.update(Comment,filter,updateBody);

            let response = {Comment :CommentCnt.length,}
            return response;
        }else{
            return {  comment : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeletePatient = async (filter,updateBody) =>{  
      try{
        const patientCnt =  await dbService.update(Patient,filter);
        return {patient : patientCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteAppointment_schedule = async (filter,updateBody) =>{  
      try{
        const Appointment_scheduleCnt =  await dbService.update(Appointment_schedule,filter);
        return {Appointment_schedule : Appointment_scheduleCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteToDo = async (filter,updateBody) =>{  
      try{
        const ToDoCnt =  await dbService.update(ToDo,filter);
        return {ToDo : ToDoCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteAppointment_slot = async (filter,updateBody) =>{  
      try{
        let appointment_slot = await dbService.findAll(Appointment_slot,filter, {id:1});
        if(appointment_slot.length){
            appointment_slot = appointment_slot.map((obj) => obj.id);

                    const Appointment_scheduleFilter = {"$or": [{slot : {"$in" : appointment_slot }}]}
                     const Appointment_scheduleCnt = await dbService.update(Appointment_schedule,Appointment_scheduleFilter,updateBody);
              let updated = await dbService.update(Appointment_slot,filter,updateBody);

            let response = {Appointment_schedule :Appointment_scheduleCnt.length,}
            return response;
        }else{
            return {  appointment_slot : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteBlog = async (filter,updateBody) =>{  
      try{
        const BlogCnt =  await dbService.update(Blog,filter);
        return {Blog : BlogCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteDepartments = async (filter,updateBody) =>{  
      try{
        const departmentsCnt =  await dbService.update(Departments,filter);
        return {departments : departmentsCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteOrderItem = async (filter,updateBody) =>{  
      try{
        const orderItemCnt =  await dbService.update(OrderItem,filter);
        return {orderItem : orderItemCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteTask = async (filter,updateBody) =>{  
      try{
        const TaskCnt =  await dbService.update(Task,filter);
        return {Task : TaskCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteEvent = async (filter,updateBody) =>{  
      try{
        const EventCnt =  await dbService.update(Event,filter);
        return {Event : EventCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteMaster = async (filter,updateBody) =>{  
      try{
        let master = await dbService.findAll(Master,filter, {id:1});
        if(master.length){
            master = master.map((obj) => obj.id);

                    const MasterFilter = {"$or": [{parentId : {"$in" : master }}]}
                     const MasterCnt = await dbService.update(Master,MasterFilter,updateBody);
              let updated = await dbService.update(Master,filter,updateBody);

            let response = {Master :MasterCnt.length,}
            return response;
        }else{
            return {  master : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteEnterprise = async (filter,updateBody) =>{  
      try{
        let enterprise = await dbService.findAll(Enterprise,filter, {id:1});
        if(enterprise.length){
            enterprise = enterprise.map((obj) => obj.id);

                    const departmentsFilter = {"$or": [{enterprises : {"$in" : enterprise }}]}
                     const departmentsCnt = await dbService.update(Departments,departmentsFilter,updateBody);
              let updated = await dbService.update(Enterprise,filter,updateBody);

            let response = {departments :departmentsCnt.length,}
            return response;
        }else{
            return {  enterprise : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteEncounter = async (filter,updateBody) =>{  
      try{
        const encounterCnt =  await dbService.update(Encounter,filter);
        return {encounter : encounterCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteCustomer = async (filter,updateBody) =>{  
      try{
        const CustomerCnt =  await dbService.update(Customer,filter);
        return {Customer : CustomerCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteChat_message = async (filter,updateBody) =>{  
      try{
        const Chat_messageCnt =  await dbService.update(Chat_message,filter);
        return {Chat_message : Chat_messageCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteChat_group = async (filter,updateBody) =>{  
      try{
        let chat_group = await dbService.findAll(Chat_group,filter, {id:1});
        if(chat_group.length){
            chat_group = chat_group.map((obj) => obj.id);

                    const Chat_messageFilter = {"$or": [{groupId : {"$in" : chat_group }}]}
                     const Chat_messageCnt = await dbService.update(Chat_message,Chat_messageFilter,updateBody);
              let updated = await dbService.update(Chat_group,filter,updateBody);

            let response = {Chat_message :Chat_messageCnt.length,}
            return response;
        }else{
            return {  chat_group : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteUser = async (filter,updateBody) =>{  
      try{
        let user = await dbService.findAll(User,filter, {id:1});
        if(user.length){
            user = user.map((obj) => obj.id);

                    const CommentFilter = {"$or": [{updatedBy : {"$in" : user }},{addedBy : {"$in" : user }}]}
                     const CommentCnt = await dbService.update(Comment,CommentFilter,updateBody);

                    const patientFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const patientCnt = await dbService.update(Patient,patientFilter,updateBody);

                    const Appointment_scheduleFilter = {"$or": [{host : {"$in" : user }},{updatedBy : {"$in" : user }},{addedBy : {"$in" : user }}]}
                     const Appointment_scheduleCnt = await dbService.update(Appointment_schedule,Appointment_scheduleFilter,updateBody);

                    const ToDoFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const ToDoCnt = await dbService.update(ToDo,ToDoFilter,updateBody);

                    const Appointment_slotFilter = {"$or": [{userId : {"$in" : user }},{updatedBy : {"$in" : user }},{addedBy : {"$in" : user }}]}
                     const Appointment_slotCnt = await dbService.update(Appointment_slot,Appointment_slotFilter,updateBody);

                    const BlogFilter = {"$or": [{updatedBy : {"$in" : user }},{addedBy : {"$in" : user }}]}
                     const BlogCnt = await dbService.update(Blog,BlogFilter,updateBody);

                    const departmentsFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const departmentsCnt = await dbService.update(Departments,departmentsFilter,updateBody);

                    const orderItemFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const orderItemCnt = await dbService.update(OrderItem,orderItemFilter,updateBody);

                    const TaskFilter = {"$or": [{completedBy : {"$in" : user }},{updatedBy : {"$in" : user }},{addedBy : {"$in" : user }}]}
                     const TaskCnt = await dbService.update(Task,TaskFilter,updateBody);

                    const EventFilter = {"$or": [{updatedBy : {"$in" : user }},{addedBy : {"$in" : user }}]}
                     const EventCnt = await dbService.update(Event,EventFilter,updateBody);

                    const MasterFilter = {"$or": [{updatedBy : {"$in" : user }},{addedBy : {"$in" : user }}]}
                     const MasterCnt = await dbService.update(Master,MasterFilter,updateBody);

                    const enterpriseFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const enterpriseCnt = await dbService.update(Enterprise,enterpriseFilter,updateBody);

                    const encounterFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const encounterCnt = await dbService.update(Encounter,encounterFilter,updateBody);

                    const CustomerFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const CustomerCnt = await dbService.update(Customer,CustomerFilter,updateBody);

                    const Chat_messageFilter = {"$or": [{updatedBy : {"$in" : user }},{addedBy : {"$in" : user }}]}
                     const Chat_messageCnt = await dbService.update(Chat_message,Chat_messageFilter,updateBody);

                    const Chat_groupFilter = {"$or": [{updatedBy : {"$in" : user }},{addedBy : {"$in" : user }}]}
                     const Chat_groupCnt = await dbService.update(Chat_group,Chat_groupFilter,updateBody);

                    const userFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const userCnt = await dbService.update(User,userFilter,updateBody);

                    const categoryFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const categoryCnt = await dbService.update(Category,categoryFilter,updateBody);

                    const taskFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const taskCnt = await dbService.update(Task,taskFilter,updateBody);

                    const tagFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const tagCnt = await dbService.update(Tag,tagFilter,updateBody);

                    const task_tagFilter = {"$or": [{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const task_tagCnt = await dbService.update(Task_tag,task_tagFilter,updateBody);

                    const userAuthSettingsFilter = {"$or": [{userId : {"$in" : user }},{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const userAuthSettingsCnt = await dbService.update(UserAuthSettings,userAuthSettingsFilter,updateBody);

                    const userTokensFilter = {"$or": [{userId : {"$in" : user }},{addedBy : {"$in" : user }},{updatedBy : {"$in" : user }}]}
                     const userTokensCnt = await dbService.update(UserTokens,userTokensFilter,updateBody);

                    const userRoleFilter = {"$or": [{userId : {"$in" : user }}]}
                     const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
              let updated = await dbService.update(User,filter,updateBody);

            let response = {Comment :CommentCnt.length,patient :patientCnt.length,Appointment_schedule :Appointment_scheduleCnt.length,ToDo :ToDoCnt.length,Appointment_slot :Appointment_slotCnt.length,Blog :BlogCnt.length,departments :departmentsCnt.length,orderItem :orderItemCnt.length,Task :TaskCnt.length,Event :EventCnt.length,Master :MasterCnt.length,enterprise :enterpriseCnt.length,encounter :encounterCnt.length,Customer :CustomerCnt.length,Chat_message :Chat_messageCnt.length,Chat_group :Chat_groupCnt.length,user :userCnt.length + updated.length,category :categoryCnt.length,task :taskCnt.length,tag :tagCnt.length,task_tag :task_tagCnt.length,userAuthSettings :userAuthSettingsCnt.length,userTokens :userTokensCnt.length,userRole :userRoleCnt.length,}
            return response;
        }else{
            return {  user : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteCategory = async (filter,updateBody) =>{  
      try{
        let category = await dbService.findAll(Category,filter, {id:1});
        if(category.length){
            category = category.map((obj) => obj.id);

                    const categoryFilter = {"$or": [{parentId : {"$in" : category }}]}
                     const categoryCnt = await dbService.update(Category,categoryFilter,updateBody);

                    const taskFilter = {"$or": [{categoryId : {"$in" : category }}]}
                     const taskCnt = await dbService.update(Task,taskFilter,updateBody);
              let updated = await dbService.update(Category,filter,updateBody);

            let response = {category :categoryCnt.length + updated.length,task :taskCnt.length,}
            return response;
        }else{
            return {  category : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteTask = async (filter,updateBody) =>{  
      try{
        let task = await dbService.findAll(Task,filter, {id:1});
        if(task.length){
            task = task.map((obj) => obj.id);

                    const taskFilter = {"$or": [{parentId : {"$in" : task }}]}
                     const taskCnt = await dbService.update(Task,taskFilter,updateBody);

                    const task_tagFilter = {"$or": [{taskId : {"$in" : task }}]}
                     const task_tagCnt = await dbService.update(Task_tag,task_tagFilter,updateBody);
              let updated = await dbService.update(Task,filter,updateBody);

            let response = {task :taskCnt.length + updated.length,task_tag :task_tagCnt.length,}
            return response;
        }else{
            return {  task : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteTag = async (filter,updateBody) =>{  
      try{
        let tag = await dbService.findAll(Tag,filter, {id:1});
        if(tag.length){
            tag = tag.map((obj) => obj.id);

                    const task_tagFilter = {"$or": [{tagId : {"$in" : tag }}]}
                     const task_tagCnt = await dbService.update(Task_tag,task_tagFilter,updateBody);
              let updated = await dbService.update(Tag,filter,updateBody);

            let response = {task_tag :task_tagCnt.length,}
            return response;
        }else{
            return {  tag : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteTask_tag = async (filter,updateBody) =>{  
      try{
        const task_tagCnt =  await dbService.update(Task_tag,filter);
        return {task_tag : task_tagCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteUserAuthSettings = async (filter,updateBody) =>{  
      try{
        const userAuthSettingsCnt =  await dbService.update(UserAuthSettings,filter);
        return {userAuthSettings : userAuthSettingsCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteUserTokens = async (filter,updateBody) =>{  
      try{
        const userTokensCnt =  await dbService.update(UserTokens,filter);
        return {userTokens : userTokensCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeletePushNotification = async (filter,updateBody) =>{  
      try{
        const pushNotificationCnt =  await dbService.update(PushNotification,filter);
        return {pushNotification : pushNotificationCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteRole = async (filter,updateBody) =>{  
      try{
        let role = await dbService.findAll(Role,filter, {id:1});
        if(role.length){
            role = role.map((obj) => obj.id);

                    const routeRoleFilter = {"$or": [{roleId : {"$in" : role }}]}
                     const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);

                    const userRoleFilter = {"$or": [{roleId : {"$in" : role }}]}
                     const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
              let updated = await dbService.update(Role,filter,updateBody);

            let response = {routeRole :routeRoleCnt.length,userRole :userRoleCnt.length,}
            return response;
        }else{
            return {  role : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteProjectRoute = async (filter,updateBody) =>{  
      try{
        let projectroute = await dbService.findAll(ProjectRoute,filter, {id:1});
        if(projectroute.length){
            projectroute = projectroute.map((obj) => obj.id);

                    const routeRoleFilter = {"$or": [{routeId : {"$in" : projectroute }}]}
                     const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);
              let updated = await dbService.update(ProjectRoute,filter,updateBody);

            let response = {routeRole :routeRoleCnt.length,}
            return response;
        }else{
            return {  projectroute : 0}
        }
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteRouteRole = async (filter,updateBody) =>{  
      try{
        const routeRoleCnt =  await dbService.update(RouteRole,filter);
        return {routeRole : routeRoleCnt}
    }catch(error){
        throw new Error(error.message);
    }
}

const softDeleteUserRole = async (filter,updateBody) =>{  
      try{
        const userRoleCnt =  await dbService.update(UserRole,filter);
        return {userRole : userRoleCnt}
    }catch(error){
        throw new Error(error.message);
    }
}



module.exports ={
    deleteComment,
    deletePatient,
    deleteAppointment_schedule,
    deleteToDo,
    deleteAppointment_slot,
    deleteBlog,
    deleteDepartments,
    deleteOrderItem,
    deleteTask,
    deleteEvent,
    deleteMaster,
    deleteEnterprise,
    deleteEncounter,
    deleteCustomer,
    deleteChat_message,
    deleteChat_group,
    deleteUser,
    deleteCategory,
    deleteTask,
    deleteTag,
    deleteTask_tag,
    deleteUserAuthSettings,
    deleteUserTokens,
    deletePushNotification,
    deleteRole,
    deleteProjectRoute,
    deleteRouteRole,
    deleteUserRole,
    countComment,
    countPatient,
    countAppointment_schedule,
    countToDo,
    countAppointment_slot,
    countBlog,
    countDepartments,
    countOrderItem,
    countTask,
    countEvent,
    countMaster,
    countEnterprise,
    countEncounter,
    countCustomer,
    countChat_message,
    countChat_group,
    countUser,
    countCategory,
    countTask,
    countTag,
    countTask_tag,
    countUserAuthSettings,
    countUserTokens,
    countPushNotification,
    countRole,
    countProjectRoute,
    countRouteRole,
    countUserRole,
    softDeleteComment,
    softDeletePatient,
    softDeleteAppointment_schedule,
    softDeleteToDo,
    softDeleteAppointment_slot,
    softDeleteBlog,
    softDeleteDepartments,
    softDeleteOrderItem,
    softDeleteTask,
    softDeleteEvent,
    softDeleteMaster,
    softDeleteEnterprise,
    softDeleteEncounter,
    softDeleteCustomer,
    softDeleteChat_message,
    softDeleteChat_group,
    softDeleteUser,
    softDeleteCategory,
    softDeleteTask,
    softDeleteTag,
    softDeleteTask_tag,
    softDeleteUserAuthSettings,
    softDeleteUserTokens,
    softDeletePushNotification,
    softDeleteRole,
    softDeleteProjectRoute,
    softDeleteRouteRole,
    softDeleteUserRole,
}


