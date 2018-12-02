// Named exports- has a name. Have as many as needed.
// Default exports- has no name. You can only have one.

const message = "Good Morning by export file";

const name = 'Jashan';

const location = 'Mansa';

const getGreeting = (name) => {
    return `Welcome back ${name}`;
}

const add = (a,b) => a + b;

const sub = (a,b) => a - b;

export { message, name, location, getGreeting, add as default, sub};
