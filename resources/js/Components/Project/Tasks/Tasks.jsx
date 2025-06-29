import { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Column from "./Column";
import Card from "./Card";
import Separator from "./Separator";
import CreateTaskButton from "../CreateTaskButton";
import { router } from '@inertiajs/react';

dayjs.extend(customParseFormat);

function Tasks({
    tasksTodo,
    tasksInProgress,
    tasksDone,
    users,
    projectId,
    roles,
}) {
    const [tasksTodoState, setTasksTodoState] = useState(tasksTodo);
    const [tasksInProgressState, setTasksInProgressState] =
        useState(tasksInProgress);
    const [tasksDoneState, setTasksDoneState] = useState(tasksDone);

    const [activeTask, setActiveTask] = useState(null);

    function handleDragStart(event) {
        const taskId = event.active.id;
        const allTasks = [
            ...tasksTodoState,
            ...tasksInProgressState,
            ...tasksDoneState,
        ];
        const task = allTasks.find((t) => t.id === taskId);
        setActiveTask(task);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        setActiveTask(null);
        if (!over) return;

        const taskId = active.id;
        const destination = over.id;

        const lists = {
            todo: [tasksTodoState, setTasksTodoState],
            in_progress: [tasksInProgressState, setTasksInProgressState],
            done: [tasksDoneState, setTasksDoneState],
        };

        let origin = null;
        for (const key in lists) {
            if (lists[key][0].some((task) => task.id === taskId)) {
                origin = key;
                break;
            }
        }

        if (!origin) return;

        // Origin = Destination : Reset ( ReRender )
        if (origin === destination) {
            const [, setList] = lists[origin];
            setList((prev) => [...prev]);
            return;
        }

        // Delete Task ( Origin )
        const [originList, setOriginList] = lists[origin];
        const movedTask = originList.find((task) => task.id === taskId);
        setOriginList((prev) => prev.filter((task) => task.id !== taskId));

        // Add Task ( Destination )
        const [, setDestinationList] = lists[destination];
        setDestinationList((prev) => [...prev, movedTask]);

        // ➕ Mise à jour dans la base via Inertia
        router.put(
            `/project/${projectId}/${taskId}/status-update`,
            { status: destination },
            {
                preserveScroll: true,
                onError: (errors) => {
                    console.error("Erreur de mise à jour du statut :", errors);
                },
            }
        );
    }

    function getSortedTasks(tasks) {
        return tasks.slice().sort((a, b) => {
            const dateA = new Date(a.due_date);
            const dateB = new Date(b.due_date);

            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;

            return a.priority - b.priority;
        });
    }

    console.log("TasksTodo : ", tasksTodoState);

    return (
        <div className="tasks flex flex-col bg-dark-secondary rounded-[20px] px-[30px] py-[30px] gap-[20px] overflow-hidden">
            {/* Sticky header that sticks at its original position */}
            <div className="head flex justify-between ">
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
            <div className="heading-col flex justify-between">
                <h3 className="flex-1 text-[18px] text-gray-title-secondary leading-[18px] font-semibold [letter-spacing:-0.05em] pl-[10px]">
                    todo
                </h3>
                <h3 className="flex-1 text-[18px] text-gray-title-secondary leading-[18px] font-semibold [letter-spacing:-0.05em] pl-[10px]">
                    in progress
                </h3>
                <h3 className="flex-1 text-[18px] text-gray-title-secondary leading-[18px] font-semibold [letter-spacing:-0.05em] pl-[10px]">
                    complete
                </h3>
            </div>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="body flex justify-between h-full overflow-hidden">
                    <Separator />
                    <Column id="todo">
                        {[...tasksTodoState]
                            .reverse()
                            .map((task) =>
                                activeTask?.id === task.id ? null : (
                                    <Card
                                        key={task.id}
                                        task={task}
                                        projectId={projectId}
                                        users={users}
                                        roles={roles}
                                    />
                                )
                            )}
                    </Column>
                    <Separator />
                    <Column id="in_progress">
                        {[...tasksInProgressState]
                            .reverse()
                            .map((task) =>
                                activeTask?.id === task.id ? null : (
                                    <Card
                                        key={task.id}
                                        task={task}
                                        projectId={projectId}
                                        users={users}
                                        roles={roles}
                                    />
                                )
                            )}
                    </Column>
                    <Separator />
                    <Column id="done">
                        {[...tasksDoneState]
                            .reverse()
                            .map((task) =>
                                activeTask?.id === task.id ? null : (
                                    <Card
                                        key={task.id}
                                        task={task}
                                        projectId={projectId}
                                        users={users}
                                        roles={roles}
                                    />
                                )
                            )}
                    </Column>
                    <Separator />
                </div>

                <DragOverlay>
                    {activeTask ? (
                        <Card
                            task={activeTask}
                            projectId={projectId}
                            isOverlay
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}

export default Tasks;
