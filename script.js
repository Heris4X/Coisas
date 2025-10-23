
const itemInput = document.getElementById('item-input');
const addBtn = document.getElementById('add-btn');
const itemList = document.getElementById('item-list');
const feedbackMessage = document.getElementById('feedback-message');
const includeImageCheck = document.getElementById('include-image');


let draggedItem = null;


function showFeedback(message, type) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = `feedback ${type}`; 

    
    setTimeout(() => {
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback';
    }, 3000);
}


function addItem() {
    const itemText = itemInput.value.trim();

    
    if (itemText.length < 5) {
        showFeedback('Erro: O item deve ter no mínimo 5 caracteres.', 'error');
        return; 
    }

    
    const li = document.createElement('li');
    li.className = 'list-item';
    li.draggable = true; 

    
    if (includeImageCheck.checked) {
        const img = document.createElement('img');
        
        img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABDlBMVEX///8AAAA61JjbjcTgXmFri8rPz8+enp4YFxjLy8vr6+yXl5cJCAv4+Ph1dXVKSkq8vLzg4OCkpKTx8fHa2tqwsLBmZmZ4eHheXl7l5eUqKirDw8OKioqqqqoyMjJra2vtY2Y6OjoeHh6Dg4NTU1M/Pz+Pj48oKCg83p9HR0flk80TCgBwktReeKsaGhpZWVkbUjwul206u4gUHRkaMSccNis5x48nc1Qqg2A3tYMaQDAhTTsyn3QmZUwOKB1uTGSxd6DSjL3Cg7COYIAqGRmUQELFV1l4OjuAW3VAIiJON0fUW16yTU9pMjMFEgs7LjdSQ05TKSogEhMeIiwiKzw+Tm5IW4FXa5Nogrg4QFJUhrpUAAAJ8klEQVR4nO2d/VvbNhDHCYQQwmtIeAkhhPDSQEppYRtb220F2q5by7ZuXd/+/39kkR3bsn06SSfHdp/nPr/FthR9Y/l0upOcmRmGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYWxptRbXBZ1GwQ1pNLx2LLZaGVZaW9iqVyKG273aSobVG9Pube9L7aj3F9pZVNvdqUCcLXSyqN2YxsIa2I7+omPFm2C1PnuZNN2MB+pm1DddKj5CBFZWs2q+AX2sIUcOFZdG4eq0FO5hFR8O9vMRubo7OMQaQn5cmlitE4a1BML+JI9ZMC7dSRxqoz10As3swcZLw9K4IKXchHHpJUq5NYrAHqmJC+OSdf1lCurj0gukkgSDukJrY1EKK/Y+yBbtiwpT2LcVuEhsY2EKK7bODbWNxSms2AlEh3qMAhVaDfwmQyFMgQqtBsV9fXUKilS4by6Q/iWFKqz0TAUSh0KPXBQ+uby6unwCnDCd98NzXjNyUPjd1ensmNPr71OntswEdskNrOSh8FdPn8cPqZNmgyI6U9ExfYXXsxGpk4cmAkm+fcjUFf4Y3cLZ059Sp5f0AltQtUu1RZ/ahqaNU1f4VLqFs1fp83oPHPqCx9J5jUc+dYWywNlTuAE4u0Ct29J5NGJSAoW7OoE1qFY5HFO0wuuYROACXZQYFFAmhZeywKfABToHHKy1TAqfybb0OXQFLhCOcZdJYeUylHj6M3gBHrI5BsuUSmEoUSEwZvlTKHzuMtnSMU+uT8dc/6I6jw2J63CRHemSosdDj1+fPU+73SHriEJVeLkZXtHQfHeh88MJWNhNVWYQXjHQ1D4VhS9ubm/vXipnBK9e/1at3r+JDqgFxuZNZ2s+3ofgZ/Fu8nByZgB82xQUDm9Hc2NGo9/hQm+qHgfVP4IjXaVCOcJWC48uRRI9MxNZYyDwn73Cw7mA0UtQ4EE14NXkkHrQlwtKh9vi83Gz2XksvrChKDAthXdzkcS36SKvIoHVd0DjY8RiiPKJTnR4KJtiYHDJXOHbUaRw7i5d5D4SWD34c3JQFVeMOTSw9uXYWJOHwps5mb9SRaoy95ODKrcmNpjHTwXJ4PhQk4fCO1ng6O9kCbmTRt1UlZuOFf0mFVbh1gd0YkXj54LVHnE7nH8vvUgVOYB6qeJBjM8r4lKC0fZYp1BEgqAwgRm7M6mlMy9sLE046sMPYtynjp06Cw/HejigUMRk6dE68fskHd9bqZO+SBf5BxotFA/iskrhykAc6Pf7gQREoefYa+YfSlahOqPhYnQDFXodSgwHi7HNhwQmwojRsOAN+J6P4w0aJ43EmTje4pbOIgXv4UlnLt/PjRCBkURJIJzBSATzh0sT/PmGH9/xjdH25Ay82EztFJoApRTqL29Ho9ub97DAcUe9f3dw8O71v/IxKLyPPj2BlwrdtSTGOS4A5RKX9FCPA8W+sYxTFGbVxbwF+712g0K7Z5yZffhQcwGUhUIul/Md9PRwZnz4PH9+Pv/oP/SitMAOcrUcp9nOtrUEPp7Pe5x/wq5Kr9ZWhGg8LGJt0ycQqJGYDtZg60vKpPBDKHAs8YP6uvQsGHO1yqTw07zEZ/V1qYUZYNowoEwKv8gKvyAXJqOmYM4poEwKZYHz58iFtYRCdJz7JhVuJBSioewyjRaPTHtpcnqBz+mkPu20UiMDPkm2dB4bLhLJYM0yqOXjSRD4uGiB8W6KRhPipsbEoy4JX6MR/yt6YTzdbeJQ4xx1hZ/Uam+cOFVzstEWU7tGV+2BfJ33NJ7P4wITpoa4qjvgUPaRmvR1cTtNqZ515RPxcWxuHn3UVRafXizrLkdJekjUlXHJyTN5pbJHXa4K9Wi0pJ3cFiXctpuOPGDTAT1yfU7LEaGwxUo6sKnjAkpOZ9Ywl9V68DIrXa44Dbz91iUjLLfMwdCodhzZbipSRXdIu698ZFMzpFfTVLTMMtyhXIVO3zZQGUa1OBiaY1XLLK2Eev0EvMTHiGTMlwSyssOqHnU1Dva0mUUlyOocm4F/R12Nw86B6OdHN8OiDNQts/IEk5M5mQG5ddH2WboriS3/txnLsFQA3dCfhHWQq0A3Gds83diyV3oPC59uLBisoeQKg1QwdTdlBe+lNtViO0Ec3JGgWgfPqNyWJsxAmWx4V4GMFja/PdIXXPaZBdEoB9ev3CN+6HHZz3Qi1EuOs/LaHju0bpIWdJv+KremDqyqUT7QDoa+EkyCHbz3inr2hL3ZBkK1FM3lEQo8U6d5tMoMZjUDdgwCdrOoBBzLVuwDNbuQWXYYqj38n99tw2EFcipblGz/fjoS5di9ggHRracLHiQahqbqEJIJMeTtUIb4VuJMf6GOffk2dugeRF+2zF36CsAQX6F7PWMu9mqik600ew5RB9GkzaZ4Hlu1PfoaTpnsFAqWd7PJTB3uuoXgZVweGoHmdzZ9oYqmCS6/m5iWOYShNlGnfWj+isUGZnv7Lq6pUGjrfITsiAdGPfOye8eYeporhrQV8hxR+LvkAd93lpvwM3No+9LGNhyVntRDvosbLgqDTgjE7w8p7zJcBzQG9dg7gROEQqpLI6XnNuOP0Rm2ARCjG3c+BtLvRJ3hCaeGmrGVl6DMtHtbA1/d9qbLO1wbm9u+ypOtXiwjQk2WbjkodH1xqB3UMc1FYa4CyX6JSBcQDbHLKzUpELupuIdEP1KZN5wSxGiGuIe0khbv1cqIAamdwuLTvFyXLQc0aOP2Mllhlm/TNoMWEiQrVCe3pwcpcEpWSPVaXCAFbcgKCxBIs4lUhcnQUz5QPGiqwkzeZ28NJThPVKh929SUIERhiQqxfOY0IbyeWii0L1XAYOhDSJYKhfYB4TxfqB/HfrOHCAnbzy3ynRnK2M8SSfPDi8IEEnZ7CIXWWYY8/7kjiXWuRjxR1gYq379fiWM9SxRzINtZCfo6tKlj636Lgc326XXbb++KrfstUpK2eYtCBVoP3237MnlHoJJYRqS8MnbeXjFOd4Sd++0v07HaM3miacD0sVru6wfmrdJrRUzu41ilofzMh9V9L1iewKa5TesiRdsZgY2tmRSx8NuK/m9AgUUuMXjdo3nPLm7eJGNuGkOrYVyikL89TGPc3rCE6Wr4YkJsaUyDblF7DQPmdeRL88VwvZQUbTHr2UW7MxFmA5xs+I1CPPp38ueH0ZQvZjUMzCmyvawADKJLCfdL20+LyDZhaFPX25YlsM0xxaBZ+At0OTQ+ULY7KEDvCfhMIf6e9V/v5QLibSr8Z+XCeKd/3J0iynlfcsF4BBiOPCuDuw3TAB9G3PVKvbpwX/17lIHaINlefYdrSv+AXV8ttz5B+yjy4daM/y28090c0y1v94zTWfSaW2QwnmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmGYcvA/B5LLjqKZs/MAAAAASUVORK5CYII=';
        img.alt = 'Ícone';
        li.appendChild(img);
    }

    
    const textSpan = document.createElement('span');
    textSpan.textContent = itemText;
    li.appendChild(textSpan);

    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'item-buttons';

    
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    buttonsDiv.appendChild(editBtn);

    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&#10006;'; 
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(buttonsDiv);

    
    addDragAndDropEvents(li);

    
    itemList.appendChild(li);

    
    itemInput.value = '';
    includeImageCheck.checked = false;
    showFeedback('Item adicionado com sucesso!', 'success');
}


