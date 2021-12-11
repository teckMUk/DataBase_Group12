import axios from 'axios'

const Url = "http://localhost:3000/api"

export const LogIn = async (Email, Password) => {

    const object = {
        "email" : Email,
        "password":Password
    }

    return await axios.post(`${Url}/userController/login`,object,{
        'Accept': 'application/json',
        'content-type':'application/json'
    });
}

export const createAccount = async (userName, accountType, currentPassword, emailAddress, securityQuestions, employeeName, dateOfBirth, phoneNumber, address, position, salary,bankAccountNumber) => {
    const object2 = {"userName" : userName,
    "accountType":accountType,
    "currentPassword" : currentPassword,
    "emailAddress" : emailAddress,
    "securityQuestions" : securityQuestions,
    "employeeName" : employeeName,
    "dateOfBirth" : dateOfBirth,
    "phoneNumber" : phoneNumber,
    "address" : address,
    "position" : position,
    "salary" : salary,
    "bankAccountNumber" : bankAccountNumber


    }
    return await axios.post(`${Url}/userController/createAccount`, object2)
}

export const updateAccount = async (accountType, position, emailAddress,role) => {
    const object2 = {
    "accountType":accountType,
    "empPosition" : position,
    "emailAddress" : emailAddress,
    "role": role
    }
    return await axios.post(`${Url}/userController/updateAccount`, object2)
}

export const getSales = async (year, month) => {
    const object2 = {
    "year":year,
    "month" : month,
    }
    return await axios.post(`${Url}/managerController/monthYearSale`, object2)
}

export const deleteAccount = async(emailAddress) =>
{
    const obj = {
        "emailAddress": emailAddress
    }
    return await axios.post(`${Url}/userController/deleteAccount`,obj);
}

export const securityQuestions = async (Email) => {
    const object3 = {"email" : Email
    }
    return await axios.post(`${Url}/userController/securityQuestions`, object3)
}

export const changePassword = async (ID, newPassword, currentPassword) => {
    const object4 = {
    "ID" : ID,
    "newPassword" : newPassword,
    "currentPassword" : currentPassword
    }
    return await axios.post(`${Url}/userController/changePassword`, object4)
}

export const forgetPassword = async (email, newPass) => {
    const object5 = {
    "email" : email,
    "newPass" : newPass
    }
    return await axios.post(`${Url}/userController/forgetPassword`, object5)
}


export const accountExistence = async (email) => {
    const object6 = {
    "email" : email
    }
    return await axios.post(`${Url}/userController/accountExistence`, object6)
}

export const validateSecurity = async(email, answerOne,answerTwo)=>{
    const obj = {
        "answerOne":answerOne,
        "answerTwo":answerTwo,
        "email" : email
    }
    return await axios.post(`${Url}/userController/validateSecurity`,obj);
}



export const placeOrder = async(typeOfOrder,orderStatus,totalBill,listOrders) =>{
    console.log("In placed orders api in server_api");
    const obj={

        "typeOfOrder" : typeOfOrder,
        "orderStatus":orderStatus,
        "totalBill" : totalBill,
        "listOrders" : listOrders

    }
    // console.log(obj);
    return await axios.post(`${Url}/cashierController/placeOrder`, obj,)
}

export const addMenuItem = async(dishName, dishType,dishPrice,preparationTime,calories,dishOfday, allergens, image) =>{
    const obj={
        "dishName" : dishName,
        "dishType" : dishType,
        "dishPrice":dishPrice,
        "preparationTime" : preparationTime,
        "calories" : calories,
        "dishOfday" : dishOfday,
        "allergens" : allergens,
        "image": image

    }
    return await axios.post(`${Url}/chefController/addMenuItem`, obj,{
    'Accept': 'application/json',
    'content-type':'application/json'
});

}


