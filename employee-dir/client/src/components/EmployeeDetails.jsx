import '../css/EmployeeList.css'

const EmployeeDetails = ({ employee, onClose }) => {
  return (
    <div className="employee-popup-overlay" onClick={onClose}>
      <div className="employee-popup" onClick={(event) => event.stopPropagation()}>
        <div className="details-panel-header">
          <div className="popup-header-info">
            <img
              className="popup-profile-img"
              src={employee.image}
              alt={`${employee.firstName} ${employee.lastName}`}
            />
            <div>
              <h3>{`${employee.firstName} ${employee.lastName}`}</h3>
              <p className="popup-role">{employee.company?.title || 'Employee'}</p>
            </div>
          </div>
          <button type="button" onClick={onClose}>Close</button>
        </div>

        <div className="details-grid">
          <p><strong>Address:</strong> {`${employee.address?.address || 'N/A'}, ${employee.address?.city || ''}`}</p>
          <p><strong>Age:</strong> {employee.age || 'N/A'}</p>
          <p><strong>Gender:</strong> {employee.gender || 'N/A'}</p>
          <p><strong>Date of Birth:</strong> {employee.birthDate || 'N/A'}</p>
          <p><strong>Company:</strong> {employee.company?.name || 'N/A'}</p>
          <p><strong>Department:</strong> {employee.company?.department || 'N/A'}</p>
          <p><strong>University:</strong> {employee.university || 'N/A'}</p>
          <p><strong>Username:</strong> {employee.username || 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetails
