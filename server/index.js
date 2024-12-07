/** @format */

// // Import the required library correctly
// const { SerialPort } = require('serialport');
// const express = require('express');
// const xlsx = require("xlsx");
// const cors = require("cors");
// const { createServer } = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const port = 3002;
// app.use(cors());

// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//     cors: {
//       origin: "http://localhost:3000", // Allow requests from the client
//       methods: ["GET", "POST"],
//     },
//   });

// // Configure serial port (make sure to change this to the correct port for your system)
// // const serialPort = new SerialPort({
// //   path: 'COM5', // replace with your correct COM port
// //   baudRate: 9600,
// // });

// // Middleware to handle JSON data
// app.use(express.json());

// // API endpoint to get the button pressed
// app.get('/button-pressed', (req, res) => {
//   res.send('Waiting for data from Arduino...');
// });

// // Listen for data from the Arduino through the serial port
// // serialPort.on('open', () => {
// //   console.log('Serial port opened.');
// // });

// // Handle incoming data from Arduino
// // serialPort.on('data', (data) => {
// //   const dataString = data.toString();
// //   console.log('Data received from Arduino:', dataString);

// //   // Process the received data
// //   if (dataString.trim() === '1') {
// //     console.log('Button 1 pressed');
// //   } else if (dataString.trim() === '2') {
// //     console.log('Button 2 pressed');
// //   } else if (dataString.trim() === '3') {
// //     console.log('Button 3 pressed');
// //   } else if (dataString.trim() === '4') {
// //     console.log('Button 4 pressed');
// //   } else if (dataString.trim() === '5') {
// //     console.log('Button 5 pressed');
// //   } else if (dataString.trim() === '6') {
// //     console.log('Button 6 pressed');
// //   } else {
// //     console.log('Unknown data received:', dataString);
// //   }

// //   // Send the response back to the client
// //   // Here you can send real-time notifications or status updates to the front end
// //   // For example, through a WebSocket or update a database
// // });

// app.get("/questions", (req, res) => {
//   const workbook = xlsx.readFile("quiz_questions.xlsx");

//   // const level01 = xlsx.utils.sheet_to_json(workbook.Sheets["Level01"]);
//   // const level02 = xlsx.utils.sheet_to_json(workbook.Sheets["Level02"]);
//   const level03 = xlsx.utils.sheet_to_json(workbook.Sheets["Level03"]);

//   const data = {};

//   // level01.forEach((row) => {
//   //   const familyKey = `family${row.Family.toString().padStart(2, "0")}`;
//   //   if (!data[familyKey]) data[familyKey] = { level01: {}, level02: {} };

//   //   data[familyKey].level01[row.QuestionID] = {
//   //     jumbleWord: row.JumbleWord,
//   //     correctWord: row.CorrectWord,
//   //   };
//   // });

//   // level02.forEach((row) => {
//   //   const familyKey = `family${row.Family.toString().padStart(2, "0")}`;
//   //   if (!data[familyKey]) data[familyKey] = { level01: {}, level02: {} };

//   //   data[familyKey].level02[row.QuestionID] = {
//   //     question: row.Question,
//   //     answer: row.Answer,
//   //   };
//   // });

//   const level03Data = level03.map((row) => ({
//     question: row.Question,
//     correctAnswer: row.CorrectAnswer,
//     options: [
//       { label: "A", value: row.OptionA },
//       { label: "B", value: row.OptionB },
//       { label: "C", value: row.OptionC },
//       { label: "D", value: row.OptionD },
//     ],
//   }));

//   res.json({ level03: level03Data });
// });

// io.on('connection',(socket) =>{
//   console.log('Admin or client connected');

//   socket.on('handleSelectQuestionAdmin',  (data) =>{
//     console.log(data);
//     io.emit('handleSelectQuestionServer', data);
//   })

// })

// // Handle server start
// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });

const express = require("express");
const { SerialPort } = require("serialport");
const xlsx = require("xlsx");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const port = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP server and Socket.io instance
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Client URL
    methods: ["GET", "POST"],
  },
});

// // Configure serial port (make sure to change this to the correct port for your system)
// const serialPort = new SerialPort({
//   path: 'COM5', // replace with your correct COM port
//   baudRate: 9600,
// });

