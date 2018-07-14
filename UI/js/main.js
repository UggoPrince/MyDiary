
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
            if(!this.journals[this.id]) {
                this.journals[this.id] = [];
            }
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

    updateJournal(i, title, body){
        let time = new Date().toUTCString();
        this.journals[this.id][i]['title'] = title;
        this.journals[this.id][i]['body'] = body;
        this.journals[this.id][i]['time'] = time;
        this.journals[this.id][i]['updated'] = true;
        localStorage.setItem('journals', JSON.stringify(this.journals));
        alert('successfully Updated');
        return {'title':title, 'body':body, 'time':time, 'updated': true};
    }

    getUserJournal(){
        if(this.journals[this.id]){
            return this.journals[this.id];
        }else return null;
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

    hideShowAddBox(show, box){
        let jBox = document.getElementById(box);
        jBox.style.display = show;
        this.titleBox.value = "";
        this.bodyBox.value = "";
        this.labelTitle.innerHTML = "";
        this.labelBody.innerHTML = "";
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
        this.hideShowAddBox("none", 'addJModal');
        new ViewAllJournalsHandler().addJToViewBox();
    }

} // end class AddJournalHandler

class ModifyJournalHandler extends AddUpdateJHandler{
    constructor(modal, title, body, save1, save2, label1, label2){
        super(title, body, save1, save2, label1, label2);
        this.updateModal = modal;
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
            if(!this.errorInput) this.updateJournal();
        });
        this.saveButton2.addEventListener('click', (event)=>{
            this.getEntry(event);
            this.checkEntry();
            if(!this.errorInput) this.updateJournal();
        });
    }

    updateJournal(){
        let jo = new Journals();
        let i = this.updateModal.dataset.id;
        let updatedData = jo.updateJournal(i, this.title, this.body);
        this.hideShowAddBox("none", 'modifyJModal');
        let v = new ViewAllJournalsHandler();
        v.runUpdate(i, updatedData);
    }
}

class ViewAllJournalsHandler{
    constructor(vBox, dBox){
        if(!vBox && !dBox){
            this.viewBox = document.getElementById('allJournalsBox');
            this.detailBox = document.getElementById('detailContent');
        }
        else{
            this.viewBox = vBox;
            this.detailBox = dBox;
        }
        this.userJournals = this.getJForUser();
    }

    getJForUser(){
        return new Journals().getUserJournal();
    }

    populateViewBox(){
        if(this.userJournals && this.userJournals.length != 0){
            let jonals = this.userJournals;
            document.getElementById('jCount').innerHTML = jonals.length;

            let allJholder = document.createElement('div');
            allJholder.setAttribute('id', 'allJHolder')
            allJholder.className = 'allJHolder';

            for(let i = jonals.length-1; i > -1; i--){

                let jHolder = document.createElement('div');
                jHolder.dataset.id = i;
                jHolder.className = 'jHolder';
                jHolder.addEventListener('click',(event)=>{
                    this.showContentDetails(event, i);
                });

                let checkBox = document.createElement('input');
                checkBox.setAttribute('type', 'checkbox');

                let titleSpan = document.createElement('span');
                titleSpan.className = 'jTitleSpan';
                titleSpan.innerHTML = jonals[i]['title'].substr(0, 50);

                let bodySpan = document.createElement('span');
                bodySpan.className = 'jBodySpan';
                bodySpan.innerHTML = "&nbsp; - " + jonals[i]['body'].substr(0, 63);

                let dateSpan = document.createElement('span');
                dateSpan.className = 'jDateSpan';

                let time = jonals[i]['time'].split(' ');
                dateSpan.innerHTML = time[2] + " " + time[1];

                let editImg = document.createElement('img');
                let imgID = 'img' + i; 
                editImg.className = 'jImg';
                editImg.setAttribute('title', 'Edit journal');
                editImg.setAttribute('id', imgID);
                editImg.addEventListener('click', (event)=>{
                    let j = this.getJForUser();
                    document.getElementById('modifyJModal').dataset.id = i;
                    document.getElementById('modifyLabelTitle').innerHTML = "Title";
                    document.getElementById('modifyLabelBody').innerHTML = "Body";
                    document.getElementById('modifyTitle').value = j[i]['title'];
                    document.getElementById('modifyBody').value = j[i]['body'];
                    document.getElementById('modifyJModal').style.display = "block";
                });
                editImg.src = "image/edit2.png";

                jHolder.appendChild(checkBox);
                jHolder.appendChild(titleSpan);
                jHolder.appendChild(bodySpan);
                jHolder.appendChild(editImg);
                jHolder.appendChild(dateSpan);
                allJholder.appendChild(jHolder);
            }
            this.viewBox.appendChild(allJholder);
        }
    }

