import { BiEraser } from "react-icons/bi";
import { TfiCheck } from "react-icons/tfi";

interface TaskProps {
  title: string;
  isDone: boolean;

  onCheck: () => void;
  onDelete: () => void;
}

export function Task({ title, isDone, onCheck, onDelete }: TaskProps) {
  return (
    <div className="relative flex items-center justify-between after:absolute after:left-0 after:-bottom-2 after:right-0 after:h-px after:bg-cyan-400">
      <div className="flex items-center gap-4">
        <button
          className=" relative flex items-center justify-center h-6 w-6 min-w-6 border-indigo-900 border text-indigo-900 rounded-md"
          onClick={onCheck}
        >
          {isDone ? (
            <TfiCheck className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-2/3 text-2xl text-green-300" />
          ) : (
            ""
          )}
        </button>{" "}
        <h1
          style={{
            backgroundColor: isDone ? "#B0FC38" : "transparent",
          }}
          className="rounded"
        >
          &nbsp;{title}&nbsp;&nbsp;
        </h1>
      </div>
      <button className="text-xl text-red-500" onClick={onDelete}>
        <BiEraser />
      </button>
    </div>
  );
}
