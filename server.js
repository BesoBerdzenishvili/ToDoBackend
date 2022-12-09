require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasks");

mongoose.set("strictQuery", true);

const PORT = process.env.PORT || 4000;

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  const routesText = `
  <h1>Available methods</h1>
  <div>
    <pre><b>Check ./routes.js</b></pre>
  </div>
  
  <pre>
  TASK:

  router.post('/api/task'),
  router.get('/api/tasks’),
  router.patch('/api/tasks/:id),
  router.delete('/api/tasks/:id),
  </pre>
    `;
  res.status(200).send(routesText);
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Connected to DB and listening on port http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
