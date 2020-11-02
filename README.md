# Interview - Card Reader

DMSi has a secure access room with a card reader on each side. You must scan to enter and scan to exit. However, we've been having some issues with access logs lately. It seems that while the card reader is permitting entry, it is dropping some logs. We need to determine if it is the fault of the reader or the fault of the individuals' proxy cards. In order to do so, we must identify which employees have a dropped log entry.

Our logs are formatted as an Array of scan log objects. Each log contains the employee name and the type of scan that was recorded, `enter` or `exit`.

```js
[
  { employee: 'Paul', scan: 'enter' },
  { employee: 'Mary', scan: 'enter' },
  { employee: 'Mary', scan: 'exit' },
  { employee: 'Paul', scan: 'exit' },
];
```

We want to get a tuple where the first item is an Array of employee names whose exits failed to log, and the second item is an Array of employee names whose entries failed to log.

```js
[
  [
    /* exits */
  ],
  [
    /* entries */
  ],
];
```

An example would be the case of Paul this morning. He scanned into the room, presumably spent some time in there, and then left. However, his exit did not log.

```js
[
  { employee: 'Paul', scan: 'enter' },
  { employee: 'Mary', scan: 'enter' },
  { employee: 'Benedict', scan: 'enter' },
  { employee: 'Mary', scan: 'exit' },
  { employee: 'Benedict', scan: 'exit' },
];
```

Given this log, we would want to return a tuple that looks like this:

```js
[['Paul'], []];
```

Importantly, the room is physically empty at the start and end of the day. So we can be certain that if a person's first entry is an `exit` or last entry is an `enter` that they are missing a log.

Since we are really just trying to debug a hardware problem, we don't need a verbose list of every bad record. Rather, we want a list of bad exits and entries where an employee **appears only once** in each list. If Paul has multiple bad entries, he should only appear once in the `badEntries` Array. However, if he had a bad entry **and** bad exit, he should appear only once in both Arrays.
