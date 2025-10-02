
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
import NewClientsPage from './pages/NewClient';
import GuestRoute from './GuestRoute';
function App() {
  

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route
            path="/signup"
            element={
              <SuperuserRoute>
                <Signup />
              </SuperuserRoute>
            }
          />
           <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          {/* <Route path="/login" element={<Login />} /> */}
          
           <Route
            path="/"
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
            <Route
            path="/newclient"
            element={
              <ProtectedRoute>
                <NewClientsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        
      </MainLayout>
    </Router>
  )
}

export default App
