import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Button } from '~/component/Button';
import { AuthProvider, useAuth } from './context';
import { IRouteWrapper } from './type';
import LoginForm from './Login';
import Translator from '~/feature/translator';
import { AuthRoutePath } from '~/routes';
import Dashboard from '~/page/Dashboard';
import Layout from '~/feature/layout';
import { getUser } from '~/storage/auth';
import Statistical from '~/page/Statistical';
import Setting from '~/page/Setting';
import Report from '~/page/Report';
import RegisterPage from '~/page/Register';
import UserUpdate from '~/page/UserUpdate';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: IRouteWrapper) => {
  const user = getUser();
  console.log({ ProtectedRoute: user });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // TODO: add user role
  // if (allowedRoles && !allowedRoles.includes(user.role)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

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
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <Routes>
                  {[
                    <Route
                      path={AuthRoutePath.DASHBOARD}
                      element={<Dashboard />}
                    />,
                    <Route
                      path={AuthRoutePath.TRANSLATE}
                      element={<Translator />}
                    />,
                    <Route
                      path={AuthRoutePath.REGISTRATION}
                      element={<RegisterPage />}
                    />,
                    <Route
                      path={AuthRoutePath.SETTING}
                      element={<Setting />}
                    />,
                    <Route
                      path={AuthRoutePath.USER_UPDATE}
                      element={<UserUpdate />}
                    />,
                    <Route
                      path={AuthRoutePath.STATISTICAL}
                      element={<Statistical />}
                    />,
                    <Route path={AuthRoutePath.REPORT} element={<Report />} />,
                  ].map((r) => {
                    return (
                      <Route element={<Layout />} key={r.key}>
                        {r}
                      </Route>
                    );
                  })}
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
