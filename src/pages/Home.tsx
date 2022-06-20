import React, { useReducer, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findTask = tasks.find((item) => item.title === newTaskTitle);

    if (findTask) {
      Alert.alert(
        "Task Já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    } else {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };

      setTasks([...tasks, data]);
    }
  }

  function handleEditTask(taskId: number, taskNewTitle: string ) {
    const UpdatedTasks = tasks.map((task) => ({ ...task }));
    const foundTask = UpdatedTasks.find((item) => item.id === taskId);

    if (!foundTask) return;

    foundTask.title = taskNewTitle;

    setTasks(UpdatedTasks);
  }

  function handleToggleTaskDone(id: number) {
    const UpdatedTasks = tasks.map((task) => ({ ...task }));
    const foundTask = UpdatedTasks.find((item) => item.id === id);

    if (!foundTask) return;

    foundTask.done = !foundTask.done;

    setTasks(UpdatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que deseja remover esse item?", [
      {
        text: "Não",
      },
      {
        text: "Sim",
        onPress: () => setTasks(tasks.filter((task) => task.id !== id))
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
