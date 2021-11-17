import axios from 'axios'

const Url = "http://localhost:3001/api"

export const LogIn = async (Email, Password) => {
    const object = {"email" : Email,
    "password":Password
    }
    return await axios.post(`${Url}/userController/login`, object)
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









