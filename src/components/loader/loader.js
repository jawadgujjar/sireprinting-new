import React from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(1, 37, 125, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 15px rgba(1, 37, 125, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(1, 37, 125, 0);
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const boxMove = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
`;

const MainLoader = styled.div`
  width: 80px;
  height: 80px;
  border: 8px solid #00ffff;
  border-top: 8px solid #01257d;
  border-radius: 50%;
  animation: ${rotate} 1.5s linear infinite;
  position: relative;
  margin-bottom: 30px;
`;

const PulsingDot = styled.div`
  width: 20px;
  height: 20px;
  background-color: #01257d;
  border-radius: 50%;
  animation: ${pulse} 1.5s infinite;
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
`;

const BoxesContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const Box = styled.div`
  width: 20px;
  height: 20px;
  background-color: #01257d;
  animation: ${boxMove} 1.5s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  &:nth-child(2) {
    background-color: #00ffff;
  }
  
  &:nth-child(3) {
    background-color: #01257d;
  }
`;

const LoadingText = styled.div`
  margin-top: 30px;
  font-size: 18px;
  font-weight: bold;
  color: #01257d;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SireprintingLoader = () => {
  return (
    <LoaderContainer>
      <MainLoader>
        <PulsingDot />
      </MainLoader>
      <BoxesContainer>
        <Box delay="0s" />
        <Box delay="0.2s" />
        <Box delay="0.4s" />
      </BoxesContainer>
      <LoadingText>Packaging Your Vision</LoadingText>
    </LoaderContainer>
  );
};

export default SireprintingLoader;