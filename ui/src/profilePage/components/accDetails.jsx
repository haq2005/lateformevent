function AccountDetails() {
    return (
        <section className="profile-accDetails">
            <div className="acc-grp">
                <h1>Account details</h1>
                <h6>Handle your notifications from <span>LateForm.</span>  </h6>
            </div>
            <form className="accDet-cen" action="">
                <div className="form-group">
                    <label >Email</label>
                    <input
                        type="email"
                        className="form-control w-75"

                        placeholder="name@example.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Recovery Email</label>
                    <input
                        type="email"
                        className="form-control w-75"
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"
                    />
                </div>
                <div className="accDet-cen">
                    <label >Password</label>
                    <input
                        type="password"
                        className="form-control w-75"
                        id="exampleInputPassword1"
                        placeholder="Current password"
                    />
                    <input
                        type="password"
                        className="form-control w-75"
                        id="exampleInputPassword1"
                        placeholder="New password"
                    />
                    <input
                        type="password"
                        className="form-control w-75"
                        id="exampleInputPassword1"
                        placeholder="Re-type new password"
                    />


                </div>
                <div className="close-acc">close account

                </div>
                <button className="accDet-save">save</button>
            </form>
        </section>)
}

export default AccountDetails;