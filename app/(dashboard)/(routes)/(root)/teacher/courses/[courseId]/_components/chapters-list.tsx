"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { PenBoxIcon } from "lucide-react";

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}
export const ChaptersList = ({
  items,
  onReorder,
  onEdit,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination?.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);
    const bulkUpdateData = updatedChapters.map((chapter, index) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id) + 1,
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-[#181622] border-2 border-[#853bce] text-white rounded-md mb-4 text-sm p-3 hover:bg-[#853bce]",
                      chapter.isPublished && "bg-[#291839] text-white"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && <Badge>Free</Badge>}
                      <div className="flex items-center gap-2">
                        <Badge
                          className={cn(
                            "bg-gray-500",
                            chapter.isPublished && "bg-[#853bce]"
                          )}>
                          {chapter.isPublished ? "Published" : "Draft"}
                        </Badge>
                        <PenBoxIcon
                          onClick={() => onEdit(chapter.id)}
                          className="w-4 h-4 cursor-pointer hover:text-[#291839] transition"></PenBoxIcon>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
