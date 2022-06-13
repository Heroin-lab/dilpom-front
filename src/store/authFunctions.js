const loginUser = async (phoneNumber, password) => {
    let response = await fetch("http://localhost:7777/auth/sign-in", {
        mode: "cors",
        method: "POST",
        headers: {
            "Accept":"*/*",
            "Content-type":"application/json"
        },
        body: JSON.stringify({phone_number: phoneNumber, password: password})
    })

    return await response
}

const registerUser = async (userPhoneNumber, name, secName, prima, password) => {
    let response = await fetch("http://localhost:7777/auth/sign-up", {
        mode: "cors",
        method: "POST",
        headers: {
            "Accept":"*/*",
            "Content-type":"application/json"
        },
        body: JSON.stringify({phone_number: userPhoneNumber, first_name: name, second_name: secName, patronymic: prima, password: password})
    })

    return await response.json()
}

const refreshUserToken = async (refToken) => {
    let response = await fetch("http://45.148.29.94:7777/update-token", {
        mode: "cors",
        method: "GET",
        headers: {
            "Accept":"*/*",
            "Content-type":"application/json",
            "Authorization": 'Bearer ' + refToken
        },
    })

    return await response
}

export default { loginUser, registerUser, refreshUserToken }