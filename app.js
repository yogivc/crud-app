let records = JSON.parse(localStorage.getItem('records')) || [];
let editIndex = null;

document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert("Password dan Confirm Password harus sama!");
    return;
  }

  const newRecord = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    gender: document.getElementById('gender').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value
  };

  if (editIndex === null) {
    records.push(newRecord); // Create
  } else {
    records[editIndex] = newRecord; // Update
    editIndex = null;
  }

  this.reset();
  saveToLocalStorage();
  renderTable();
});

function renderTable() {
  const tbody = document.getElementById('recordTableBody');
  tbody.innerHTML = '';

  records.forEach((record, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${record.firstName}</td>
      <td>${record.lastName}</td>
      <td>${record.gender}</td>
      <td>${record.email}</td>
      <td>${record.phone}</td>
      <td>${record.address}</td>
      <td>
        <button class="btn btn-update btn-sm" onclick="editRecord(${index})">Update</button>
        <button class="btn btn-delete btn-sm" onclick="deleteRecord(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editRecord(index) {
  const record = records[index];
  document.getElementById('editFirstName').value = record.firstName;
  document.getElementById('editLastName').value = record.lastName;
  document.getElementById('editGender').value = record.gender;
  document.getElementById('editEmail').value = record.email;
  document.getElementById('editPhone').value = record.phone;
  document.getElementById('editAddress').value = record.address;
  editIndex = index;
  openModal();
}

function deleteRecord(index) {
  if (confirm('Yakin mau hapus data ini?')) {
    records.splice(index, 1); // Delete
    saveToLocalStorage();
    renderTable();
  }
}

function saveToLocalStorage() {
  localStorage.setItem('records', JSON.stringify(records));
}

function openModal() {
  document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('editModal').style.display = 'none';
}

document.getElementById('editForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const updatedRecord = {
    firstName: document.getElementById('editFirstName').value,
    lastName: document.getElementById('editLastName').value,
    gender: document.getElementById('editGender').value,
    email: document.getElementById('editEmail').value,
    phone: document.getElementById('editPhone').value,
    address: document.getElementById('editAddress').value
  };

  records[editIndex] = updatedRecord;
  saveToLocalStorage();
  renderTable();
  closeModal();
});

function clearAllData() {
  if (confirm('Yakin mau hapus semua data?')) {
    localStorage.removeItem('records');
    records = [];
    renderTable();
  }
}

renderTable();
