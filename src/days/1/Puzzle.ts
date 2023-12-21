const first = (input: string) => {
  let startIdx = 0;
  let calibrationSum = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\n") {
      const line = input.slice(startIdx, i);
      // console.log("----");
      // console.log(line);
      // console.log(". . . . . . . . . . ");
      const startNumber = line.match(/\d/)?.[0];
      const endNumber = line.match(/(\d)(?=\D*$)/)?.[1];
      // console.log(`startNumber: ${startNumber}, endNumber: ${endNumber}`);
      // console.log(`Calibration value is: ${startNumber + endNumber}`);
      // console.log(". . . . . . . . . . ");
      // const startNumber = line.match(/^\d+/); // This gets the whole startNumber but problem 1 only asks for 1st digit of it
      // const endNumber = line.match(/\d+$/);
      if (startNumber && endNumber) {
        // console.log(
        //   `This is a pair I matched: startNumber: ${startNumber}, endNumber: ${endNumber}`
        // );
        // console.log(
        //   `Their types are: ${typeof Number(startNumber)}, ${typeof Number(
        //     endNumber
        //   )}`
        // );
        const calibrationValue = startNumber + endNumber;
        // console.log(`Their joint calibration value is: ${calibrationValue}`);
        calibrationSum += Number(calibrationValue);
      }
      // console.log("----");
      startIdx = i + 1;
    }
  }

  return calibrationSum;
};

const expectedFirstSolution = 55621;

const second = (input: string) => {
  let lineStartIdx = 0;
  let calibrationSum = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\n") {
      const line = input.slice(lineStartIdx, i);
      // console.log("----");
      // console.log(line);
      // console.log(". . . . . . . . . . ");
      // Build an array with our new definition of digit: either a single digit or the word for it (one,two,etc.)
      /*
      Bugfix: 
      - given the word twone I was matching "two" in regex
      - JS doesnt support overlapping matches so we need to do it manually
      - Manually iterate over the string and check for a match at each position
      */
      // const AllNumInLineArr = line.match(
      //   /(one|two|six|four|five|nine|eight|seven|three|\d)/g
      // ); // this will not match twone as ["two", "one"]
      const words = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ];
      const AllNumInLineArr = [];
      for (let i = 0; i < line.length; i++) {
        for (const word of words) {
          // If a representation of a digit is found, add it to the array
          if (line.substr(i, word.length) === word) {
            AllNumInLineArr.push(word);
            break;
          }
        }
        // Add digits
        if (!isNaN(parseInt(line[i]))) {
          AllNumInLineArr.push(line[i]);
        }
      }
      // console.log("AllNumInLineArr: ", AllNumInLineArr);
      const startNumber = AllNumInLineArr[0];
      const endNumber = AllNumInLineArr[AllNumInLineArr.length - 1];

      // console.log(". . . . . . . .  ");
      // console.log("Found startNumber: ", startNumber);
      // console.log("Found endNumber: ", endNumber);
      // console.log(" . . . . . . . . ");

      // translate the words into numbers
      // only if they are a word (not a digit)
      const NumToWordMap: { [key: string]: string } = {
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
      };
      const shouldTranslateStartNumber = !/\d/.test(startNumber);
      const shouldTranslateEndNumber = !/\d/.test(endNumber);
      const transaltedStartNumber = shouldTranslateStartNumber
        ? NumToWordMap[startNumber]
        : startNumber;
      const transaltedEndNumber = shouldTranslateEndNumber
        ? NumToWordMap[endNumber]
        : endNumber;

      // console.log(
      //   `--> Calibration value is: ${
      //     transaltedStartNumber + transaltedEndNumber
      //   }`
      // );
      // console.log(". . . . . . . . . . ");
      if (transaltedStartNumber && transaltedEndNumber) {
        const calibrationValue = transaltedStartNumber + transaltedEndNumber;
        calibrationSum += Number(calibrationValue);
        // console.log(`And sum is now: ${calibrationSum}`);
      }
      // console.log("----");
      lineStartIdx = i + 1;
    }
  }

  return calibrationSum;
};

// 53587 is too low!
const expectedSecondSolution = 53592;

export { first, expectedFirstSolution, second, expectedSecondSolution };
