import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from './pages/Admin';
import AuthLayout from './pages/Auth';
import PublicLayout from './pages/Public';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AuthProvider from './store/AuthProvider';
import Board from './pages/Admin/Board';
import Analytics from './pages/Admin/Analytics';
import Settings from './pages/Admin/Settings';
import TaskProvider from './store/TaskProvider';
 /*
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <AdminLayout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: (
          <TaskProvider>
            <Board />
          </TaskProvider>
        ),
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      { path: 'settings', element: <Settings /> },
    ],
  },
  {
    path: '/auth',
    element: (
      <AuthProvider>
        <AuthLayout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/tasks/:taskId',
    element: <PublicLayout />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
*/

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
         <Route path="/settings" element={<Settings />} />
          <Route path='/analytics' element={<Analytics />} />
    {/*       <Route path="/edit/:id" element={<CreateJob />} />
          <Route path="*" element={<h1>Not Found</h1>} />   */}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
