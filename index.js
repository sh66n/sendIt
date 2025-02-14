const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const multer = require("multer");

const storage = multer.memoryStorage(); // Store file in memory (not on disk)
const upload = multer({ storage: storage });

const { transporter, sendMail } = require("./sendMail");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/send-email", upload.single("file"), async (req, res) => {
  console.log(req.body);

  //if no files, return early
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  //configure mail options (who to send? etc)
  const mailOptions = {
    from: {
      name: "SendIt",
      address: process.env.USER_MAIL,
    },
    to: [req.body.email], // list of receivers
    subject: "Your SendIt file is here!",
    text: "Here is the file you requested.",
    attachments: [
      {
        filename: req.file.originalname, // Get the original name of the uploaded file
        content: req.file.buffer, // The file content is available in the buffer
        encoding: "base64", // Specify encoding (base64 is common for files)
      },
    ],
  };

  //finally send the mail
  const response = await sendMail(transporter, mailOptions);
  if (response) {
    res.send(response.message);
  } else {
    res.send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
