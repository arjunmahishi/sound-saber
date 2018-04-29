//// Get recent from database ////
database.ref(`/users/${JSON.parse(localStorage.me).uid}/recent/`).on('child_added', (data) => {
    document.querySelector("#recent-list").innerHTML += `
        <li class="clearfix">
            <img class="img-fluid" src="${data.val().photo}" alt="avatar" />
            <div class="about">
                <div class="name">${data.val().name}</div>
            </div>
        </li>
    `;
});
