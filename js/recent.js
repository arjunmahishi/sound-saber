const data = [
    "abc",
    "abc"
]


//// Get recent from database ////
database.ref("/users/uid/recent/").on('child_added', (data) => {
    document.querySelector("#recent-list").innerHTML += `
        <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
            <div class="about">
                <div class="name">Vincent Porter</div>
            </div>
        </li>
    `;
});

data.map(name => {
    document.querySelector("#recent-list").innerHTML += `
        <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
            <div class="about">
                <div class="name">Vincent Porter</div>
            </div>
        </li>
    `;
})