    addJToViewBox(){
        let jonals = this.userJournals;
        document.getElementById('jCount').innerHTML = jonals.length;
        let n = jonals.length - 1;

        if(n == 0){
            var allJholder = document.createElement('div');
            allJholder.setAttribute('id', 'allJHolder');
            allJholder.className = 'allJHolder';
        }
        else if(n > 0){
            var allJholder = document.getElementById('allJHolder');
        }

        let jHolder = document.createElement('div');
        jHolder.dataset.id = n;
        jHolder.className = 'jHolder';
        jHolder.addEventListener('click',(event)=>{
            this.showContentDetails(event, n);
        });

        let checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');

        let titleSpan = document.createElement('span');
        titleSpan.className = 'jTitleSpan';
        titleSpan.innerHTML = jonals[n]['title'].substr(0, 50);

        let bodySpan = document.createElement('span');
        bodySpan.className = 'jBodySpan';
        bodySpan.innerHTML = "&nbsp; - " + jonals[n]['body'].substr(0, 63);

        let dateSpan = document.createElement('span');
        dateSpan.className = 'jDateSpan';

        let time = jonals[n]['time'].split(' ');
        dateSpan.innerHTML = time[2] + " " + time[1];

        let editImg = document.createElement('img');
        editImg.className = 'jImg';
        editImg.setAttribute('title', 'Edit journal');
        let imgID = 'img' + n;
        editImg.setAttribute('id', imgID);
        editImg.addEventListener('click', (event)=>{
            let j = this.getJForUser();
            document.getElementById('modifyJModal').dataset.id = n;
            document.getElementById('modifyTitle').value = j[n]['title'];
            document.getElementById('modifyBody').value = j[n]['body'];
            document.getElementById('modifyJModal').style.display = "block";
        });
        editImg.src = "image/edit2.png";

        jHolder.appendChild(checkBox);
        jHolder.appendChild(titleSpan);
        jHolder.appendChild(bodySpan);
        jHolder.appendChild(editImg);
        jHolder.appendChild(dateSpan);
        if(n != 0){
            allJholder.insertBefore(jHolder, allJholder.childNodes[0]);
        }
        else if(n == 0){
            allJholder.appendChild(jHolder);
            document.getElementById('allJournalsBox').appendChild(allJholder);
        }
    }

    showContentDetails(e, i){
        this.userJournals = this.getJForUser();
        if(e.target.tagName != "CHECKBOX" && e.target.tagName != "IMG"){
            let backButton = document.getElementById('backButton');
            let addJButton = document.getElementById('addJButton');
            let titleDetailBox = document.getElementById('titleDetail');
            let timeDetailBox = document.getElementById('timeDetail');
            let bodyDetailBox = document.getElementById('bodyDetail');
            let jCount = document.getElementById('jCount');

            jCount.innerHTML = (1 + i) + "/" + this.userJournals.length;
            if(this.userJournals[i]['updated'])
                timeDetailBox.innerHTML = "Last updated: "+ this.userJournals[i].time;
            else timeDetailBox.innerHTML = "Created on: " + this.userJournals[i].time;
            titleDetailBox.innerHTML = this.userJournals[i].title;
            bodyDetailBox.innerHTML = this.userJournals[i].body;

            addJButton.style.display = 'none';
            this.viewBox.style.display = 'none';

            backButton.style.display = 'block';
            this.detailBox.style.display = 'block';
        }
    }

