import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableImage = ({ img }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: img.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "5px",
        cursor: "grab",
        background: "#fff"
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <img src={img.path} alt={img.filename} width="100" />
            <p>{img.filename}</p>
        </div>
    );
};

export default SortableImage;