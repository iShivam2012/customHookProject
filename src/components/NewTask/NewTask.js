import { useState } from "react";
import useHttp from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
 
  const addTask = (data, textData) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: textData };

    props.onAddTask(createdTask);
  }

  const {isLoading, error, sendRequest: sendTaskReq} = useHttp({url:"https://practiceproject-f4c6d-default-rtdb.firebaseio.com/tasks.json", method: "POST",
         headers: {
           "Content-Type": "application/json",
         } 
        }, addTask)
  
 
  const enterTaskHandler = async (taskText) => {
    sendTaskReq(taskText)
    } 

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
