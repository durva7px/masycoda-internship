import '../css/Header.css'

const Header = () => {
    return (
        <div className="header">

            <div className="header-panel">
                {/* heading, notification, message, pfp */}
                <h1 style={{ letterSpacing: '-2px' }}>Employee Directory</h1>
                <div className='icons-panel'>
                    <i class="fa-solid fa-bell" style={{ color: "rgb(255, 212, 59)" }}></i>
                    <i class="fa-solid fa-message" style={{ color: "rgb(255, 212, 59)" }}></i>
                </div>
            </div>

            <p style={{ color: "#8d8a84", fontFamily: "monospace", marginTop: "-10px" }}>Who are you looking for today?</p>

        </div>
    )
}

export default Header