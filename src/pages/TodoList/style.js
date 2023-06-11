import styled from "styled-components";

export const AddTodo = styled.div`
  display: flex;
  padding: 20px;
  input {
    margin-right: 10px;
  }
`;

export const TodoLists = styled.div`
  height: 40vh;
  width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
`;

export const TodoItem = styled.div`
  padding: 10px;
  button {
    float: right;
  }
`;
