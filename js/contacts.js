const data = [
    "abc",
    "abc"
]


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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //// Get recent from database ////
    database.ref(`/users/${firebase.auth().currentUser.uid}/contacts/`).on('child_added', (data) => {
        document.querySelector("#contact-list").innerHTML += `
            <li class="clearfix">
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