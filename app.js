const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");


// for each draggable element
draggables.forEach(draggable => {
    // Event listener for the start of dragging an element
    draggable.addEventListener('dragstart', () => {
        // When an element is being dragged it has the class of 'dragging'
        draggable.classList.add('dragging')
    });

    // Event listener for when the item is not longer being dragged
    draggable.addEventListener('dragend', () => {
        // Remove 'dragging' class once element is dropped
        draggable.classList.remove('dragging')
    })
})

// for each container
containers.forEach(container => {
    // Event listener for whenever a container is being dragged over
    container.addEventListener('dragover', e => {
        // Prevent any default functionality
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }
        // Identify the element being dragged using the 'dragging' class
        
        // When container is being dragged over by element with class 'dragging' append that element as a child of the container
        
    })
})

// Uses the y position of the mouse, will return whichever element the mouse position is directly after
function getDragAfterElement(container, y) {
    // Gets every element in the container that we're not currently dragging, puts in an array
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    // Determine which single element is directly after the cursor
    return draggableElements.reduce((closest, child) => {
        // Using the bounds of the elements and y position of cursor, determine where is above the box
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height/2
        // we want the offset of the cursor from the top of the box to be less than 0 (above) but as close as possible to 0
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        }
            else {
                return closest
            }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}