export const removeMenuItem = async(dishId) =>{

    const obj={
        "dishId" : dishId
    }

    return await axios.post(`${Url}/chefController/removeMenuItem`, obj)

}
export const getEmployeeDetails = async() =>
{
    return await axios.get(`${Url}/userController/employeeDetails`);
}

export const updateEmployeeSalary = async(employeeId,updatedSalary,checkId) =>{
    const updateSalaryForEmployee= {
        "employeeId":employeeId,
        "updatedSalary":updatedSalary,
        "checkId":checkId
    }
    return await axios.post(`${Url}/managerController/updateEmployeeSalary`,updateSalaryForEmployee,{
        'Accept': 'application/json',
        'content-type':'application/json'
    });
}

export const fetchAllEmployee = async() =>
{
    console.log("called fetch all employee");
    const req = {};
    return await axios.post(`${Url}/managerController/fetchAllEmployee`,req,{
    'Accept': 'application/json',
    'content-type':'application/json'
    });
}

export const giveBonuses = async(checkId,employeeId,reason,date)=>{
    const giveBonusToEmployee = {
        "checkId":checkId,
        "employeeId":employeeId,
        "reason":reason,
        "date":date
    }
    return await axios.post(`${Url}/managerController/giveBonuses`,giveBonusToEmployee,{
        'Accept': 'application/json',
        'content-type':'application/json'
    });
}

export const fetchDishIds = async()=>{

    return await axios.post(`${Url}/chefController/fetchDishIds`,{
        'Accept': 'application/json',
        'content-type':'application/json'
    });
}
export const viewPlacedOrders = async()=>{

    return await axios.post(`${Url}/chefController/viewPlacedOrders`,{
        'Accept': 'application/json',
        'content-type':'application/json'
    });
}

export const viewOrderSummary = async(orderId)=>{

    console.log("in order summary");
    let obj1 = {
        "orderId":orderId
    }
    return await axios.post(`${Url}/cashierController/viewOrderSummary`,obj1,{
        'Accept': 'application/json',
        'content-type':'application/json'
    });
}



export const addCoupon = async(couponId, couponName, discount, issueDate, expiryDate) =>{
    const obj={
        "couponId" : couponId,
        "couponName" : couponName,
        "discount":discount,
        "issueDate" : issueDate,
        "expiryDate" : expiryDate

    }
    return await axios.post(`${Url}/managerController/addCoupon`, obj,{
    'Accept': 'application/json',
    'content-type':'application/json'
});

}

export const applyCoupon = async(couponId, orderId) =>{
    const obj={
        "couponId" : couponId,
        "orderId" : orderId

    }
    return await axios.post(`${Url}/managerController/applyCoupon`, obj,{
    'Accept': 'application/json',
    'content-type':'application/json'
});

}

export const deleteOrder = async(orderId) =>{
    const obj={
        "orderId" : orderId
    }
    return await axios.post(`${Url}/cashierController/deleteOrder`, obj,{
    'Accept': 'application/json',
    'content-type':'application/json'
});

}

export const editOrder = async(typeOfOrder, orderStatus, orderId, totalBill, listOrders) =>{
    const obj={
        "orderId" : orderId,
        "typeOfOrder": typeOfOrder,
        "orderStatus": orderStatus,
        "totalBill":totalBill,
        "listOrders":listOrders

    }
    return await axios.post(`${Url}/cashierController/editOrder`, obj,{
    'Accept': 'application/json',
    'content-type':'application/json'
});
}
export const updateOrderStatus = async(orderId) =>
{
    const obj = {
        "orderId":orderId
    }
    return await axios.post(`${Url}/managerController/updateOrderStatus`,obj);
}

export const dishOfTheDay = async (dishId) => {
    const object3 = {"dishId" : dishId
    }
    return await axios.post(`${Url}/chefController/dishOfTheDay`, object3)
}

export const getOrder = async (orderId) => {
    const object3 = {"orderId" : orderId
    }
    return await axios.post(`${Url}/cashierController/getOrder`, object3)
}















