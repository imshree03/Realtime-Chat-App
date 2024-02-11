import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const asyncf = async () => {
      const data = await JSON.parse(localStorage.getItem("chat-app-user"));
      setUserName(data.username);
    };
    asyncf();
  }, []);

  // console.log(userName);

  return (
    <Container>
      <img src={Robot} alt="RobotImage" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

export default Welcome;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
