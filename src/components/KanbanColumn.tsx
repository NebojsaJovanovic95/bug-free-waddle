import { Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./KanbanCard";
import { Cards } from "./types";

interface KanbanColumnProps {
    title: string;
    items: Cards[];
}

export default function KanbanColumn(
        {title, items}: KanbanColumnProps) {
    const { setNodeRef } = useDroppable({
        id: title
    });
    return (
        <Flex
            flex="3"
            padding="5"
            flexDirection="column"
            minH="10rem"
        >
            <Text fontSize='4xl' color='navy'>{title}</Text>
            <Flex
                ref={setNodeRef}
                backgroundColor="gray.200"
                borderRadius="8"
                flex="1"
                padding="2"
                flexDirection="column"
                boxShadow="0px 0px 5px 5px #2121213b"
            >
                {items.map(({ title: cardTitle }, key) => (
                    <KanbanCard
                        title={cardTitle}
                        key={key} index={key}
                        parent={title}
                    />
                ))}
            </Flex>
        </Flex>
    );
}