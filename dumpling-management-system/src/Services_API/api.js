import axios from 'axios'

const Url = "http://localhost:3000/api"

export const LogIn = async (Email, Password) => {

    const object = {"email" : Email,
    "password":Password
    }
    // axios(
    //     {
    //         method: 'POST',
    //         url: `${Url}/userController/login`,
    //         data: object
    //     }).then((response)=>{
    //         console.log(response);
    //     });
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
    const object2 = {"userName" : userName,
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
    const object4 = {"ID" : ID,
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






