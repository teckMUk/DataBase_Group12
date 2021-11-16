import axios from 'axios'

const Url = "http://localhost:3001/api"

export const LogIn = async (Email, Password) => {
    const object = {"email" : Email,
    "password":Password
    }
    return await axios.post(`${Url}/userController/login`, object)
}



