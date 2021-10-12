const test = require('ava');

const getInvalidLogs = require('./index');

test('getInvalidLogs - returns an Array', (t) => {
  t.true(Array.isArray(getInvalidLogs()));
});

test('getInvalidLogs - returns faulty exits when present', (t) => {
  const input = [
    { employee: 'Paul', scan: 'enter' },
    { employee: 'Mary', scan: 'enter' },
    { employee: 'Mary', scan: 'exit' },
    { employee: 'Paul', scan: 'enter' },
    { employee: 'Paul', scan: 'exit' },
  ];
  const expected = [[], ['Paul']];
  const [entry, exit] = getInvalidLogs(input);
  const actual = [entry.sort(), exit.sort()];
  t.deepEqual(actual, expected);
});

test('getInvalidLogs - returns faulty entries when present', (t) => {
  const input = [
    { employee: 'Paul', scan: 'exit' },
    { employee: 'Mary', scan: 'enter' },
    { employee: 'Mary', scan: 'exit' },
    { employee: 'Gregory', scan: 'exit' },
    { employee: 'Mary', scan: 'enter' },
    { employee: 'Mary', scan: 'exit' },
    { employee: 'Gregory', scan: 'enter' },
    { employee: 'Gregory', scan: 'exit' },
  ];
  const expected = [['Gregory', 'Paul'], []];
  const [entry, exit] = getInvalidLogs(input);
  const actual = [entry.sort(), exit.sort()];
  t.deepEqual(actual, expected);
});

test('getInvalidLogs - returns faulty exits and entries when present', (t) => {
  const input = [
    { employee: 'Paul', scan: 'exit' },
    { employee: 'Mary', scan: 'enter' },
    { employee: 'Mary', scan: 'exit' },
    { employee: 'Ignatius', scan: 'exit' },
    { employee: 'Benedict', scan: 'enter' },
    { employee: 'Benedict', scan: 'enter' },
    { employee: 'Benedict', scan: 'exit' },
    { employee: 'Mary', scan: 'enter' },
    { employee: 'Mary', scan: 'exit' },
    { employee: 'Ignatius', scan: 'enter' },
  ];
  const expected = [
    ['Ignatius', 'Paul'],
    ['Benedict', 'Ignatius']
  ];
  const [entry, exit] = getInvalidLogs(input);
  const actual = [entry.sort(), exit.sort()];
  t.deepEqual(actual, expected);
});

test('getInvalidLogs - returns only one faulty exit per employee when present', (t) => {
  const input = [
    { employee: 'Paul', scan: 'enter' },
    { employee: 'Paul', scan: 'enter' },
    { employee: 'Paul', scan: 'exit' },
    { employee: 'Paul', scan: 'enter' },
  ];
  const expected = [[], ['Paul']];
  const [entry, exit] = getInvalidLogs(input);
  const actual = [entry.sort(), exit.sort()];
  t.deepEqual(actual, expected);
});

test('getInvalidLogs - returns only one faulty entry per employee when present', (t) => {
  const input = [
    { employee: 'Paul', scan: 'exit' },
    { employee: 'Paul', scan: 'enter' },
    { employee: 'Paul', scan: 'exit' },
    { employee: 'Paul', scan: 'exit' },
    { employee: 'Paul', scan: 'enter' },
    { employee: 'Paul', scan: 'exit' },
  ];
  const expected = [['Paul'], []];
  const [entry, exit] = getInvalidLogs(input);
  const actual = [entry.sort(), exit.sort()];
  t.deepEqual(actual, expected);
});

test('getInvalidLogs - returns only one faulty entry and exit per employee when present', (t) => {
  const input = [
    { employee: 'Paul', scan: 'exit' },
    { employee: 'Paul', scan: 'enter' },
    { employee: 'Paul', scan: 'exit' },
    { employee: 'Paul', scan: 'exit' },
    { employee: 'Paul', scan: 'enter' },
    { employee: 'Paul', scan: 'exit' },
    { employee: 'Paul', scan: 'enter' },
    { employee: 'Paul', scan: 'enter' },
    { employee: 'Paul', scan: 'exit' },
    { employee: 'Paul', scan: 'enter' },
  ];
  const expected = [['Paul'], ['Paul']];
  const [entry, exit] = getInvalidLogs(input);
  const actual = [entry.sort(), exit.sort()];
  t.deepEqual(actual, expected);
});
