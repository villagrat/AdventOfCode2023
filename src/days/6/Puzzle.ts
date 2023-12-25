const first = (input: string) => {
  /*
      --- Info ---
      - Time to boat race to win sand. Cool beans
      
      --- Key takeaways ---
      - You get a fixed amount of time during which your boat has to travel as far as it can
      - The puzzle input lists the time allowed for each race and the best time recorded for it
      - Need to go farther in each race than the current record holder
      - Boats are toy boats w/ a big red button:
        a) holding down the btn charges the boat
        b) releasing th btn allows the boat to move
      - Boats move faster the more they are charged, BUT time spent holding the btn counts against the total race time
      - You can only hold the btn @ start of the race & boats don't move until the btn is released
      
      --- Eg: ---
      Time:      7  15   30
      Distance:  9  40  200

      There are 3 races in here
        - The first race lasts 7 milliseconds. The record distance in this race is 9 millimeters.
        - The second race lasts 15 milliseconds. The record distance in this race is 40 millimeters.
        - The third race lasts 30 milliseconds. The record distance in this race is 200 millimeters.

      Given that:
      Your toy boat has a starting speed of zero millimeters per millisecond.
      For each whole millisecond you spend at the beginning of the race holding down the button, the boat's speed increases by one millimeter per millisecond.

      Then your options are:
        - Don't hold the button at all (that is, hold it for 0 milliseconds) at the start of the race. The boat won't move; it will have traveled 0 millimeters by the end of the race.
        - Hold the button for 1 millisecond at the start of the race. Then, the boat will travel at a speed of 1 millimeter per millisecond for 6 milliseconds, reaching a total distance traveled of 6 millimeters.
        - Hold the button for 2 milliseconds, giving the boat a speed of 2 millimeters per millisecond. It will then get 5 milliseconds to move, reaching a total distance of 10 millimeters.
        - Hold the button for 3 milliseconds. After its remaining 4 milliseconds of travel time, the boat will have gone 12 millimeters.
        - Hold the button for 4 milliseconds. After its remaining 3 milliseconds of travel time, the boat will have gone 12 millimeters.
        - Hold the button for 5 milliseconds, causing the boat to travel a total of 10 millimeters.
        - Hold the button for 6 milliseconds, causing the boat to travel a total of 6 millimeters.
        - Hold the button for 7 milliseconds. That's the entire duration of the race. You never let go of the button. The boat can't move until you let go of the button. Please make sure you let go of the button so the boat gets to move. 0 millimeters.

      First Race
      Current record for this race is 9 millimeters, there are actually 4 different ways you could win: you could hold the button for 2, 3, 4, or 5 milliseconds at the start of the race.
      Second Race
      You could hold the button for at least 4 milliseconds and at most 11 milliseconds and beat the record, a total of 8 different ways to win.
      Third Race
      You could hold the button for at least 11 milliseconds and no more than 19 milliseconds and still beat the record, a total of 9 ways you could win.

      --- Calculated value ---
      - Determine the n° of ways you could beat the record in each race
      - Then, multiply these together to get the total n° of ways you could win the entire competition

      Expected Sol:
      4 * 8 * 9 = 288
      */
  const lines = input.split("\n");
  const times = lines[0].split(/\s+/).slice(1).map(Number);
  const distances = lines[1].split(/\s+/).slice(1).map(Number);

  let totalWays = 1;

  for (let i = 0; i < times.length; i++) {
    let ways = 0;
    for (let j = 1; j < times[i]; j++) {
      if (j * (times[i] - j) > distances[i]) {
        ways++;
      }
    }
    totalWays *= ways;
  }

  console.log("totalWays: ", totalWays);
  return totalWays;
};

const expectedFirstSolution = "1159152";

const second = (input: string) => {
  /*
      --- Info ---
      -
      
      --- Key takeaways ---
      -

      --- Calculated value ---
      -

      --- Eg: ---

      Expected Sol:

      */
  let startIdx = 0;
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\n" || i === input.length - 1) {
      const line = input.slice(startIdx, i);
      // console.log(line);
      // console.log("");
      const condition = line.match(/\d/);
      // console.log(`condition: ${condition}`);
      if (condition) {
        const calculatedValue = condition;
        // console.log(`Calculated value is: ${calculatedValue}`);
        result += Number(calculatedValue);
      }
      startIdx = i + 1;
      // console.log("");
      // console.log("-------------------------------------------------------------------------------------------------------------------------------");
    }
  }

  // console.log("result: ", result)
  return result;
};

const expectedSecondSolution = "41513103";

export { first, expectedFirstSolution, second, expectedSecondSolution };
