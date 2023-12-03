import { start } from "repl";

const first = (input: string) => {
  let startIdx = 0;
  let calibrationSum = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\n") {
      const line = input.slice(startIdx, i);
      console.log("----");
      console.log(line);
      console.log(". . . . . . . . . . ");
      const startNumber = line.match(/\d/)?.[0];
      const endNumber = line.match(/(\d)(?=\D*$)/)?.[1];
      console.log(`startNumber: ${startNumber}, endNumber: ${endNumber}`);
      console.log(`Calibration value is: ${startNumber + endNumber}`);
      console.log(". . . . . . . . . . ");
      // const startNumber = line.match(/^\d+/); // This gets the whole startNumber but problem 1 only asks for 1st digit of it
      // const endNumber = line.match(/\d+$/);
      if (startNumber && endNumber) {
        console.log(
          `This is a pair I matched: startNumber: ${startNumber}, endNumber: ${endNumber}`
        );
        // console.log(
        //   `Their types are: ${typeof Number(startNumber)}, ${typeof Number(
        //     endNumber
        //   )}`
        // );
        const calibrationValue = startNumber + endNumber;
        console.log(`Their joint calibration value is: ${calibrationValue}`);
        calibrationSum += Number(calibrationValue);
      }
      console.log("----");
      startIdx = i + 1;
    }
  }

  return calibrationSum;
};

const expectedFirstSolution = "solution 1";

const second = (input: string) => {
  // console.log(input);
  return "solution 2";
};

const expectedSecondSolution = "solution 2";

export { first, expectedFirstSolution, second, expectedSecondSolution };
