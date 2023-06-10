import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../api/core";
import { saveJWT } from "../../utils/utility";
import { Input } from "./style";
import { Main } from "../style";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [passEmail, setPassEmail] = useState(false);
  const [passPassword, setPassPassword] = useState(false);

  useEffect(() => {
    if (passEmail && passPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [passEmail, passPassword]);

  const postSignIn = async () => {
    try {
      const url = `/auth/signin`;
      await request
        .post(url, {
          email,
          password,
        })
        .then(res => {
          if (res.status === 200) {
            saveJWT(res.data.access_token);
            navigate("/todo");
            alert("로그인에 성공하였습니다.");
          }
        });
    } catch (e) {
      alert("로그인을 다시 시도해주세요.");
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
      <div>로그인</div>
      <Input>
        <label htmlFor="email">이메일</label>
        <input
          data-testid="email-input"
          onChange={onCheckEmail}
          value={email}
        />
      </Input>

      <Input>
        <label htmlFor="password-input">비밀번호</label>
        <input
          data-testid="password-input"
          onChange={onCheckPassword}
          value={password}
          type="password"
        />
      </Input>

      {isDisabled ? (
        <button data-testid="signin-button" disabled>
          로그인
        </button>
      ) : (
        <button data-testid="signin-button" onClick={postSignIn}>
          로그인
        </button>
      )}
    </Main>
  );
};

export default SignIn;
