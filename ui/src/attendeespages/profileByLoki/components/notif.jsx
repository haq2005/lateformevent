function Notif() {
    return (
        <section className="profile-notfi">
            <div className="profile-notfi-heading-grp">

                <h1>Notifications</h1>
                <h6>Handle your notifications from <span>LateForm.</span>  </h6>
            </div>


            <div className="profile-notfi-center-container">
                <h3>Click to set your your preferences!</h3>
                <div className="profile-notfi-center-grid">
                    <Card />
                    <Card />
                </div>
                <button className="profile-notfi-save-btn">save</button>

            </div>
        </section>)
}

function Card() {
    return (
        <div className="pro-notfi-card" >
            <h3>heading</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas blanditiis iste, amet assumenda fuga nulla corrupti aperiam? Voluptates, placeat aliquam! Voluptatibus repellendus quae deserunt explicabo nobis? Totam delectus ea qui?           </p>
        </div>
    );
}


export default Notif;