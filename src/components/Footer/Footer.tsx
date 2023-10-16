import { TodosState } from "../../features/todo/todoSlice";
import TotalTodo from "./TotalTodo";

function Footer(props: TodosState) {
  return (
    <>
      <TotalTodo {...props} />
    </>
  );
}

export default Footer;
