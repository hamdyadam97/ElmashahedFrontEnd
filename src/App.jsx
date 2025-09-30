
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ClientForm from './pages/Client';
import ClientsPage from './pages/ClientsPage';
import ProtectedRoute from './ProtectedRoute';
import DetailedClientReport from './pages/DetailedClientReport';
import SuperuserRoute from './SuperuserRoute';
function App() {
  

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={
              <SuperuserRoute>
                <Signup />
              </SuperuserRoute>
            }
          />
          <Route path="/login" element={<Login />} />
           {/* <Route path="/client" element={<ClientForm />} />
           <Route path="/ClientPage" element={<ClientsPage />} /> */}
           <Route
            path="/client"
            element={
              <ProtectedRoute>
                <ClientForm />
              </ProtectedRoute>
            }
          />
           <Route
            path="/clientpage"
            element={
              <ProtectedRoute>
                <ClientsPage />
              </ProtectedRoute>
            }
          />
           <Route
            path="/detail"
            element={
              <ProtectedRoute>
                <DetailedClientReport />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
