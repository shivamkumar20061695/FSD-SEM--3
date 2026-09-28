// Student Activity Monitoring System

const EventEmitter = require("events");

class StudentActivity extends EventEmitter {}

const student = new StudentActivity();

// Event 1: Login
student.on("login", () => {
    console.log("Student Logged Successfully");
});

// Event 2: Assignment
student.on("assign", () => {
    console.log("Assignment Submitted");
});

// Event 3: Logout
student.on("logout", () => {
    console.log("Student Logged Out");
});

// Event 4: Exit
student.on("exit", () => {
    console.log("Exiting Application");
});

// Triggering the events
console.log("Student Activity Monitoring System");

student.emit("login");
student.emit("assign");
student.emit("logout");
student.emit("exit");