function Activities() {
    return (
        <section className="profile-act">

            <h1>Activity</h1>

            <nav>
                <div className="profile-act-grp1">

                    <div>courses</div>
                    <div>events</div>
                </div>
                <div className="lst-chd">total-10</div>
            </nav>
            <div className="profile-act-card-grid">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </section>
    );
}

function Card() {
    return (
        <div className="card w-100" style={{ width: "18rem" }}>
            <img
                className="card-img-top"
                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                alt="Card image cap"
            />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </p>
               <div className="per-comp"> 70% complete

</div>
            </div>
        </div>

    )
}



export default Activities;