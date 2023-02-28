import React, { useContext } from "react";

import AuthContext from "../context/AuthContext";
import { UsersManage } from "../components/UsersManage";
import { EmployeesManage } from "../components/EmployeesManage";
import { SkillManage } from "../components/SkillManage";
import { Users } from "../Users";
import { SkillLevel } from "../Skill_Level";
import { Employee } from "../Employees";
// import { Button } from "react-bootstrap";
import { useState } from "react";
// import { Nav } from "react-bootstrap";
import ParticlesBackground from "../components/ParticlesBackground";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const HomePage = () => {
  let { user } = useContext(AuthContext);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    await console.log(container);
}, []);

  return (
    <div className="App container">
      

      <ParticlesBackground/>

      {user ? (
        <>
        
          <header>
            <h2>Manage User Info</h2>
            <UsersManage></UsersManage>
          </header>
          
          <header>
            <h2>Manage Employee Info</h2>
            <EmployeesManage></EmployeesManage>
          </header>
          
          <header>
            <h2>Manage Skill Info</h2>
            <SkillManage></SkillManage>
          </header>
          
        </>
      ) : (
        <>
          <header>
            <h2>Basic User Info</h2>
            <Users></Users>
          </header>
          <header>
            <h2>Basic Employee Info</h2>
            <Employee></Employee>
          </header>
          <header>
            <h2>Skill level Info</h2>
            <SkillLevel></SkillLevel>
          </header>
        </>
      )}
            <Particles id="tsparticles" url="http://foo.bar/particles.json" init={particlesInit} loaded={particlesLoaded} />
    </div>
  );
};

export default HomePage;
