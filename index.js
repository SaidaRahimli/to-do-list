const tasksBox = document.querySelector(".tasks");
const input = document.querySelector(".inp");
const text = document.querySelector(".task__content");
const btnAdd = document.querySelector(".add");

function addNewElement() {
  tasksBox.style.padding = '10px 0';
  tasksBox.style.height = 'auto';

  const tempInp = document.createElement("li");
  tempInp.style.wordWrap = 'break-word';
  tempInp.style.marginBottom = '35px';
  tempInp.style.width =  '260px'
  tempInp.classList.add("task");

  tempInp.innerHTML = `<p class="task__content">${input.value}</p>
        <button onclick="this.parentElement.remove()" class="remove">
            <svg class="remove-sv" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4"/>
                <path d="M6 6L14 14" stroke="#C4C4C4"/>
                <path d="M6 14L14 6" stroke="#C4C4C4"/>
            </svg>
        </button>`;
  input.value = "";
  tasksBox.insertBefore(tempInp, tasksBox.lastElementChild);
  remove = document.querySelectorAll(".remove");
  input.style.display = "none";
}

input.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    addNewElement();
  }
});

btnAdd.addEventListener("click", () => {
  if (getComputedStyle(input).display != "none") {
    addNewElement();
  } else {
    input.style.display = "block";
  }
});

const filterBtn = document.querySelector(".filter__btn");
let checkDU = false;

function sortItems() {
  let i,
    switching,
    b,
    shouldSwitch,
    dir,
    switchcount = 0;
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    b = tasksBox.getElementsByTagName("li");
    for (i = 0; i < b.length - 2; i++) {
      shouldSwitch = false;

      if (dir == "asc") {
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

const filterBtnIcon = document.querySelector(".filter__btn-icon");
filterBtn.addEventListener("click", () => {
  if (checkDU == false) {
    filterBtnIcon.src = "./pictures/filterdown.png";
    checkDU = true;
    sortItems();
  } else {
    filterBtnIcon.src = "./pictures/filterup.png";
    checkDU = false;
    sortItems();
  }
});