// // Listen for data from the Arduino through the serial port
// serialPort.on('open', () => {
//   console.log('Serial port opened.');
// });

// // Handle incoming data from Arduino
// serialPort.on('data', (data) => {
//   const dataString = data.toString();
//   console.log('Data received from Arduino:', dataString);

//   // Process the received data
//   // if (dataString.trim() === '1') {
//   //   console.log('Button 1 pressed');
//   // } else if (dataString.trim() === '2') {
//   //   console.log('Button 2 pressed');
//   // } else if (dataString.trim() === '3') {
//   //   console.log('Button 3 pressed');
//   // } else if (dataString.trim() === '4') {
//   //   console.log('Button 4 pressed');
//   // } else if (dataString.trim() === '5') {
//   //   console.log('Button 5 pressed');
//   // } else if (dataString.trim() === '6') {
//   //   console.log('Button 6 pressed');
//   // } else {
//   //   console.log('Unknown data received:', dataString);
//   // }
//   io.emit('buttonPressed', { rawData: dataString });
//   // Send the response back to the client
//   // Here you can send real-time notifications or status updates to the front end
//   // For example, through a WebSocket or update a database
// });

// API Endpoint to fetch questions
app.get("/questions", (req, res) => {
  const workbook = xlsx.readFile("quiz_questions.xlsx");
  const level03 = xlsx.utils.sheet_to_json(workbook.Sheets["Level03"]);

  const level03Data = level03.map((row) => ({
    question: row.Question,
    correctAnswer: row.CorrectAnswer,
    options: [
      { label: "A", value: row.OptionA },
      { label: "B", value: row.OptionB },
      { label: "C", value: row.OptionC },
      { label: "D", value: row.OptionD },
    ],
  }));

  res.json({ level03: level03Data });
});

// Socket.io setup
io.on("connection", (socket) => {
  console.log("Admin or client connected:", socket.id);

  // Admin selects a question
  socket.on("handleSelectQuestionAdmin", (data) => {
    console.log("Question selected by admin:", data);

    // Broadcast the selected question to all clients
    io.emit("handleSelectQuestionServer", data);
  });

  socket.on("timerStop", () => {
    console.log("Timer stop");
    io.emit("timerStop");
  });

  socket.on("showQuestionAdmin", () => {
    console.log("Question show btn admin");
    io.emit("showQuestionServer");
  });

  socket.on("showScoreboardAdmin", (boolean, score) => {
    console.log("Scoreboard show btn admin");
    io.emit("showScoreboardServer", boolean, score);
  });

  socket.on("showWinner", () => {
    console.log("Winner display btn admin");
    io.emit("showWinnerServer");
  });

  socket.on("resetBtnAdmin", () => {
    console.log("Reset btn admin");
    io.emit("resetBtnServer");
  });

  socket.on("displayIdleAdmin", () => {
    console.log("Idle display btn admin");
    io.emit("displayIdleServer");
  });

  socket.on("goToPreviousQuestionAdmin", () => {
    console.log("Previous question btn admin");
    io.emit("goToPreviousQuestionServer");
  });

  socket.on("goToNextQuestionAdmin", () => {
    console.log("Next question btn admin");
    io.emit("goToNextQuestionServer");
  });

  socket.on("timerStartAdmin", () => {
    console.log("Timer start btn admin");
    io.emit("timerStartServer");
  });

  socket.on("handleChangeOptionAdmin", (data) => {
    console.log("Change Option admin");
    io.emit("handleChangeOptionServer", data);
  });

  socket.on("showCorretAnswerAdmin", () => {
    console.log("Correct answer show btn admin");
    io.emit("showCorretAnswerServer");
  });

  socket.on("showWrongAnswerAdmin", () => {
    console.log("Wrong answer show btn admin");
    io.emit("showWrongAnswerServer");
  });

  socket.on("handleLockPlayerAdmin", (data) => {
    console.log("Player lock btn admin");
    io.emit("handleLockPlayerServer", data);
  });

  socket.on("handleScoreChangeAdmin", (scores) => {
    console.log("handleScoreChangeAdmin", scores);
    io.emit("handleScoreChangeServer", scores);
  });
  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
  });
});

// Start the server
httpServer.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
