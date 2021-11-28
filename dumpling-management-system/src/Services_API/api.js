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

export const updateAccount = async (accountType, position, emailAddress) => {
    const object2 = {
    "accountType":accountType,
    "position" : position,
    "emailAddress" : emailAddress,
    }
    return await axios.post(`${Url}/userController/updateAccount`, object2)
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
    const obj={
      
        "typeOfOrder" : typeOfOrder,
        "totalBill" : totalBill,
        "listOrders" : listOrders     

    }
    return await axios.post(`${Url}/cashierController/placeOrder`, obj)
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
    return await axios.post(`${Url}/chefController/addMenuItem`, obj)

}


export const removeMenuItem = async(dishId) =>{

    const obj={
        "dishId" : dishId
    }

    return await axios.post(`${Url}/chefController/removeMenuItem`, obj)

}

export const updateEmployeeSalary = async(employeeId,updatedSalary,checkId) =>{
    const updateSalaryForEmployee= {
        "employeeId":employeeId,
        "updatedSalary":updatedSalary,
        "checkId":checkId
    }
    return await axios.post(`${URL}/managerController/updateEmployeeSalary`,updateSalaryForEmployee,{
        'Accept': 'application/json',
        'content-type':'application/json'
    });
}

export const fetchAllEmployee = async() =>{
    
return await axios.post(`${URL}/managerController/fetchAllEmployee`,{
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
    return await axios.post(`${URL}/managerController/giveBonuses`,giveBonusToEmployee,{
        'Accept': 'application/json',
        'content-type':'application/json'
    });
}

export const fetchDishIds = async()=>{

    return await axios.post(`${URL}/chefController/fetchDishIds`,{
        'Accept': 'application/json',
        'content-type':'application/json'
    });
}
export const viewPlacedOrders = async()=>{

    return await axios.post(`${URL}/chefController/viewPlacedOrders`,{
        'Accept': 'application/json',
        'content-type':'application/json'
    });
}