function handleListClick(e) {
    
    if (e.target.classList.contains('delete-btn')) {
        const item = e.target.closest('li');
        item.remove();
    }

    
    if (e.target.classList.contains('edit-btn')) {
        const item = e.target.closest('li');
        const textSpan = item.querySelector('span');

        const newText = prompt('Editar item:', textSpan.textContent);

        
        if (newText && newText.trim().length >= 5) {
            textSpan.textContent = newText.trim();
            showFeedback('Item editado com sucesso!', 'success');
        } else if (newText !== null) { 
            showFeedback('Erro: O item deve ter no mínimo 5 caracteres.', 'error');
        }
    }
}


function addDragAndDropEvents(item) {
    item.addEventListener('dragstart', () => {
        draggedItem = item;
        setTimeout(() => item.classList.add('dragging'), 0);
    });

    item.addEventListener('dragend', () => {
        setTimeout(() => {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
        }, 0);
    });

    item.addEventListener('dragover', (e) => {
        e.preventDefault(); 
        const afterElement = getDragAfterElement(itemList, e.clientY);
        if (afterElement == null) {
            itemList.appendChild(draggedItem);
        } else {
            itemList.insertBefore(draggedItem, afterElement);
        }
    });
}


function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.list-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}


addBtn.addEventListener('click', addItem);
itemList.addEventListener('click', handleListClick);


itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});