    runUpdate(i, data){
        ++i;
        let n = this.userJournals.length - i;
        let jbox = this.viewBox.children[0].children[n];
        jbox.children[1].innerHTML = data['title'].substr(0, 50);
        jbox.children[2].innerHTML = "&nbsp; - " + data['body'].substr(0, 63);
        jbox.children[3].innerHTML = data['time'];
    }
}

class DetailViewHandler{
    constructor(detailB, timeDetailB, titleDetailB, bodyDetailB, backB){
        this.detailBox = detailB;
        this.timeDetailBox = timeDetailB;
        this.titleDetailBox = titleDetailB;
        this.bodyDetailBox = bodyDetailB;
        this.backButton = backB;
        this.jCount = (new ViewAllJournalsHandler().getJForUser()) ? new ViewAllJournalsHandler().getJForUser().length : 0; 
        this.regEvents();
    }

    regEvents(){
        this.backButton.addEventListener('click', (event)=>{
            this.closeView();
        })
    }

    closeView(){
        this.detailBox.style.display = 'none';
        this.backButton.style.display = 'none';
        document.getElementById('jCount').innerHTML = this.jCount;
        document.getElementById('addJButton').style.display = 'inline-block';
        document.getElementById('allJournalsBox').style.display = 'block';
        this.timeDetailBox.innerHTML = "";
        this.titleDetailBox.innerHTML = '';
        this.bodyDetailBox.innerHTML = '';
    }
}

function showAddBox(show, box){
    let jBox = document.getElementById(box);
    jBox.style.display = show;
}

function showHideMobileMenu(menu){
    let menuDiv = document.getElementById(menu);
    if(menuDiv.style.display == "" || menuDiv.style.display == "none"){
        menuDiv.style.display = 'block';
    }
    else{
        menuDiv.style.display = "none";
    }
}

function signOut(){
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

    let modifyJModal = document.getElementById('modifyJModal');
    let closeModifyBoxButton = document.getElementById('closeModifyBox');
    let modifyTextTitle = document.getElementById('modifyTitle');
    let modifyTextBody = document.getElementById('modifyBody');
    let modifyButton1 = document.getElementById('modifyButton1');
    let modifyButton2 = document.getElementById('modifyButton2');
    let modifyLabel1 = document.getElementById('modifyLabelTitle');
    let modifyLabel2 = document.getElementById('modifyLabelBody');

    let allJViewBox = document.getElementById('allJournalsBox');
    let backButton = document.getElementById('backButton');
    let detailBox = document.getElementById('detailContent');
    let titleDetailBox = document.getElementById('titleDetail');
    let timeDetailBox = document.getElementById('timeDetail');
    let bodyDetailBox = document.getElementById('bodyDetail');

    let logOut = document.getElementById('signOutDesktop');
    let logOut2 = document.getElementById('signOutMobile');

    if(localStorage.getItem('logedUser') != null){
        header1.style.display = "none";
        mainTag1.style.display = "none";
        header2.style.display = "inline-block";
        mainTag2.style.display = "inline-block";

        let id = JSON.parse(localStorage.getItem("logedUser")).id;
        let u = new User();
        new AddJournalHandler(addTextTitle, addTextBody, saveButton1, saveButton2, 
            addLabel1, addLabel2);
        new ModifyJournalHandler(modifyJModal, modifyTextTitle, modifyTextBody, modifyButton1, modifyButton2, 
            modifyLabel1, modifyLabel2);
        let jViewBox = new ViewAllJournalsHandler(allJViewBox, detailBox);
        new DetailViewHandler(detailBox, timeDetailBox, titleDetailBox, bodyDetailBox, backButton);
        let name = u.getUsersName(id);
        document.getElementById('nameDiv').innerHTML = name;
        jViewBox.populateViewBox();
        
        let menuDiv2 = document.getElementById('menuDiv2');
        
        menuDiv2.addEventListener('click', (event)=>{
            showHideMobileMenu('mobileNav2');
        });

        logOut.addEventListener('click', signOut);
        logOut2.addEventListener('click', signOut);
        addJButton.addEventListener('click', (event)=>{
            showAddBox("block", "addJModal");
        });
        closeAddBoxButton.addEventListener('click', (event)=>{
            showAddBox("none", 'addJModal');
        });
        closeModifyBoxButton.addEventListener('click', (event)=>{
            showAddBox('none', 'modifyJModal');
        });
    }
    else{
        header2.style.display = "none";
        mainTag2.style.display = "none";
        header1.style.display = "inline-block";
        mainTag1.style.display = "inline-block";

        let menuDiv1 = document.getElementById('menuDiv1');
        menuDiv1.addEventListener('click', (event)=>{
            showHideMobileMenu('mobileNav1');
        });
    }
}

