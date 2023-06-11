import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../api/core";
import { getJWT } from "../../utils/utility";
import { ButtonSection } from "../SignIn/style";
import { AlertText, Main, Title, Input } from "../style";

const SignUp = () => {
  const token = getJWT();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [passEmail, setPassEmail] = useState(false);
  const [passPassword, setPassPassword] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/todo");
    }
  }, []);

  useEffect(() => {
    if (passEmail && passPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [passEmail, passPassword]);

  const postSignUp = async () => {
    try {
      const url = `/auth/signup`;
      await request
        .post(url, {
          email,
          password,
        })
        .then(res => {
          if (res.status === 201) {
            navigate("/signin");
            alert("회원가입에 성공하였습니다.");
          }
        });
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const onCheckEmail = e => {
    if (e.target.value.includes("@")) {
      setPassEmail(true);
    } else {
      setPassEmail(false);
    }
    setEmail(e.target.value);
  };

  const onCheckPassword = e => {
    if (e.target.value.length >= 8) {
      setPassPassword(true);
    } else {
      setPassPassword(false);
    }
    setPassword(e.target.value);
  };

  return (
    <Main>
      <Title>회원가입</Title>
      <Input>
        <label htmlFor="email">이메일</label>
        <input
          data-testid="email-input"
          onChange={onCheckEmail}
          value={email}
        />
        {!passEmail && email.length > 0 && (
          <AlertText>@를 포함해주세요.</AlertText>
        )}
      </Input>

      <Input>
        <label htmlFor="password-input">비밀번호</label>
        <input
          data-testid="password-input"
          onChange={onCheckPassword}
          value={password}
          type="password"
        />
        {!passPassword && password.length > 0 && (
          <AlertText>8자 이상 입력해주세요.</AlertText>
        )}
      </Input>

      <ButtonSection>
        <button
          data-testid="signup-button"
          disabled={isDisabled}
          onClick={postSignUp}
        >
          회원가입
        </button>
      </ButtonSection>
    </Main>
  );
};

export default SignUp;
