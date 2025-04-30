import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Tasks from "./pages/Tasks"
import AppLayout from "./ui/AppLayout"
import Login from "./pages/Login"
import ProtectedRoute from "./auth/ProtectedRoute"




function App() {

  return (
    <Routes>
    <Route path="/login" element={<Login />} />

    {/* Protected routes */}
    <Route element={<ProtectedRoute allowedRoles={['admin']}/>}>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>
    </Route>
  </Routes>
  )
}

export default App
