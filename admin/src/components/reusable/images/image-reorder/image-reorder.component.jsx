import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableImage from "./sortable-image/sortable-image.component";

// const handleSave = async (reorderedImages) => {
//     try {
//         const response = await fetch(`/api/sections/${sectionId}/images/order`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ images: reorderedImages })
//         });

//         if (!response.ok) throw new Error("Failed to update order");
//         console.log("Order updated successfully");
//     } catch (err) {
//         console.error("Error saving image order:", err);
//     }
// };


const ImageReorder = ({ initialImages, onSave }) => {
    const [images, setImages] = useState(initialImages);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = images.findIndex(img => img.id === active.id);
        const newIndex = images.findIndex(img => img.id === over.id);

        const newOrder = arrayMove(images, oldIndex, newIndex);
        setImages(newOrder);
    };

    const handleSave = async () => {
        const reorderedImages = images.map((img, index) => ({
            imageId: img.id,
            order: index
        }));

        await onSave(reorderedImages); // Calls backend API
    };

    return (
        <div>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={images.map(img => img.id)} strategy={verticalListSortingStrategy}>
                    {images.map((img) => (
                        <SortableImage key={img.id} img={img} />
                    ))}
                </SortableContext>
            </DndContext>
            <button onClick={() => handleSave}>Save Order</button>
        </div>
    );
};

export default ImageReorder;