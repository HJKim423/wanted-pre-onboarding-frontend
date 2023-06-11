import { useNavigate } from "react-router-dom";
import { ButtonSection } from "../SignIn/style";
import { Main, Title } from "../style";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <Title>지원자 김호정 사전과제</Title>
      <ButtonSection>
        <button onClick={() => navigate("/signup")}>회원가입 하러 가기</button>
      </ButtonSection>
      <ButtonSection>
        <button onClick={() => navigate("/signin")}>로그인 하러 가기</button>
      </ButtonSection>
      <ButtonSection>
        <button onClick={() => navigate("/todo")}>
          투두리스트 작성하러 가기
        </button>
      </ButtonSection>
    </Main>
  );
};

export default Home;
