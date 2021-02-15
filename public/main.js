const editBtn = document.querySelectorAll('.editButton');
const deleteBtn = document.querySelectorAll('.deleteButton');
const updateBtn = document.querySelector('.updateButton');

for (const button of editBtn) {
  button.addEventListener('click', (e) => {
    document.getElementById('oldFname').value = e.target.dataset.fname;
    document.getElementById('oldLname').value = e.target.dataset.lname;
    document.getElementById('newFname').value = e.target.dataset.fname;
    document.getElementById('newLname').value = e.target.dataset.lname;
  });
}

for (const button of deleteBtn) {
  button.addEventListener('click', (e) => {
    fetch(`/users`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fname: e.target.dataset.fname,
        lname: e.target.dataset.lname,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then(() => {
        window.location.reload();
      });
  });
}

updateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  fetch('/users', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fname: document.querySelector('#newFname').value,
      lname: document.querySelector('#newLname').value,
      oldFname: document.querySelector('#oldFname').value,
      oldLname: document.querySelector('#oldLname').value,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then(() => {
      window.location.reload();
    });
});
