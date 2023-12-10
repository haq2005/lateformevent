function Progress(props){
    return(
        <>
        <div className="container-md">
        <div className="progress">
  <div className={props.class} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
</div>
        </div>
        </>
    )
}
export default Progress