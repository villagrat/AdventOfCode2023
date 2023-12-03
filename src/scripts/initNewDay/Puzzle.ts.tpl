const first = (input: string) => {
  let startIdx = 0;
  let result = 0;
  /*
      --- Info ---
      -
      
      --- Key takeaways ---
      -

      --- Calculated value ---
      -

      --- Eg of a game played: ---

      Expected Sol:

      */
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\n") {
      const line = input.slice(startIdx, i);
      console.log("-------------------------------------------------------------------------------------------------------------------------------");
      console.log(line);
      console.log("");
      const condition1 = line.match(/\d/);
      const condition2 = line.match(/\d/);
      console.log(`condition1 value: ${condition1}, condition2: ${condition2}`);
      console.log(
        `Calculated value is: ${Number(condition1) + Number(condition2)}`
      );
      console.log("");
      if (condition1 && condition2) {
        console.log(
          `This is a pair I matched: condition1: ${condition1}, condition2: ${condition2}`
        );
        // console.log(
        //   `Their types are: ${typeof Number(condition1)}, ${typeof Number(
        //     condition2
        //  )}`
        // );
        const calculatedValue = Number(condition1) + Number(condition2);
        console.log(`Their calculated value is: ${calculatedValue}`);
        result += Number(calculatedValue);
      }
      console.log("-------------------------------------------------------------------------------------------------------------------------------");
      startIdx = i + 1;
    }
  }

  return result;
};

const expectedFirstSolution = "solution 1";

const second = (input: string) => {
  let startIdx = 0;
  let result = 0;
    /*
      --- Info ---
      -
      
      --- Key takeaways ---
      -

      --- Calculated value ---
      -

      --- Eg of a game played: ---

      Expected Sol:

      */
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\n") {
      const line = input.slice(startIdx, i);
      // console.log("-------------------------------------------------------------------------------------------------------------------------------");
      // console.log(line);
      // console.log("");
      const condition1 = line.match(/\d/);
      const condition2 = line.match(/\d/);
      // console.log(`condition1 value: ${condition1}, condition2: ${condition2}`);
      // console.log(`Calculated value is: ${condition1 + condition2}`);
      // console.log("");
      if (condition1 && condition2) {
        // console.log(
        //   `This is a pair I matched: condition1: ${condition1}, condition2: ${condition2}`
        // );
        // console.log(
        //   `Their types are: ${typeof Number(condition1)}, ${typeof Number(
        //     condition2
        //  )}`
        //  );
        const calculatedValue = Number(condition1) + Number(condition2);
        // console.log(`Their calculated value is: ${calculatedValue}`);
        result += Number(calculatedValue);
      }
      // console.log("-------------------------------------------------------------------------------------------------------------------------------");
      startIdx = i + 1;
    }
  }

};

const expectedSecondSolution = "solution 2";

export { first, expectedFirstSolution, second, expectedSecondSolution };
