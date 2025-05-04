const fs = require('fs');
const path = require('path');

// In-memory "database"
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const renderTemplate = (res, view, data = {}) => {
  const filePath = path.join(__dirname, '..', 'views', view);
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Template error');
      return;
    }
    // Very basic templating: replace {{ key }} with data[key]
    content = content.replace(/{{\s*(\w+)\s*}}/g, (match, p1) => data[p1] || '');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
  });
};

exports.listUsers = (req, res, { params, query }) => {
  let userList = '<ul>';
  users.forEach(user => {
    userList += `<li class="mb-2">${user.name} 
      <a href="/users/${user.id}/edit" class="text-blue-500 ml-2" hx-get="/users/${user.id}/edit" hx-target="#modal" hx-trigger="click">Edit</a>
      <form action="/users/${user.id}/delete" method="POST" style="display:inline;">
        <button type="submit" class="text-red-500 ml-2">Delete</button>
      </form>
    </li>`;
  });
  userList += '</ul>';

  // If the request comes via HTMX, return only the user list
  if (req.headers['hx-request']) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(userList);
  } else {
    renderTemplate(res, 'users.html', { userList });
  }
};

exports.newUserForm = (req, res, { params, query }) => {
  renderTemplate(res, 'newUser.html');
};

exports.createUser = (req, res, { params, query }) => {
  const name = req.body.get('name');
  const id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push({ id, name });
  // Redirect to the user list
  res.writeHead(302, { 'Location': '/users' });
  res.end();
};

exports.editUserForm = (req, res, { params, query }) => {
  const id = parseInt(params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('User not found');
    return;
  }
  // Render edit form with user data
  const filePath = path.join(__dirname, '..', 'views', 'editUser.html');
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Template error');
      return;
    }
    content = content.replace(/{{\s*id\s*}}/g, user.id);
    content = content.replace(/{{\s*name\s*}}/g, user.name);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
  });
};

exports.updateUser = (req, res, { params, query }) => {
  const id = parseInt(params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('User not found');
    return;
  }
  user.name = req.body.get('name');
  res.writeHead(302, { 'Location': '/users' });
  res.end();
};

exports.deleteUser = (req, res, { params, query }) => {
  const id = parseInt(params.id);
  users = users.filter(u => u.id !== id);
  res.writeHead(302, { 'Location': '/users' });
  res.end();
};
