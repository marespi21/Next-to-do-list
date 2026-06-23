"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../components/Card";
import {
  addTask as createTask,
  deleteTask as removeTask,
  getTodolist,
  updateTask,
} from "../services/todolist";
import { useTranslation } from "@/src/context/i18nContext";

interface todoListProps {
  id: string;
  title: string;
  startDate?: number;
  endDate?: number;
  state: "pending" | "inProgress" | "done";
}

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const [valor, setValor] = useState("");
  const [todoList, setTodoList] = useState<todoListProps[]>([]);

  const fetchData = async () => {
    const info = await getTodolist();
    const tasksFromApi: todoListProps[] = (info?.data ?? []).map((task: any) => ({
      id: String(task._id),
      title: task.title,
      state: task.state,
      startDate: task.dataStart ? new Date(task.dataStart).getTime() : undefined,
      endDate: task.dataEnd ? new Date(task.dataEnd).getTime() : undefined,
    }));
    setTodoList(tasksFromApi);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTask = async () => {
    if (valor.trim() === "") {
      return;
    }

    const response = await createTask({
      title: valor,
      state: "pending",
      dataStart: new Date().toISOString(),
    });

    if (response?.code === 201) {
      await fetchData();
    }

    setValor("");
  };

  const startTask = async (id: string) => {
    const response = await updateTask({
      id,
      state: "inProgress",
      dataStart: new Date().toISOString(),
    });

    if (response?.code === 200) {
      await fetchData();
    }
  };

  const endTask = async (id: string) => {
    const currentTask = todoList.find((task) => task.id === id);
    const startDate = currentTask?.startDate
      ? new Date(currentTask.startDate).toISOString()
      : new Date().toISOString();

    const response = await updateTask({
      id,
      state: "done",
      dataStart: startDate,
      dataEnd: new Date().toISOString(),
    });

    if (response?.code === 200) {
      await fetchData();
    }
  };

  const deleteTask = async (id: string) => {
    const response = await removeTask({ id });

    if (response?.code === 200) {
      await fetchData();
    }
  };

  const pendingTasks = todoList.filter(
    (task) => task.state === "pending" || task.state === "inProgress",
  );
  const doneTasks = todoList.filter((task) => task.state === "done");

  const renderCard = (task: todoListProps) => (
    <Card
      key={task.id}
      description={task.title}
      state={task.state}
      startDate={task.startDate}
      endDate={task.endDate}
      id={task.id}
      handleStart={startTask}
      handleEnd={endTask}
      handleDelete={deleteTask}
    />
  );

  const goToAdmin = () => {
    router.push("/admin/users");
  };

  const goToLoadImg = () => {
    router.push("/loadimg");
  };

  const goToImgList = () => {
    router.push("/imglist");
  };

  const goToAiWriter = () => {
    router.push("/ai-writer");
  };

  return (
    <div id="root" className="todo-app">
      <header className="todo-header">
        <h1>{t.home.title}</h1>
        <p className="todo-subtitle">{t.home.subtitle}</p>
      </header>

      <div className="todo-form">
        <input
          type="text"
          placeholder={t.home.placeholder}
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />
        <button type="button" className="btn-add" onClick={addTask}>
          <span className="btn-add-icon" aria-hidden>
            +
          </span>
          {t.common.add}
        </button>
        <button type="button" className="btn-add" onClick={goToAdmin}>
          {t.common.goToAdmin}
        </button>
        <button type="button" className="btn-add" onClick={goToLoadImg}>
          {t.images.uploadNew}
        </button>
        <button type="button" className="btn-add" onClick={goToImgList}>
          {t.images.viewList}
        </button>
        <button type="button" className="btn-add" onClick={goToAiWriter}>
          {t.ai.open}
        </button>
      </div>

      <div className="todo-columns">
        <section className="todo-column todo-column--pending">
          <div className="column-header">
            <span className="column-icon column-icon--pending" aria-hidden />
            <h2>{t.home.pending}</h2>
            <span className="column-badge">{pendingTasks.length}</span>
          </div>
          <div className="column-body">
            {pendingTasks.length === 0 ? (
              <p className="column-empty">{t.home.noPending}</p>
            ) : (
              pendingTasks.map(renderCard)
            )}
          </div>
        </section>

        <section className="todo-column todo-column--done">
          <div className="column-header">
            <span className="column-icon column-icon--done" aria-hidden />
            <h2>{t.home.done}</h2>
            <span className="column-badge column-badge--done">
              {doneTasks.length}
            </span>
          </div>
          <div className="column-body">
            {doneTasks.length === 0 ? (
              <p className="column-empty">{t.home.noDone}</p>
            ) : (
              doneTasks.map(renderCard)
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
