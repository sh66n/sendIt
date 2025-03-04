const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const multer = require("multer");

const storage = multer.memoryStorage(); // Store file in memory (not on disk)
const upload = multer({ storage: storage });

const { transporter, sendMail } = require("./sendMail");

app.use(express.static(path.join(__dirname, "/")));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/send-email", upload.array("files", 10), async (req, res) => {
  //if no files, return early
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded");
  }

  //configure mail options (who to send? etc)
  const mailOptions = {
    from: {
      name: "SendIt",
      address: process.env.USER_MAIL,
    },
    to: [req.body.email], // list of receivers
    subject: "Your SendIt files are here!",
    text: "Here are the files you requested.",
    attachments: req.files.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
      encoding: "base64",
    })),
  };

  //finally send the mail
  const response = await sendMail(transporter, mailOptions);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
