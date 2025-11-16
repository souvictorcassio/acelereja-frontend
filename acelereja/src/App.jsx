import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import InstitutionRegister from "./pages/InstitutionRegister";
import InstitutionsList from "./pages/InstitutionsList";
import Profile from "./pages/Profile";
import GovDashboard from "./pages/GovDashboard";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import Sobre from "./pages/Sobre";
import PerguntasFrequentes from "./pages/PerguntasFrequentes";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/global.css";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Rotas protegidas */}
            <Route
              path="/instituicao/cadastro"
              element={
                <ProtectedRoute allowedTypes={["GOVERNO"]}>
                  <InstitutionRegister />
                </ProtectedRoute>
              }
            />

            <Route
              path="/instituicoes"
              element={
                <ProtectedRoute
                  allowedTypes={["GOVERNO", "POPULACAO", "INSTITUICAO"]}
                >
                  <InstitutionsList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedTypes={["POPULACAO"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/gov-dashboard"
              element={
                <ProtectedRoute allowedTypes={["GOVERNO"]}>
                  <GovDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/institution-dashboard"
              element={
                <ProtectedRoute allowedTypes={["INSTITUICAO"]}>
                  <InstitutionDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/faq" element={<PerguntasFrequentes />} />
            {/* Rota coringa (404) */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
