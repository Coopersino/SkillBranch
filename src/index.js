import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/taskB', (req, res) => {
  const fullname = req.query.fullname.trim();
  // Check if normal
  if (!fullname) {
    return res.send('Invalid fullname');
  }
  const re = new RegExp('[0-9_/$&+,:;=?@#|\'<>.^*()%!-]');
  const match = fullname.search(re);

  if (match !== -1) {
    return res.send('Invalid fullname');
  }
  const arr = fullname.split(' ');
  if (arr.length > 3) {
    res.send('Invalid fullname');
  } else {
    let response = arr[arr.length - 1];
    let patronymic = '';
    let name = '';
    if (arr.length - 2 >= 0) {
      patronymic = arr[arr.length - 2];
    }
    if (arr.length - 3 >= 0) {
      name = arr[arr.length - 3];
    }
    if (name) {
      response = response + ' ' + name[0] + '.';
    }
    if (patronymic) {
      response = response + ' ' + patronymic[0] + '.';
    }
    res.send(response);
  }
});
app.listen(3000);
