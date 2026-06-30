import Header from './components/Header'
import EmployeeList from './components/EmployeeList'
import './App.css'

const App = () => {
  return (
    <div className="app">
      <div className="main-content">
        <Header />
        <EmployeeList />
      </div>
    </div>
  )
}

export default App