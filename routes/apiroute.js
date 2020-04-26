var fs = require("fs");

var notesDB = [];
var notes;

module.exports = function (app) {

  // Read db.json and return all saved notes as JSON
  app.get("/api/notes", function (req, res) {
    notes = fs.readFileSync('./db/db.json', "utf-8");
    if (!notes) {
      notesDB = [];
    }
    else {
      notesDB = JSON.parse(notes);
    }
    res.json(notesDB);
  });

  // // 1. receive a new note to save on the req.body(request body)
  // // 2. add it to db.json
  // // 3. return new note to client

  app.post('/api/notes', function (req) {
    notesDB.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(notesDB), "utf-8", function (err) {
      if (err) throw err;
    });
  });

  // app.delete('/api/notes/:id', (req, res) => {
  //   // console.log(`deleting: ${req.params.id}`);
  //   // notesDB = notesDB.filter(element => {
  //   //   element.id !== req.params.id;
  //   // });
  //   fs.writeFile('./db/db.json', JSON.stringify(notesDB), "utf-8", (err) => {
  //     if (err) throw err;
  //   });
  //   res.end();

  // });

};
