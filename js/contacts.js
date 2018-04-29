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
            database.ref(`/users/${firebase.auth().currentUser.uid}/contacts`).push(re.data);
            $("#close-modal").click()
        }else{
            alert("This email is not registerd on this platform.")
        }
    })
}

const call = (recieverID) => {
    localStorage['reciever'] = JSON.stringify(contacts[recieverID]);
    document.location = "call.html";
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //// Get contacts from database ////
    database.ref(`/users/${firebase.auth().currentUser.uid}/contacts/`).on('child_added', (data) => {
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
  } else {
    console.log("didn't work");
  }
});