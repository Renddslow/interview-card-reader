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
  t.deepEqual(getInvalidLogs(input), expected);
});

test('getInvalidLogs - returns faulty entries when present', (t) => {
  const input = [
    ['Paul', 'exit'],
    ['Mary', 'enter'],
    ['Mary', 'exit'],
    ['Cuthbert', 'exit'],
    ['Mary', 'enter'],
    ['Mary', 'exit'],
    ['Cuthbert', 'enter'],
    ['Cuthbert', 'exit'],
  ];
  const expected = [[], ['Paul', 'Cuthbert']];
  t.deepEqual(getInvalidLogs(input), expected);
});

test('getInvalidLogs - returns faulty exits and entries when present', (t) => {
  const input = [
    ['Paul', 'exit'],
    ['Mary', 'enter'],
    ['Mary', 'exit'],
    ['Cuthbert', 'exit'],
    ['Reginald', 'enter'],
    ['Reginald', 'enter'],
    ['Reginald', 'exit'],
    ['Mary', 'enter'],
    ['Mary', 'exit'],
    ['Cuthbert', 'enter'],
  ];
  const expected = [['Cuthbert'], ['Paul', 'Cuthbert', 'Reginald']];
  t.deepEqual(getInvalidLogs(input), expected);
});

test('getInvalidLogs - returns only one faulty exit per employee when present', (t) => {
  const input = [
    ['Paul', 'enter'],
    ['Paul', 'enter'],
    ['Paul', 'exit'],
    ['Paul', 'enter'],
  ];
  const expected = [['Paul'], []];
  t.deepEqual(getInvalidLogs(input), expected);
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
  t.deepEqual(getInvalidLogs(input), expected);
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
  t.deepEqual(getInvalidLogs(input), expected);
});
