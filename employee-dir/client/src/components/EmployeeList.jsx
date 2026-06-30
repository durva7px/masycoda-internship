import { useCallback, useEffect, useMemo, useState } from "react"
import EmployeeCard from "./EmployeeCard"
import EmployeeDetails from "./EmployeeDetails"
import Searchbar from "./Searchbar"
import '../css/EmployeeList.css'

const EmployeeList = () => {
  const [allEmployees, setAllEmployees] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const fetchEmployees = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setLoading(true)
    } else {
      setRefreshing(true)
    }

    setError('')

    try {
      const response = await fetch('https://dummyjson.com/users')
      if (!response.ok) {
        throw new Error('Unable to load employee records right now.')
      }

      const data = await response.json()
      setAllEmployees(data.users || [])
      setSelectedEmployee(null)
    } catch (err) {
      setAllEmployees([])
      setError(err.message || 'Failed to fetch employees.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    const loadEmployees = async () => {
      await fetchEmployees(true)
    }

    loadEmployees()
  }, [fetchEmployees])

  const visibleEmployees = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()

    if (!searchTerm) {
      return allEmployees
    }

    return allEmployees.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
      return fullName.includes(searchTerm) || user.firstName.toLowerCase().includes(searchTerm) || user.lastName.toLowerCase().includes(searchTerm)
    })
  }, [allEmployees, query])

  const refreshEmployees = () => {
    setQuery('')
    fetchEmployees(false)
  }

  return (
    <div className="matrix">
      <div className="employee-list-toolbar">
        <Searchbar value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="refresh-btn" onClick={refreshEmployees} disabled={refreshing}>
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {loading ? (
        <p className="state-message">Loading employees...</p>
      ) : error ? (
        <p className="state-message error">{error}</p>
      ) : visibleEmployees.length === 0 ? (
        <p className="state-message">No employee records found.</p>
      ) : (
        <div className="content-grid">
          <div className="columns">
            {visibleEmployees.map((user) => (
              <EmployeeCard
                key={user.id}
                name={`${user.firstName} ${user.lastName}`}
                role={user.company?.title || 'Employee'}
                email={user.email}
                phno={user.phone}
                dept={user.company?.department || 'General'}
                image={user.image}
                onClick={() => setSelectedEmployee(user)}
                isSelected={selectedEmployee?.id === user.id}
              />
            ))}
          </div>
        </div>
      )}

      {selectedEmployee && (
        <EmployeeDetails employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
      )}
    </div>
  )
}

export default EmployeeList