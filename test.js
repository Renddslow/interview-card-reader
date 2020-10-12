const test = require('ava');

const getInvalidLogs = require('./index');

test('getInvalidLogs - returns an Array', (t) => {
  t.true(Array.isArray(getInvalidLogs()));
});

test('getInvalidLogs - returns faulty exits when present', (t) => {
  const input = [
    ['Paul', 'enter'],
    ['Mary', 'enter'],
    ['Mary', 'exit'],
    ['Paul', 'enter'],
    ['Paul', 'exit'],
  ];
  const expected = [['Paul'], []];
  const [exit, entry] = getInvalidLogs(input);
  const actual = [exit.sort(), entry.sort()];
  t.deepEqual(actual, expected);
});

test('getInvalidLogs - returns faulty entries when present', (t) => {
  const input = [
    ['Paul', 'exit'],
    ['Mary', 'enter'],
    ['Mary', 'exit'],
    ['Gregory', 'exit'],
    ['Mary', 'enter'],
    ['Mary', 'exit'],
    ['Gregory', 'enter'],
    ['Gregory', 'exit'],
  ];
  const expected = [[], ['Gregory', 'Paul']];
  const [exit, entry] = getInvalidLogs(input);
  const actual = [exit.sort(), entry.sort()];
  t.deepEqual(actual, expected);
});

test('getInvalidLogs - returns faulty exits and entries when present', (t) => {
  const input = [
    ['Paul', 'exit'],
    ['Mary', 'enter'],
    ['Mary', 'exit'],
    ['Ignatius', 'exit'],
    ['Benedict', 'enter'],
    ['Benedict', 'enter'],
    ['Benedict', 'exit'],
    ['Mary', 'enter'],
    ['Mary', 'exit'],
    ['Ignatius', 'enter'],
  ];
  const expected = [
    ['Benedict', 'Ignatius'],
    ['Ignatius', 'Paul'],
  ];
  const [exit, entry] = getInvalidLogs(input);
  const actual = [exit.sort(), entry.sort()];
  t.deepEqual(actual, expected);
});

test('getInvalidLogs - returns only one faulty exit per employee when present', (t) => {
  const input = [
    ['Paul', 'enter'],
    ['Paul', 'enter'],
    ['Paul', 'exit'],
    ['Paul', 'enter'],
  ];
  const expected = [['Paul'], []];
  const [exit, entry] = getInvalidLogs(input);
  const actual = [exit.sort(), entry.sort()];
  t.deepEqual(actual, expected);
});

test('getInvalidLogs - returns only one faulty entry per employee when present', (t) => {
  const input = [
    ['Paul', 'exit'],
    ['Paul', 'enter'],
    ['Paul', 'exit'],
    ['Paul', 'exit'],
    ['Paul', 'enter'],
    ['Paul', 'exit'],
  ];
  const expected = [[], ['Paul']];
  const [exit, entry] = getInvalidLogs(input);
  const actual = [exit.sort(), entry.sort()];
  t.deepEqual(actual, expected);
});

test('getInvalidLogs - returns only one faulty entry and exit per employee when present', (t) => {
  const input = [
    ['Paul', 'exit'],
    ['Paul', 'enter'],
    ['Paul', 'exit'],
    ['Paul', 'exit'],
    ['Paul', 'enter'],
    ['Paul', 'exit'],
    ['Paul', 'enter'],
    ['Paul', 'enter'],
    ['Paul', 'exit'],
    ['Paul', 'enter'],
  ];
  const expected = [['Paul'], ['Paul']];
  const [exit, entry] = getInvalidLogs(input);
  const actual = [exit.sort(), entry.sort()];
  t.deepEqual(actual, expected);
});
