// script.js

document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTodoBtn = document.getElementById("add-todo-btn");
    const addDonotBtn = document.getElementById("add-donot-btn");
    const todoList = document.getElementById("todo-list");
    const donotList = document.getElementById("donot-list");
    const generatePdfBtn = document.getElementById("generate-pdf-btn");
  
    // Helper function to create a task item element
    function createTaskItem(taskText) {
      const li = document.createElement("li");
      li.className = "todo-item";
  
      // Container for checkbox and task text
      const taskDetails = document.createElement("div");
      taskDetails.className = "task-details";
      
      // Create the checkbox element
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-checkbox";
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          li.classList.add("completed");
        } else {
          li.classList.remove("completed");
        }
      });
      taskDetails.appendChild(checkbox);
  
      // Create the text element
      const span = document.createElement("span");
      span.textContent = taskText;
      taskDetails.appendChild(span);
  
      li.appendChild(taskDetails);
  
      // Create a delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => {
        li.parentElement.removeChild(li);
      });
      li.appendChild(deleteBtn);
  
      return li;
    }
  
    // Function to add a task to a given list
    function addTask(listElement) {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Please enter a task!");
        return;
      }
      const li = createTaskItem(taskText);
      listElement.appendChild(li);
      taskInput.value = "";
    }
  
    // Event listeners for the two buttons
    addTodoBtn.addEventListener("click", () => {
      addTask(todoList);
    });
  
    addDonotBtn.addEventListener("click", () => {
      addTask(donotList);
    });
  
    // Optional: Allow adding task via the Enter key (defaults to To Do)
    taskInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        addTask(todoList);
      }
    });
  
    // PDF Generation Functionality
    generatePdfBtn.addEventListener("click", generatePDF);
  
    function generatePDF() {
      // Using jsPDF (version 2.5.1) from the loaded library
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      let yPosition = 20;
  
      // Header section
      doc.setFontSize(18);
      doc.text("Today's Task Report", 10, yPosition);
      yPosition += 12;
  
      // To Do tasks section
      doc.setFontSize(14);
      doc.text("To Do Tasks:", 10, yPosition);
      yPosition += 10;
      const todoItems = document.querySelectorAll("#todo-list li");
      if (todoItems.length === 0) {
        doc.text("No tasks added.", 10, yPosition);
        yPosition += 10;
      } else {
        todoItems.forEach((li) => {
          const checkbox = li.querySelector("input[type='checkbox']");
          const taskText = li.querySelector(".task-details span").textContent;
          const mark = checkbox.checked ? "✔" : "☐";
          doc.text(`- ${mark} ${taskText}`, 10, yPosition);
          yPosition += 8;
        });
      }
  
      yPosition += 10; // Spacing before next section
  
      // Do Not tasks section
      doc.text("Do Not Tasks:", 10, yPosition);
      yPosition += 10;
      const donotItems = document.querySelectorAll("#donot-list li");
      if (donotItems.length === 0) {
        doc.text("No tasks added.", 10, yPosition);
        yPosition += 10;
      } else {
        donotItems.forEach((li) => {
          const checkbox = li.querySelector("input[type='checkbox']");
          const taskText = li.querySelector(".task-details span").textContent;
          const mark = checkbox.checked ? "✔" : "☐";
          doc.text(`- ${mark} ${taskText}`, 10, yPosition);
          yPosition += 8;
        });
      }
  
      // Save the PDF document
      doc.save("task-report.pdf");
    }
  });
  