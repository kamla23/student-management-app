const idName = document.getElementById("name");
const age = document.getElementById("age");
const roll = document.getElementById("roll");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const contact = document.getElementById("contact");
const dob = document.getElementById("dob");
const address = document.getElementById("address");

const addBtn = document.getElementById("add");
const updateBtn = document.getElementById("update");
const deletBtn = document.getElementById("delete");
const clearBtn = document.getElementById("clear");

const body = document.getElementById("student-table-body");
let selectedStudentId = null; 

//=============SEARCH===============================//
const searchBy = document.getElementById("search-by");
const searchdata = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const showAlldata = document.getElementById("show-btn");

const categoryMap = {
    "Roll": 1,
    "Name": 2,
    "Age": 3,
    "E-mail": 4,
    "Gender": 5,
    "Contact": 6,
    "D.O.B.": 7,
    "Address": 8
};

function clearFields() {
  idName.value = "";
  age.value = "";
  roll.value = "";
  email.value = "";
  gender.selectedIndex = 0;
  contact.value = "";
  dob.value = "";
  address.value = "";
  selectedStudentId = null;
}

//===============RENDER TABLE===================//
function renderTable(students) {
  body.innerHTML = "";
  students.forEach(student => {
    const row = document.createElement("tr");
    row.dataset.id = student._id; 
    row.innerHTML = `
      <td>${student.roll}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.email}</td>
      <td>${student.gender}</td>
      <td>${student.contact}</td>
      <td>${student.dob || ""}</td>
      <td>${student.address || ""}</td>
    `;

    row.addEventListener("click", () => {
      selectedStudentId = student._id;
      roll.value = student.roll;
      idName.value = student.name;
      age.value = student.age;
      email.value = student.email;
      gender.value = student.gender;
      contact.value = student.contact;
      dob.value = student.dob;
      address.value = student.address;
    });

    body.appendChild(row);
  });
}

//===============LOAD STUDENTS===================//
async function loadStudents() {
  try {
    const res = await fetch("http://localhost:3000/api/students");
    const students = await res.json();
    renderTable(students);
  } catch (err) {
    console.error("Error loading students:", err);
  }
}

//===============ADD STUDENT===================//
addBtn.addEventListener("click", async () => {
  const formattedDOB = new Date(dob.value).toISOString().split("T")[0];
  const student = {
    name: idName.value.trim(),
    age: age.value.trim(),
    roll: roll.value.trim(),
    email: email.value.trim(),
    gender: gender.value,
    contact: contact.value.trim(),
    dob: formattedDOB,
    address:address.value.trim()

  };

  if (!student.name || !student.age || !student.roll || !student.email || !student.gender || !student.contact || !student.dob || !student.address) {
    alert("Please fill all required fields!");
    return;
  }

  try {
    await fetch("http://localhost:3000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });
    await loadStudents(); 
    clearFields();
  } catch (err) {
    console.error("Error adding student:", err);
  }
});

//===============UPDATE STUDENT===================//
updateBtn.addEventListener("click", async () => {
  if (!selectedStudentId) {
    alert("Please select a student to update!");
    return;
  }

  const formattedDOB = dob.value ? new Date(dob.value).toISOString().split("T")[0] : "";
  const updatedData = {
    name: idName.value.trim(),
    age: age.value.trim(),
    roll: roll.value.trim(),
    email: email.value.trim(),
    gender: gender.value,
    contact: contact.value.trim(),
    dob: formattedDOB,
    address: address.value.trim(),
  };

  try {
    await fetch(`http://localhost:3000/api/students/${selectedStudentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });
    await loadStudents();
    clearFields();
  } catch (err) {
    console.error("Error updating student:", err);
  }
});

//===============DELETE STUDENT===================//
deletBtn.addEventListener("click", async () => {
  if (!selectedStudentId) {
    alert("Please select a student to delete!");
    return;
  }

  if (!confirm("Are you sure you want to delete this student?")) return;

  try {
    await fetch(`http://localhost:3000/api/students/${selectedStudentId}`, {
      method: "DELETE"
    });
    await loadStudents();
    clearFields();
  } catch (err) {
    console.error("Error deleting student:", err);
  }
});

//===============SEARCH===================//

searchBtn.addEventListener("click", () => {
  const searchTerm = searchdata.value.trim().toLowerCase();
  const searchCategory = searchBy.value.toLowerCase();

  if (searchTerm === "") {
    loadStudents();
    return;
  }

  const allRows = Array.from(body.querySelectorAll("tr"));

  allRows.forEach(row => {
    let cellValue = "";

    if (searchCategory === "roll") {
      cellValue = row.cells[0].innerText.toLowerCase();
    }
    else if (searchCategory === "name") {
      cellValue = row.cells[1].innerText.toLowerCase();
    }
    else if (searchCategory === "age") {
      cellValue = row.cells[2].innerText.toLowerCase();
    }
    else if (searchCategory === "email") {
      cellValue = row.cells[3].innerText.toLowerCase();
    }
    else if (searchCategory === "gender") {
      cellValue = row.cells[4].innerText.toLowerCase();
    }
    else if (searchCategory === "contact") {
      cellValue = row.cells[5].innerText.toLowerCase();
    }
    else if (searchCategory === "dob") {
      cellValue = row.cells[6].innerText.toLowerCase();
    }
    else if (searchCategory === "address") {
      cellValue = row.cells[7].innerText.toLowerCase();
    }

    row.style.display = cellValue.includes(searchTerm) ? "" : "none";
  });
});


showAlldata.addEventListener("click", loadStudents);

//===============INITIAL LOAD===================//
loadStudents();



