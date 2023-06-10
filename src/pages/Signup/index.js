import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../api/core";
import { Input, Main } from "./style";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [passEmail, setPassEmail] = useState(false);
  const [passPassword, setPassPassword] = useState(false);

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

  useEffect(() => {
    if (passEmail && passPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [passEmail, passPassword]);

  return (
    <Main>
      <div>회원가입</div>
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
        <button data-testid="signup-button" disabled>
          회원가입
        </button>
      ) : (
        <button data-testid="signup-button" onClick={postSignUp}>
          회원가입
        </button>
      )}
    </Main>
  );
};

export default SignUp;
