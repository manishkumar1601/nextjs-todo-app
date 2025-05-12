import { Todo } from "@/constants";
import { Icon } from "@iconify/react/dist/iconify.js";

interface TodoListProps {
  todo: Todo;
  handleCheckTodo: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
}

const TodoList = ({
  todo,
  handleCheckTodo,
  handleDeleteTodo,
}: TodoListProps) => {
  return (
    <li key={todo?.id} className="flex items-center justify-between gap-4 my-4 bg-white text-black rounded-4xl p-4 min-w-[25rem] max-w-[25rem]">
      <span className={`${todo?.isCompleted && "line-through"}`}>
        {todo?.content}
      </span>
      <div className="flex items-center gap-4">
        <button
          className="bg-green-600 rounded-full w-8 h-8 text-white cursor-pointer"
          onClick={() => handleCheckTodo(todo?.id!)}
        >
          <Icon
            icon="material-symbols:check-rounded"
            style={{ width: "32px", height: "32px" }}
          />
        </button>
        <button
          className="bg-red-600 rounded-full w-8 h-8 text-white cursor-pointer"
          onClick={() => handleDeleteTodo(todo?.id!)}
        >
          <Icon icon="typcn:delete" style={{ width: "32px", height: "32px" }} />
        </button>
      </div>
    </li>
  );
};

export default TodoList;
