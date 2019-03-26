import app from './payment';
const port = 3000;
app.listen(port, err => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server is listening on port ${port}`);
});
