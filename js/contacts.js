const data = [
    "abc",
    "abc"
]

const contacts = [];

const varifyEmail = (email, callback) => {
    database.ref("/users").once('value', (data) => {
        for (var key in data.val()) {
            if (data.val().hasOwnProperty(key) && data.val()[key].email == email) {
                callback({flag: true, data: data.val()[key]});
                return;
            }
        }
        callback(false);
    })
}

const addContact = () => {
    let email = document.querySelector("#new-email").value;
    varifyEmail(email, re => {
        if(re){
            database.ref(`/users/${firebase.auth().currentUser.uid}/contacts`)
            .push(re.data)
            .then(() => $("#close-modal").click())
        }else{
            alert("This email is not registerd on this platform.")
        }
    })
}

const call = (recieverID) => {
    localStorage['reciever'] = JSON.stringify(contacts[recieverID]);
    database.ref(`/users/${JSON.parse(localStorage.me).uid}/recent/`)
    .push(contacts[recieverID])
    .then(() => document.location = "call.html");
}

//// Get contacts from database ////
database.ref(`/users/${JSON.parse(localStorage.me).uid}/contacts/`).on('child_added', (data) => {
    contacts.push(data.val());
    document.querySelector("#contact-list").innerHTML += `
        <li class="clearfix" onclick="call(contacts.length-1)" >
            <div class="image-holder">
                <img class="img-fluid" src="${data.val().photo}" alt="avatar" />
            </div>
            <div class="about">
                <div class="name">${data.val().name}</div>
            </div>
        </li>
    `;
});