const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const BookModel = require('./models/Books');

app.use(express.json());
app.use(cors());

///Database Connection
mongoose.connect(
    "mongodb://localhost:27017/books?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    { useNewUrlParser: true }
  );

  app.post("/addbook", async (req, res) => {
    const name =  req.body.name;
    const year = req.body.year;
    const rating = req.body.rating;

    const book = new BookModel({name: name, year: year, rating: rating});
    await book.save();
    res.send(book);
  });

  app.get("/read", async (req, res) => {
    BookModel.find({}, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  app.put("/update", async (req, res) => {
    const newYear = req.body.newYear;
    const id = req.body.id;
    console.log(newYear, id);

    try {
      await BookModel.findById(id, (error, bookToUpdate) => {
        bookToUpdate.year = Number(newYear);
        bookToUpdate.save();
      });
    } catch (err) {
      console.log(err);
    }

    res.send("Updated.");
  });

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  await BookModel.findByIdAndRemove(id).exec();
  res.send("Item deleted.");
})

app.listen(3001, () => {
    console.log("The server is running.");
});
