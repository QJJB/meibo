import { useEffect, useState, useRef } from "react";
import { DndContext } from "@dnd-kit/core";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Column from "./Column";
import Separator from "./Separator";
import CreateTaskButton from "../CreateTaskButton";
dayjs.extend(customParseFormat);

function Tasks({
    tasksTodo,
    tasksInProgress,
    tasksDone,
    users,
    projectId,
    roles,
}) {
    const todayFormatted = dayjs().format("MMM, YYYY");

    const [tasksTodoState, setTasksTodoState] = useState(tasksTodo);
    const [tasksInProgressState, setTasksInProgressState] =
        useState(tasksInProgress);
    const [tasksDoneState, setTasksDoneState] = useState(tasksDone);

    console.log("DATA TODO:", tasksTodo);
    console.log("STATE TODO:", tasksTodoState);
    console.log("DATA INPROGRESS:", tasksInProgress);
    console.log("STATE INPROGRESS:", tasksInProgressState);
    console.log("DATA: DONE", tasksDone);
    console.log("STATE: DONE", tasksDoneState);

    function handleDragEnd(event) {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id;
        const destination = over.id;

        // Origin - Task : tasksTodoState ? tasksInProgressState ? tasksDoneState ?
        let origin = null;
        if (tasksTodoState.find((task) => task.id === taskId)) {
            origin = "todo";
        } else if (tasksInProgressState.find((task) => task.id === taskId)) {
            origin = "in_progress";
        } else if (tasksDoneState.find((task) => task.id === taskId)) {
            origin = "done";
        }

        // Origin === Destination : STOP
        if (origin === destination) return;

        // Suppression de la Task de Origin
        let movedTask = null;
        if (origin === "todo") {
            movedTask = tasksTodoState.find((task) => task.id === taskId);
            setTasksTodoState((prev) =>
                prev.filter((task) => task.id !== taskId)
            );
        } else if (origin === "in_progress") {
            movedTask = tasksInProgressState.find((task) => task.id === taskId);
            setTasksInProgressState((prev) =>
                prev.filter((task) => task.id !== taskId)
            );
        } else if (origin === "done") {
            movedTask = tasksDoneState.find((task) => task.id === taskId);
            setTasksDoneState((prev) =>
                prev.filter((task) => task.id !== taskId)
            );
        }

        // Ajouter de la Taks dans la Destination
        if (destination === "todo") {
            setTasksTodoState((prev) => [...prev, movedTask]);
        } else if (destination === "in_progress") {
            setTasksInProgressState((prev) => [...prev, movedTask]);
        } else if (destination === "done") {
            setTasksDoneState((prev) => [...prev, movedTask]);
        }
    }

    return (
        <div className="tasks bg-dark-secondary rounded-[20px] px-[30px] py-[30px] overflow-hidden">
            {/* Sticky header that sticks at its original position */}
            <div className="head flex justify-between">
                <div className="left flex gap-5 items-center">
                    <h2 className="text-white-title text-[30px] leading-[30px] font-semibold [letter-spacing:-0.05em]">
                        Tasks
                    </h2>
                    <div className="separator w-[3px] h-[33px] bg-header-separation rounded-[3px]"></div>
                    <p className="text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em]">
                        <p className="text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em]">
                            {tasksTodoState.length +
                                tasksInProgressState.length ===
                            0
                                ? "No tasks remaining"
                                : `${
                                      tasksTodoState.length +
                                      tasksInProgressState.length
                                  } task${
                                      tasksTodoState.length +
                                          tasksInProgressState.length >
                                      1
                                          ? "s"
                                          : ""
                                  } left`}
                        </p>
                    </p>
                </div>
                <CreateTaskButton
                    users={users}
                    projectId={projectId}
                    roles={roles}
                />
            </div>
            <DndContext onDragEnd={handleDragEnd}>
                <div className="body flex justify-between h-full py-[30px]">
                    <Separator />
                    <Column
                        id="todo"
                        title={"todos"}
                        tasks={tasksTodoState}
                        projectId={projectId}
                    />
                    <Separator />
                    <Column
                        id="in_progress"
                        title={"in progress"}
                        tasks={tasksInProgressState}
                        projectId={projectId}
                    />
                    <Separator />
                    <Column
                        id="done"
                        title={"complete"}
                        tasks={tasksDoneState}
                        projectId={projectId}
                    />
                    <Separator />
                </div>
            </DndContext>
        </div>
    );
}

export default Tasks;
