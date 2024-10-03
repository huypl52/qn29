import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Button } from "~/component/Button";
import { AuthProvider, useAuth } from "./context";
import { IRouteWrapper } from "./type";
import LoginForm from "./Login";
import Translator from "~/feature/translator";
import { AuthRoutePath } from "~/routes";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: IRouteWrapper) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Login Component
// Example Protected Pages
const AdminDashboard = () => {
  const { logout } = useAuth();
  return (
    <div className="p-4">
      <h1>Admin Dashboard</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

const UserDashboard = () => {
  const { logout } = useAuth();
  return (
    <div className="p-4">
      <h1>User Dashboard</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

const Unauthorized = () => (
  <div className="p-4">
    <h1>Unauthorized Access</h1>
    <p>You don't have permission to access this page.</p>
  </div>
);

// Main App Component
const AuthContainer = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={AuthRoutePath.LOGIN} element={<LoginForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Routes>
                  <Route
                    path={AuthRoutePath.DASHBOARD}
                    element={<UserDashboard />}
                  />
                  <Route
                    path={AuthRoutePath.TRANSLATE}
                    element={<Translator />}
                  />
                </Routes>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/"
            element={<Navigate to={AuthRoutePath.LOGIN} replace />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AuthContainer;
