'use strict';

var getRawBody = require('raw-body');
const todo = require('./todo');

const handlers = {
  // Get Request's Response 
  get: (route) => {
    switch (route) {
      case 'list':
        return { code: 200, body: todo.listTasks() };
      default:
        return BadRequest;
    }
  },
  //Post Request's Handling and Return a Response Code
  post: (route, body) => {
    switch (route) {
      case 'add':
        try {
          const task = JSON.parse(body).task;
          const success = todo.addTask(task);
          return success
            ? { code: 201, body: 'Task added successfully' }
            : { code: 400, body: 'Failed to add task' };
        } catch (err) {
          return { code: 400, body: 'Bad request, JSON object required.' };
        }
      default:
        return BadRequest;
    }
  },
  //Delete Requests Handling and Return a Response Code
  delete: (route, body) => {
    switch (route) {
      case 'remove':
        try {
          const id = JSON.parse(body).id;
          const success = todo.removeTask(id);
          return success
            ? { code: 200, body: ' removed task' }
            : { code: 400, body: ' remove task fail ' };
        } catch (err) {
          return { code: 400, body: 'Bad request, an id required.' };
        }
      default:
        return BadRequest;
    }
  },
};

const BadRequest = { code: 400, body: 'Bad request' };

// This is to redirect traffic to specific endpoint
exports.handler = (req, resp, context) => {
  resp.setHeader('content-type', 'application/json');
  var uri = req.url.split('/');
  if (uri.length === 0) {
    resp.send(JSON.stringify({ code: 400, body: 'Bad request' }));
  } else {
    var route = uri[uri.length - 1];
    switch (req.method) {
      case 'GET':
        resp.send(JSON.stringify(handlers.get(route)));
        break;
      case 'POST':
        getRawBody(req, (err, body) => {
          resp.send(JSON.stringify(handlers.post(route, body)));
        });
        break;
      case 'DELETE':
        getRawBody(req, (err, body) => {
          resp.send(JSON.stringify(handlers.delete(route, body)));
        });
        break;
      default:
        resp.send(JSON.stringify({ code: 400, body: 'Bad request' }));
    }
  }
};
