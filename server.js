const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const dbUrl =
  'mongodb+srv://admin:<password>@cluster0.38khl.mongodb.net/<database>?retryWrites=true&w=majority';

const app = express();

/* --------------------------------
 *    APP CONFIG
 * -------------------------------- */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

/* --------------------------------
 *    ROUTES
 * -------------------------------- */
app.get('/', (req, res) => {
  MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    const db = client.db('node-demo');
    const collection = db.collection('users');
    collection
      .find()
      .toArray()
      .then((results) => {
        res.render('index.ejs', { users: results });
      })
      .catch((error) => {
        res.redirect('/');
      });
  });
});

app.post('/users', (req, res) => {
  MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    const db = client.db('node-demo');
    const collection = db.collection('users');
    collection
      .insertOne(req.body)
      .then(() => {
        res.redirect('/');
      })
      .catch(() => {
        res.redirect('/');
      });
  });
});

app.delete('/users', (req, res) => {
  MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    const db = client.db('node-demo');
    const collection = db.collection('users');
    collection
      .deleteOne(req.body)
      .then(() => {
        res.json(`Deleted user`);
      })
      .catch(() => {
        res.redirect('/');
      });
  });
});

app.put('/users', (req, res) => {
  MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    const db = client.db('node-demo');
    const collection = db.collection('users');
    collection
      .findOneAndUpdate(
        { fname: req.body.oldFname, lname: req.body.oldLname },
        {
          $set: {
            fname: req.body.fname,
            lname: req.body.lname,
          },
        },
        {
          upsert: true,
        }
      )
      .then(() => {
        res.json('Success');
      })
      .catch(() => {
        res.redirect('/');
      });
  });
});

/* --------------------------------
 *    START SERVER
 * -------------------------------- */
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
