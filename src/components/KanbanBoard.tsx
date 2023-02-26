import { DndContext, rectIntersection } from "@dnd-kit/core";
import KanbanColumn from "./KanbanColumn";
import AddCard from "./AddCard";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Cards } from "./types";

export default function KanbanBoard() {
    const [todoItems, setTodoItems] = useState<Array<Cards>>([]);
    const [doneItems, setDoneItems] = useState<Array<Cards>>([]);
    const [inProgressItems, setInProgressItems] = useState<Array<Cards>>([]);
    const [uItems, setuItems] = useState<Array<Cards>>([
        {title: "Hire Nebojsa"},
        {title: "Give him 100k/year"},
        {title: "Give Signing Bonus"},
        {title: "Buy him Coffee"}
    ]);
    const newCard = (title: string) => {
        setuItems([...uItems, { title }]);
    };
    return (
        <DndContext
            collisionDetection={rectIntersection}
            onDragEnd={(e) => {
                const container = e.over?.id;
                const title = e.active.data.current?.title ?? "";
                const index = e.active.data.current?.index ?? 0;
                const parent = e.active.data.current?.parent ?? "ToDo";
                if (container === parent) {
                    return;
                }
                if (container === "ToDo") {
                    setTodoItems([...todoItems, { title }]);
                } else if (container === "Done") {
                    setDoneItems([...doneItems, { title }]);
                } else if (container === "Unassigned") {
                    setuItems([...uItems, { title }]);
                } else if (container === "In Progress") {
                    setInProgressItems([...inProgressItems, { title }]);
                } else if (container === "Remove") {
                    let doNothing = "nothing";
                } else {
                    return;
                }
                if (parent === "ToDo") {
                    setTodoItems([
                        ...todoItems.slice(0, index),
                        ...todoItems.slice(index + 1),
                    ]);
                } else if (parent === "Done") {
                    setDoneItems([
                        ...doneItems.slice(0, index),
                        ...doneItems.slice(index + 1),
                    ]);
                } else if (parent === "Unassigned") {
                    setuItems([
                        ...uItems.slice(0, index),
                        ...uItems.slice(index + 1)]
                    );
                } else if (parent === "In Progress") {
                    setInProgressItems([
                        ...inProgressItems.slice(0, index),
                        ...inProgressItems.slice(index + 1),
                    ]);
                }
            }}
        >
            <Flex 
                backgroundColor="blue.100"
                borderRadius="8"
                flex="1"
                padding="2"
                flexDirection="column"
            >
                <Flex flex="3">
                    <AddCard addCard={newCard} />
                </Flex>
                <Flex flex="3">
                    <KanbanColumn title="ToDo" items={todoItems} />
                    <KanbanColumn title="In Progress" items={inProgressItems} />
                    <KanbanColumn title="Done" items={doneItems} />
                    <KanbanColumn title="Unassigned" items={uItems} />
                    <KanbanColumn title="Remove" items={[]}/>
                </Flex>
            </Flex>
        </DndContext>
    );
}