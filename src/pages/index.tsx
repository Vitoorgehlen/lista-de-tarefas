import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Task } from "@/components/Task";
import { BsExclamationOctagonFill, BsHourglassSplit } from "react-icons/bs";
import { GiTurtle } from "react-icons/gi";

interface ITask {
  title: string;
  isDone: boolean;
  priority: number;
}

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState("");
  const [isFirst, setFirst] = useState(true);
  const [newTaskPriority, setNewTaskPriority] = useState(2);

  function handleNewTask() {
    if (newTask !== "") {
      let updatedTasks = [...tasks];
      updatedTasks.push({
        title: newTask,
        isDone: false,
        priority: newTaskPriority,
      });
      setTasks(updatedTasks);
      setNewTask("");
    }
  }

  function handleTaskDone(index: number) {
    let updatedTasks = [...tasks];
    updatedTasks[index].isDone = !updatedTasks[index].isDone;
    setTasks(updatedTasks);
  }

  function handleDeleteTask(index: number) {
    let updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  }

  useEffect(() => {
    if (!isFirst) {
      localStorage.setItem("localTasks", JSON.stringify({ saveTasks: tasks }));
    }
  }, [tasks]);

  useEffect(() => {
    const data = localStorage.getItem("localTasks");
    if (data) {
      setTasks(JSON.parse(data).saveTasks);
    }
    setFirst(false);
  }, []);

  return (
    <>
      <Head>
        <title>Lista de Tarefas</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <header className="py-4 gap-4 bg-black rounded-b-3xl">
          <h1 className="flex justify-center text-3xl text-white font-mono font-semibold">
            Minhas Tarefas
          </h1>

          <div className="flex lg:flex-row flex-col justify-center py-2 items-center gap-3">
            <input
              className="w-4/5 lg:w-3/5 bg-[#3e4651] text-white placeholder:text-black border-2 rounded-md border-[#7b0097] py-1 px-2"
              type="text"
              placeholder="Digite sua tarefa!!"
              value={newTask}
              onChange={(event) => {
                setNewTask(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  handleNewTask();
                }
              }}
            />
            <div className="flex items-center gap-4">
              <button
                className="text-3xl text-[#ff2895] transition-all"
                onClick={() => {
                  setNewTaskPriority(3);
                }}
                style={{
                  filter: newTaskPriority === 3 ? "none" : "grayscale(0.85)",
                  opacity: newTaskPriority === 1 ? "1" : "0.75",
                }}
              >
                <BsExclamationOctagonFill />
              </button>
              <button
                className="text-3xl text-[#78E45D] transition-all"
                onClick={() => {
                  setNewTaskPriority(2);
                }}
                style={{
                  filter: newTaskPriority === 2 ? "none" : "grayscale(0.85)",
                  opacity: newTaskPriority === 1 ? "1" : "0.75",
                }}
              >
                <BsHourglassSplit />
              </button>
              <button
                className="text-3xl text-[#3DE4F9] transition-all"
                onClick={() => {
                  setNewTaskPriority(1);
                }}
                style={{
                  filter: newTaskPriority === 1 ? "none" : "grayscale(0.85)",
                  opacity: newTaskPriority === 1 ? "1" : "0.75",
                }}
              >
                <GiTurtle />
              </button>

              <button
                className="cursor-pointer py-1 px-4 bg-[#7b0097] rounded-md text-white hover:active:brightness-75 transition-all "
                onClick={() => {
                  handleNewTask();
                }}
              >
                Criar
              </button>
            </div>
          </div>
        </header>
        <section className="flex flex-col gap-4 py-4 px-4 bg-[#1b1a1f] text-indigo-900">
          <h1 className="pl-10 text-xl font-semibold text-[#ff2895]">
            Pra ontem!!!
          </h1>
          {tasks.map((item, index) => {
            if (item.priority === 3) {
              return (
                <Task
                  key={index}
                  title={item.title}
                  isDone={item.isDone}
                  onCheck={() => {
                    handleTaskDone(index);
                  }}
                  onDelete={() => {
                    handleDeleteTask(index);
                  }}
                />
              );
            }
          })}
          <h1 className="pl-10 text-xl font-semibold text-[#78E45D]">
            Deveria ser feita hoje...
          </h1>
          {tasks.map((item, index) => {
            if (item.priority === 2) {
              return (
                <Task
                  key={index}
                  title={item.title}
                  isDone={item.isDone}
                  onCheck={() => {
                    handleTaskDone(index);
                  }}
                  onDelete={() => {
                    handleDeleteTask(index);
                  }}
                />
              );
            }
          })}
          <h1 className="pl-10 text-xl font-semibold text-[#3DE4F9]">
            Sem pressa, só se vive uma vez
          </h1>
          {tasks.map((item, index) => {
            if (item.priority === 1) {
              return (
                <Task
                  key={index}
                  title={item.title}
                  isDone={item.isDone}
                  onCheck={() => {
                    handleTaskDone(index);
                  }}
                  onDelete={() => {
                    handleDeleteTask(index);
                  }}
                />
              );
            }
          })}
        </section>
      </main>
    </>
  );
}
