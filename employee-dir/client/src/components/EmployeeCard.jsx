import '../css/EmployeeCard.css'
import person1 from "../assets/Profiles/person1.png";

const EmployeeCard = ({ name, role, email, phno, dept, image, onClick, isSelected }) => {
  return (
    <div
      className={`employee-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick?.()
        }
      }}
    >
      <div className="name-status">
        <img src={image || person1} alt={name} />
        <span>
          <h3>{name}</h3>
          <p>{role}</p>
        </span>
      </div>

      <div className='employee-details'>
        <p className='email'>Email: {email}</p>
        <p className='phno'>Contact: {phno}</p>
        <p className='dept'>Department: <span className='dept-name'>{dept}</span></p>
      </div>
    </div>
  )
}

export default EmployeeCard