function desidePageSignIn(){
    let menuDiv1 = document.getElementById('menuDiv1');
    menuDiv1.addEventListener('click', (event)=>{
        showHideMobileMenu('mobileNav1');
    });
    const signInForm = new SignInForm();
    signInForm.initProps();
    
}

function desidePageSignUp(){
    let menuDiv1 = document.getElementById('menuDiv1');
    menuDiv1.addEventListener('click', (event)=>{
        showHideMobileMenu('mobileNav1');
    });
    const signUpForm = new SignUpForm();
    signUpForm.initProps();
}

function desidePageProfile(){
    let menuDiv1 = document.getElementById('menuDiv1');
    menuDiv1.addEventListener('click', (event)=>{
        showHideMobileMenu('mobileNav1');
    });
    let logOut = document.getElementById('signOutDesktop');
    let logOut2 = document.getElementById('signOutMobile');
    logOut.addEventListener('click', signOut);
    logOut2.addEventListener('click', signOut);
    let header2 = document.getElementById('indexHeader1');
    header2.style.display = "inline-block";

    let addNoticeButton = document.getElementById('addNotice');
    let noticeModal = document.getElementById('noticeFormDiv');

    addNoticeButton.addEventListener('click', ()=>{
        noticeModal.style.display = 'block';
    });
    
    new NotificationHandler();
}

class NotificationHandler{
    constructor(){
        this.userJournals = new ViewAllJournalsHandler().getJForUser();
        this.jCount = this.userJournals.length;
        this.addNoticeForm = document.getElementById('addNoticeForm');
        this.noticeModal = document.getElementById('noticeFormDiv');
        this.closeButton = document.getElementById('closeSetBox');
        this.regEvents();
    }

    regEvents(){
        document.getElementById('jCount').innerHTML = this.jCount;
        this.addNoticeForm.addEventListener('submit', (event)=>{
            event.preventDefault();
            this.setNotification(event);
        });
        this.closeButton.addEventListener('click', (event)=>{
            this.noticeModal.style.display = 'none';
        });
    }

    getNotifications(){};

    setNotification(e){
        let target = e.target;
        //if(target.time.value.length != 0 || target.message.value.length != 0)
        alert(target.time.value + " : " + target.message.value);
        this.noticeModal.style.display = 'none';
    };
}

function setup(){
    let link = location.href.lastIndexOf("/") + 1;
    let linkFile = location.href.substring(link, location.href.length);
    
    if(linkFile == "signin.html"){
        desidePageSignIn();
    }
    else if(linkFile == "signup.html"){
        desidePageSignUp();
    }
    else if(linkFile == "index.html" || linkFile == ""){
        desidePageIndex();
    }
    else if(linkFile == "profile.html"){
        desidePageProfile();
    }
}

document.addEventListener('DOMContentLoaded', setup);