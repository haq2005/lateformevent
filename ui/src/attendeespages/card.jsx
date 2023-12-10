export  function CommunityTabsCard({ image, text }) {
    return (
        <a href="#" className="community-card">
            <div className="card-bg-div">
                <img src={image} width={"80%"} alt="" />
            </div>
            <h3>{text}</h3>
        </a>
    );
}

export function TextCard({ text }) {
    return (
        <a href="#" className="community-text-card">
            {text}
        </a>
    );
}

