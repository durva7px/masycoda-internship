import '../css/Searchbar.css'

const Searchbar = ({ value, onChange }) => {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search by first or last name"
        value={value}
        onChange={onChange}
      />
      <img src="/magnifying-glass-solid-full.svg" alt="Search" className="search-icon" />
    </div>
  )
}

export default Searchbar