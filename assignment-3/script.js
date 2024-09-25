let users=[];
const userForm=document.getElementById('userForm');
const userList=document.getElementById('userList');
userForm.addEventListener('submit',function(e){
    e.preventDefault();
    const userName=document.getElementById('userName').value.trim();
    const userAge=document.getElementById('userAge').value;
    const userRole=document.getElementById('userRole').value;
    if (userName&&userAge&&userRole){
        addUser(userName,userAge,userRole);
        userForm.reset();
    }
});
function addUser(name,age,role){
    const user={id:Date.now(),name,age,role};
    users.push(user);
    renderUserList();
}
function renderUserList(){
    userList.innerHTML='';
    users.forEach(user=>{
        const row=document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.role}</td>
            <td>
                ${createEditButton(user.id).outerHTML}
                ${createDeleteButton(user.id).outerHTML}
            </td>
        `;
        userList.appendChild(row);
    });
}
function createEditButton(id) {
    const button=document.createElement('button');
    button.textContent='Edit';
    button.className='edit-button';
    button.onclick=()=>editUser(id);
    return button;
}
function createDeleteButton(id) {
    const button=document.createElement('button');
    button.textContent='Delete';
    button.className='delete-button';
    button.onclick=()=>deleteUser(id);
    return button;
}
function editUser(id){
    const user=users.find(u=>u.id===id);
    const newName=prompt('Edit user name:',user.name);
    const newAge=prompt('Edit user age:', user.age);
    const newRole=prompt('Edit user role:', user.role);
    if (newName&&newAge&&newRole) {
        user.name=newName.trim();
        user.age=newAge.trim();
        user.role=newRole.trim();
        renderUserList();
    }}
function deleteUser(id){
    users=users.filter(u=>u.id!==id);
    renderUserList();
}