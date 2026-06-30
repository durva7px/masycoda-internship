import '../css/Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/address-card-solid-full.svg" alt="Logo" 
            style={{ width: 50, height: 'auto' }} />
            <h2>Grove</h2>
        </div>
        
        <div className="navbar">
            <ul style={{ listStyleType: 'none'}}>
                <li>
                    <i class="fa-solid fa-user" style={{color: "rgb(255, 212, 59)"}} />
                    <span style={{ marginLeft: '10px' }}>
                    Directory
                    </span>
                </li>

                <li>
                    <i class="fa-solid fa-sitemap" style={{ color: "rgb(255, 212, 59)" }}></i>
                    <span style={{ marginLeft: '10px' }}>
                    Org Chart
                    </span>
                </li>
                <li>Link 3</li>
            </ul>
        </div>

    </div>
  )
}

export default Sidebar