function validateSignUp(userData){

    let validData = {
        error: false,
        data:{}
    };

    if(userData.firstname == "" || userData.firstname == "undefined"){
        validData.error = true;
        validData.data["Firstname"] = "Firstname is not valid!";
    }
    if(userData.lastname == "" || userData.lastname == "undefined"){
        validData.error = true;
        validData.data["Lastname"] = "Lastname is not valid";
    }
    if(userData.email == "" || userData.email == "undefined"){
        validData.error = true;
        validData.data["Email"] = "Invalid email";
    }
    if(userData.password.length < 8){
        validData.error = true;
        validData.data["Password"] = "Password should be more than 8 characters.";
    }

    return validData;
}

export default validateSignUp;