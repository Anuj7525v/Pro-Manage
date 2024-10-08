import React from 'react';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import LoginPage from './pages/user/loginPage';
import RegisterPage from './pages/user/registerPage';
import { Toaster } from "react-hot-toast";
import Dashboard from './pages/dashboard/dashboard';
import Analytics from './pages/analytics/Analytics';
import Settings from './components/setting/Settings';
import Sharepage from './pages/share/Sharepage';
//import ProtectedRoute from './components/ProtectedRoute';
function App() {
    return (
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/register" element={<RegisterPage />} />
                <Route path="/share/:id" element={<Sharepage/>}/>


               <Route 
               
                    path="/dashboard" 
                    element={
                     
                            <Dashboard />
                           
                       
                    } 
                />
                <Route 
                    path="/analytics" 
                    element={
                 
                            <Analytics />
                           
                      
                    } 
                />
                <Route 
                    path="/setting" 
                    element={
                   
                            <Settings />
                            
                      
                    } 
                />
                
              
            </Routes>  
            <Toaster />
        </BrowserRouter>
    );
}

export default App;