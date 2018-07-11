
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
        else{
            this.users = JSON.parse(localStorage.getItem('users'));
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

    getUsersName(id){
        let i = id - 1;
        let fname = this.users[i].firstname;
        let lname = this.users[i].lastname;
        let f = fname.split('');
        let l = lname.split('');
        f[0] = f[0].toUpperCase();
        l[0] = l[0].toUpperCase();
        name = f.join('') + " " + l.join('');
        return name;
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

class Journals{
    constructor(){
        this.journals = [];
        this.id = null;
        this.initStorage();
    }

    initStorage(){
        this.id = JSON.parse(localStorage.getItem('logedUser')).id;
        if(localStorage.getItem('journals') == null){
            let id = this.id;
            this.journals[id] = [];
            localStorage.setItem("journals", JSON.stringify(this.journals));
        }
        else{
            this.journals = JSON.parse(localStorage.getItem('journals'));
        }
    }

    addJournal(title, body){
        let time = new Date().toUTCString();
        let j = {'title':title, 'body':body, 'time':time, 'updated':false};
        this.journals[this.id].push(j);
        localStorage.setItem('journals', JSON.stringify(this.journals));
        alert("Successfully Added");
        return;
    }

    updateJournal(){}

    getUserJournal(){
        return this.journals[this.id];
    }
}

class AddUpdateJHandler{
    constructor(title, body, save1, save2, label1, label2) {
        this.titleBox = title;
        this.bodyBox = body;
        this.saveButton1 = save1;
        this.saveButton2 = save2;
        this.labelTitle = label1;
        this.labelBody = label2;
        this.title = null;
        this.body = null;
        this.errorInput = false;
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

    getEntry(e){
        this.title = this.titleBox.value;
        this.body = this.bodyBox.value;
    }

    checkEntry(){
        if(this.body.length == 0){
            this.errorInput = true;
            this.labelBody.innerHTML = "<span>Error! Empty Body.</span>"
        }
        else{
            this.errorInput = false;
        }
    }
}

class AddJournalHandler extends AddUpdateJHandler{
    constructor(title, body, save1, save2, label1, label2){
        super(title, body, save1, save2, label1, label2);
        this.regEvents();
    }
    
    regEvents(){
        this.checkFocusAfterLoad(this.titleBox, this.labelTitle, "Title");
        this.checkFocusAfterLoad(this.bodyBox, this.labelBody, "Body");

        this.titleBox.addEventListener('input', (event)=>{
            this.inputStart(event, this.labelTitle, "Title");
        });
        this.titleBox.addEventListener('blur', (event)=>{
            this.inputStart(event, this.labelTitle, "Title");
        });

        this.bodyBox.addEventListener('input', (event)=>{
            this.inputStart(event, this.labelBody, "Body");
        });
        this.bodyBox.addEventListener('blur', (event)=>{
            this.inputStart(event, this.labelBody, "Body");
        });

        this.saveButton1.addEventListener('click', (event)=>{
            this.getEntry(event);
            this.checkEntry();
            if(!this.errorInput) this.addJournal();
        });
        this.saveButton2.addEventListener('click', (event)=>{
            this.getEntry(event);
            this.checkEntry();
            if(!this.errorInput) this.addJournal();
        });
    }

    addJournal(){
        let jo = new Journals();
        jo.addJournal(this.title, this.body);
        this.hideAddBox();
    }

    hideAddBox(){
        showAddBox("none");
        this.titleBox.value = "";
        this.bodyBox.value = "";
        this.labelTitle.innerHTML = "";
        this.labelBody.innerHTML = "";
    }

} // end class AddJournalHandler

class ViewAllJournalsHandler{
    constructor(vBox){
        this.viewBox = vBox;
        this.userJournals = this.getJForUser();
    }

    getJForUser(){
        return new Journals().getUserJournal();
    }

    populateViewBox(){
        if(this.userJournals.length != 0){
            let jonals = this.userJournals;
            document.getElementById('jCount').innerHTML = jonals.length;

            let allJholder = document.createElement('div');
            allJholder.className = 'allJHolder';

            for(let i = 0; i < jonals.length; i++){

                let jHolder = document.createElement('div');
                jHolder.className = 'jHolder';

                let checkBox = document.createElement('input');
                checkBox.setAttribute('type', 'checkbox');

                let titleSpan = document.createElement('span');
                titleSpan.className = 'jTitleSpan';
                titleSpan.innerHTML = jonals[i]['title'];

                let bodySpan = document.createElement('span');
                bodySpan.className = 'jBodySpan';
                bodySpan.innerHTML = "&nbsp; - " + jonals[i]['body'];

                let dateSpan = document.createElement('span');
                dateSpan.className = 'jDateSpan';

                let time = jonals[i]['time'].split(' ');
                dateSpan.innerHTML = time[2] + " " + time[1];

                jHolder.appendChild(checkBox);
                jHolder.appendChild(titleSpan);
                jHolder.appendChild(bodySpan);
                jHolder.appendChild(dateSpan);
                allJholder.appendChild(jHolder);
            }
            this.viewBox.appendChild(allJholder);
        }
    }

    addJToViewBox(){}
}

function showAddBox(show){
    let jBox = document.getElementById('addJModal');
    jBox.style.display = show;
}

function signOut(e){
    localStorage.removeItem('logedUser');
    if(!localStorage.logedUser)
        location.replace("index.html");
}



function desidePageIndex(){
    let mainTag1 = document.getElementById('indexMain1');
    let mainTag2 = document.getElementById('indexMain2');
    let header1 = document.getElementById('indexHeader1');
    let header2 = document.getElementById('indexHeader2');
    let addJButton = document.getElementById('addJButton');

    let closeAddBoxButton = document.getElementById('closeAddBox');
    let addTextTitle = document.getElementById('addTitle');
    let addTextBody = document.getElementById('addBody');
    let saveButton1 = document.getElementById('saveButton1');
    let saveButton2 = document.getElementById('saveButton2');
    let addLabel1 = document.getElementById('addLabelTitle');
    let addLabel2 = document.getElementById('addLabelBody');
    let allJViewBox = document.getElementById('allJournalsBox');

    let logOut = document.getElementById('signOutDesktop');

    if(localStorage.getItem('logedUser') != null){
        header1.style.display = "none";
        mainTag1.style.display = "none";
        header2.style.display = "inline-block";
        mainTag2.style.display = "inline-block";

        let id = JSON.parse(localStorage.getItem("logedUser")).id;
        let u = new User();
        new AddJournalHandler(addTextTitle, addTextBody, saveButton1, saveButton2, 
            addLabel1, addLabel2);
        let jViewBox = new ViewAllJournalsHandler(allJViewBox);
        let name = u.getUsersName(id);
        document.getElementById('nameDiv').innerHTML = name;
        jViewBox.populateViewBox();

        logOut.addEventListener('click', signOut);
        addJButton.addEventListener('click', (event)=>{
            showAddBox("block");
        });
        closeAddBoxButton.addEventListener('click', (event)=>{
            showAddBox("none");
        });
    }
    else{
        header2.style.display = "none";
        mainTag2.style.display = "none";
        header1.style.display = "inline-block";
        mainTag1.style.display = "inline-block";
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
        desidePageIndex();
    }
}

const signInForm = new SignInForm();
const signUpForm = new SignUpForm();

document.addEventListener('DOMContentLoaded', setup);