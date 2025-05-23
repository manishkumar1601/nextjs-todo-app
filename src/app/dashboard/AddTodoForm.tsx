import { FormEvent } from "react";

interface AddTodoFormProps {
    inputValue: string;
    handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
    setInputValue: (value: string) => void;
}

const AddTodoForm = ({inputValue, handleFormSubmit, setInputValue}: AddTodoFormProps) => {
  return (
    <form className="flex" onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="bg-white text-black p-4 rounded-l-xl outline-none focus:outline-none"
        autoComplete="off"
      />
      <button
        type="submit"
        className="todo-button bg-[#5dacdd] text-white cursor-pointer p-4 rounded-r-xl font-bold hover:bg-[#eec519]"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTodoForm;
