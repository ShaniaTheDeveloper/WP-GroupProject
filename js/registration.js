document.getElementById("registerForm").addEventListener("submit", function(e){
    e.preventDefault();

    //
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let dob = document.getElementById("dob").value;
    let gender = document.getElementById("gender").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let trn = document.getElementById("trn").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // PASSWORD LENGTH CHECK
    if(password.length < 8){
        alert("Password must be at least 8 characters long.");
        return;
    }

    // PASSWORD MATCH CHECK
    if(password !== confirmPassword){
        alert("Passwords do not match.");
        return;
    }

    // AGE CHECK (18+)
    let birthDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();

    if(m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
        age--;
    }

    if(age < 18){
        alert("You must be at least 18 years old to register.");
        return;
    }

    // TRN FORMAT CHECK (000-000-000)
    let trnPattern = /^\d{3}-\d{3}-\d{3}$/;
    if(!trnPattern.test(trn)){
        alert("TRN must be in the format 000-000-000.");
        return;
    }

    // Get existing users
    let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    // TRN UNIQUE CHECK
    let trnExists = users.some(user => user.trn === trn);
    if(trnExists){
        alert("This TRN already exists. Please use a different one.");
        return;
    }

    // REGISTRATION OBJECT
    let newUser = {
        firstName: fname,
        lastName: lname,
        dob: dob,
        gender: gender,
        phone: phone,
        email: email,
        trn: trn,
        password: password,
        dateOfRegistration: new Date().toLocaleDateString(),
        cart: {},
        invoices: []
    };

    // SAVE TO LOCAL STORAGE
    users.push(newUser);
    localStorage.setItem("RegistrationData", JSON.stringify(users));

    alert("Registration Successful!");

    document.getElementById("registerForm").reset();
});

