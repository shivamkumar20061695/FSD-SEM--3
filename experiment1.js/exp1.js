// 1-->(1)


//   const EventEmitter = require('events');
// const myEmitter = new EventEmitter();

//  myEmitter.on('greet',(name) => {
//      console.log(`Hello,${name}! Welcome to Node.js.`);
//  });

//   myEmitter.on('exit',() => {
//     console.log("Application Closed.");}}}}}}}}{88}
//   });

//   myEmitter.emit('greet', '2nd year');
//   myEmitter.emit('exit');



// 1-->(2)

// import EventEmitter from 'events';
// class Button extends EventEmitter {
//     click() {
//         this.emit('click');
//     }

//     mouseover() {
//         this.emit('mouseover');
//     }
// }
// const button = new Button();
// button.on('click', () => {
//     console.log('Button clicked');
// });

// button.on('mouseover', () => {
//     console.log('Mouse over button');
// });

// button.click();
// button.mouseover();



// 1-->(3)

// const EventEmitter = require('events');
// class Button extends EventEmitter{}
// const button = new Button();
// button.on('click',() => console.log('Button clicked!'));
// button.on('mouseover',() => console.log('Mouse is over the button.'));
// button.emit('click');
// button.emit('mouseover');