/*-- Set Active Tab Color --*/
document.addEventListener("DOMContentLoaded", () => {
    const tab = document.querySelector(".tab.is-active");
    if (tab) {
        const tabColor = getComputedStyle(tab).backgroundColor;
        document.documentElement.style.setProperty('--tab-bg-active', tabColor);
    }
}); 

/*-- Tab Switching --*/
document.addEventListener("click", e => {
    const tab = e.target.closest(".tab");
    if (!tab) return;
    
    document.querySelectorAll(".tab").forEach(t => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
    });

    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");

    const tabColor = getComputedStyle(tab).backgroundColor;
    document.documentElement.style.setProperty('--tab-bg-active', tabColor);
});

/*-- Add Task Form Handling --*/
document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.querySelector("#addTaskBtn");
    const taskList = document.querySelector(".task-list");
    const formTemplate = document.querySelector(".task-form");

    if(!addTaskBtn || !taskList || !formTemplate) return;

    formTemplate.classList.add("is-hidden");
    

    addTaskBtn.addEventListener("click", () => {
        const newTaskForm = formTemplate.cloneNode(true);
        newTaskForm.classList.remove("is-hidden");
        newTaskForm.dataset.createdAt = String(Date.now());

        newTaskForm.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));

        if(typeof newTaskForm.reset === "function") {
            newTaskForm.reset();
        }
        newTaskForm.querySelectorAll("textarea, input").forEach(el => el.value = "");  
        newTaskForm.querySelectorAll("select").forEach(el => el.selectedIndex = 0);   

        newTaskForm.addEventListener("submit", e => {
            e.preventDefault();
            newTaskForm.remove()
        });

        setEditable(newTaskForm, true);
        taskList.prepend(newTaskForm);
        addTaskBtn.disabled = true;
    });
});

/*-- Set Editable State --*/
const setEditable = (form, editable) => {
    form.querySelectorAll("input, textarea, select").forEach(el => {
        el.disabled = !editable;
        el.setAttribute("aria-disabled", String(!editable));
    });

    const editSaveBtn = form.querySelector(".edit-save-btn");
    if (editSaveBtn) {
        editSaveBtn.textContent = editable ? "Save" : "Edit";
        const iconSrc = editable ? "/frontend/assets/images/save.png" : "/frontend/assets/images/edit.png";
        editSaveBtn.innerHTML += ` <img class="save-delete-icon" src="${iconSrc}" alt="${editable ? "Save" : "Edit"}">`;
    }

    form.dataset.mode = editable ? "edit" : "view";
};

/*-- Edit/Save Button Handling --*/
document.addEventListener("click", e => {
    const editSaveBtn = e.target.closest(".edit-save-btn");
    if (!editSaveBtn) return;

    const form = editSaveBtn.closest(".task-form");
    const textarea = form.querySelector("textarea");
    const addTaskBtn = document.querySelector("#addTaskBtn");
    const mode = form.dataset.mode || "edit"; 
    if (!form || !mode) return;

    if(mode === "edit") {
        if(!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        setEditable(form, false);
        
        if (addTaskBtn) {
            addTaskBtn.disabled = false;
        } 
        if(textarea) textarea.classList.add("is-submitted");
    } else {
        setEditable(form, true);
        if (addTaskBtn) {
            addTaskBtn.disabled = true;
        }
        textarea.classList.remove("is-submitted");  
    }

});
