import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  height: 90vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 3vw;
  font-weight: 600;
  padding-bottom: 20px;
`;

export const Input = styled.div`
  display: flex;
  padding: 10px;
  input {
    margin-left: 10px;
  }
  position: relative;
`;

export const AlertText = styled.div`
  font-size: 10px;
  color: gray;
  position: absolute;
  right: -120px;
  bottom: 10px;
  width: 120px;
`;
