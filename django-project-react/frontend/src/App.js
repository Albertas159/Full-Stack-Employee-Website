import React from "react";
import { Users } from "./Users";
import { UsersManage } from "./components/UsersManage";

import { SkillLevel } from "./Skill_Level";
import { SkillManage } from "./components/SkillManage";

import { Employee } from "./Employees";
import { EmployeesManage } from "./components/EmployeesManage";

import Header from './components/NavBar'
import {
  BrowserRouter,
  Route,
  Routes as Switch,
} from "react-router-dom";
import "./App.css";

import PrivateRoutes from "./ultils/PrivateRoute";

import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/RegisterPage";


function App() {
  return (
  
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
        <Header/>
          <Switch>
            <Route element={<PrivateRoutes />}>
              <Route element={<UsersManage />} path="UsersManage" />
              <Route element={<SkillManage />} path="SkillManage" />
              <Route element={<EmployeesManage />} path="EmployeesManage" />
            </Route>
            <Route element={<HomePage />} path="/" exact />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<Users />} path="/Users" />
            <Route element={<Register />} path="/register" />  
            <Route element={<Employee />} path="/Employees"  />
            <Route element={<SkillLevel/>} path="/Skill_Level"  />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
