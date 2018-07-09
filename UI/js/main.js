
class Form{
    constructor(){
        this.form = null;
    }
}

class SignForm extends Form{
    constructor(){
        super();
        this.email = null;
        this.emailLabel = null;
        this.pass = null;
        this.passLabel = null;
        this.errorDiv = null;
    }

    checkFocusAfterLoad(input, label, text){
        if(input.value != 0) label.innerHTML = text;
    }

    inputStart(e, label, text){
        if(e.target.value.length != 0)
            label.innerHTML = text;
        else label.innerHTML = "";
    }

    inputLooseFocus(e, label, text){
        let val = e.target.value;
        if(val.length == 0) label.innerHTML = "";
        else if(val.length != 0) label.innerHTML = text;
    }

    validEmail(email){
        let emailRegExp = /^(([^<>()\[\]\\.,;:@"\x00-\x20\x7F]|\\.)+|("""([^\x0A\x0D"\\]|\\\\)+"""))@(([a-z]|#\d+?)([a-z0-9-]|#\d+?)*([a-z0-9]|#\d+?)\.)+([a-z]{2,4})$/i;
        return emailRegExp.test(email);
    }

    validPassword(pass){
        if(pass.length < 8) return false;
        else return true;
    }

    validName(name){
        let nameRegExp = /[\W\d]+/ig;
        return nameRegExp.test(name);
    }

    displayError(errorText){
        this.errorDiv.innerHTML = errorText;
    }
}

class SignInForm extends SignForm{
    constructor(){
        super();
    }

    initProps(){
        this.form = document.getElementById('signinForm');
        this.emailLabel = document.getElementById('signinEmailLabel');
        this.email = document.getElementById('signinEmail');
        this.passLabel = document.getElementById('signinPassLabel');
        this.pass = document.getElementById('signinPass');
        this.errorDiv = document.getElementById('signinErrorDiv');

        this.checkFocusAfterLoad(this.email, this.emailLabel, "Email");

        this.form.addEventListener('submit', (event)=>{
            this.checkInputs(event, this);
        })

        this.email.addEventListener('input', (event)=>{
            this.inputStart(event, this.emailLabel, "Email");
        });
        
        this.email.addEventListener('blur', (event)=>{
            this.inputLooseFocus(event, this.emailLabel, "Email");
        });
    
        this.pass.addEventListener('input', (event)=>{
            this.inputStart(event, this.passLabel, "Password");
        });
        this.pass.addEventListener('blur', (event)=>{
            this.inputLooseFocus(event, this.passLabel, "Password");
        });
    }

    checkInputs(e, obj){
        e.preventDefault();
        let form =  e.target;
        let email = form.signinEmail.value;
        let pass = form.signinPass.value;

        
        if(!this.validEmail(email)){
            this.errorDiv.innerHTML = "Enter a proper email!";
        }
        else if(!this.validPassword(pass)){
            this.errorDiv.innerHTML = "Password must be at least 8 characters."
        }
        else{
            this.errorDiv.innerHTML = "";
            let user = new User();
            if(user.emailExist(email)){
                let id = user.getUser(email, pass);
                if(id != -1){
                    let logedUser = {"id":id, "email":email};
                    localStorage.setItem('logedUser', JSON.stringify(logedUser));
                    location.href = "index.html";
                    //alert(email + " : " + pass );
                }
                else{
                    this.displayError("Error in email/password!");
                }
            }
            else{
                this.displayError("Error with email/password!. If you don't have an account sign up.");
            }
        }
    }
}

class SignUpForm extends SignForm{
    constructor(){
        super();
        this.firstName = null;
        this.firstNameLabel = null;
        this.lastName = null;
        this.lastNameLabel = null;
        this.pass2 = null;
    }

    initProps(){
        this.form = document.getElementById('signupForm');
        this.firstName = document.getElementById('signupFirstName');
        this.firstNameLabel = document.getElementById('signupFirstNameLabel');
        this.lastName = document.getElementById('signupLastName');
        this.lastNameLabel = document.getElementById('signupLastNameLabel');
        this.emailLabel = document.getElementById('signupEmailLabel');
        this.email = document.getElementById('signupEmail');
        this.passLabel = document.getElementById('signupPassLabel');
        this.pass = document.getElementById('signupPass');
        this.passLabel2 = document.getElementById('signupPassLabel2');
        this.pass2 = document.getElementById('signupPass2');
        this.errorDiv = document.getElementById('signupErrorDiv');

        this.checkFocusAfterLoad(this.email, this.emailLabel, "Email");
        this.checkFocusAfterLoad(this.firstName, this.firstNameLabel, "Firstname");
        this.checkFocusAfterLoad(this.lastName, this.lastNameLabel, "Lastname");

        this.form.addEventListener('submit', (event)=>{
            this.checkInputs(event, this);
        });

        this.firstName.addEventListener('input', (event)=>{
            this.inputStart(event, this.firstNameLabel, "Firstname");
        });
        this.firstName.addEventListener('blur', (event)=>{
            this.inputLooseFocus(event, this.firstNameLabel, "Firstname");
        });

        this.lastName.addEventListener('input', (event)=>{
            this.inputStart(event, this.lastNameLabel, "Lastname");
        });
        this.lastName.addEventListener('blur', (event)=>{
            this.inputLooseFocus(event, this.lastNameLabel, "Lastname");
        });

        this.email.addEventListener('input', (event)=>{
            this.inputStart(event, this.emailLabel, "Email");
        });
        this.email.addEventListener('blur', (event)=>{
            this.inputLooseFocus(event, this.emailLabel, "Email");
        });
    
        this.pass.addEventListener('input', (event)=>{
            this.inputStart(event, this.passLabel, "Password");
        });
        this.pass.addEventListener('blur', (event)=>{
            this.inputLooseFocus(event, this.passLabel, "Password");
        });

        this.pass2.addEventListener('input', (event)=>{
            this.inputStart(event, this.passLabel2, "Confirm password");
        });
        this.pass2.addEventListener('blur', (event)=>{
            this.inputLooseFocus(event, this.passLabel2, "Confirm password");
        });
    }

    checkInputs(e, obj){
        e.preventDefault();
        let form =  e.target;
        let email = form.signupEmail.value;
        let pass = form.signupPass.value;
        let pass2 = form.signupPass2.value;
        let fname = form.signupFirstName.value;
        let lname = form.signupLastName.value;

        if(fname.length == 0){
            this.displayError("Enter your firstname.");
        }
        else if(this.validName(fname)){
            this.displayError("Firstname must not have number or special characters.");
        }
        else if(lname.length == 0){
            this.displayError("Enter your lastname.");
        }
        else if(this.validName(lname)){
            this.displayError("Lastname must not have a number or special characters.");
        }
        else if(!this.validEmail(email)){
            this.displayError("Enter a proper email!");
        }
        else if(!this.validPassword(pass)){
            this.displayError("Password must be at least 8 characters.");
        }
        else if(pass != pass2){
            this.displayError("Your password doesn't match the retyped password.");
        }
        else{
            this.errorDiv.innerHTML = "";
            //alert(fname + " " +  lname +" " + email + " : " + pass );
            let user = new User();
            if(user.emailExist(email)) this.displayError("This account already exist!.<br>"
                + "Kindly sign in with your Details.");
            else{
                let logedUser = {}
                let createID = user.createUser(email, pass, fname, lname);
                logedUser["id"] = createID;
                logedUser["email"] = email;
                alert("Account successfully create!");
                user = null;
                localStorage.setItem('logedUser', JSON.stringify(logedUser));
                location.href = "index.html";
            }
        }
    }
}

class User{
    constructor(){
        this.users = [];
        this.initStorage();
    }

    initStorage(){
        if(localStorage.getItem('users') == null){
            localStorage.setItem("users", JSON.stringify(this.users));
        }
    }

    createUser(email, pass, fname, lname){
        this.users = JSON.parse(localStorage.getItem("users"));
        var id = this.users.length + 1;
        if(this.users.length > 1) {
            id = this.users.length + 1;
        } 
        let user = {"id":id, "email":email, "password":pass, "firstname":fname, "lastname":lname};

        this.users.push(user);
        localStorage.setItem("users", JSON.stringify(this.users));
        this.users = [];
        return id;
    }

    getUser(em, pass){
        this.users = JSON.parse(localStorage.getItem("users"));
        for(let u of this.users){
            if(u.email == em && u.password == pass){
                return u.id;
            }
        }
        return -1;
    }

    emailExist(em){
        this.users = JSON.parse(localStorage.getItem("users"));
        if(this.users.length == 0) return false;
        else{
            for(let u of this.users){
                if(u.email == em) return true;
            }
        }
    }
}

function setup(){
    let link = location.href.lastIndexOf("/") + 1;
    let linkFile = location.href.substring(link, location.href.length);
    
    if(linkFile == "signin.html"){
        signInForm.initProps();
    }
    else if(linkFile == "signup.html"){
        signUpForm.initProps();
    }
    else if(linkFile == "index.html"){
        desidePage();
    }
}

function desidePage(){
    let mainTag1 = document.getElementById('indexMain1');
    let mainTag2 = document.getElementById('indexMain2');
    if(localStorage.getItem('logedUser') != null){
        mainTag1.style.display = "none";
        mainTag2.style.display = "inline-block";
    }
}

const signInForm = new SignInForm();
const signUpForm = new SignUpForm();

document.addEventListener('DOMContentLoaded', setup);