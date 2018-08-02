function validateSignIn(loginData){
    let validData = {
        error: false,
        data:{}
    };

    if(loginData.email == "" || loginData.email == "undefined"){
        validData.error = true;
        validData.data["Email"] = "Invalid email";
    }
    if(loginData.password.length < 8){
        validData.error = true;
        validData.data["Password"] = "Password should be more than 8 characters.";
    }

    return validData;
}

export default validateSignIn;