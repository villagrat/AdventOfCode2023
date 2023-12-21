const first = (input: string) => {
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
    if (input[i] === "\n") {
      const line = input.slice(startIdx, i);
      // console.log(line);
      // console.log("");
      const condition = line.match(/\d/);
      // console.log(`condition: ${condition}`);
      if (condition) {
        const calculatedValue = condition
        // console.log(`Calculated value is: ${calculatedValue}`);
        result += Number(calculatedValue);
      }
      startIdx = i + 1;
      // console.log("");
      // console.log("-------------------------------------------------------------------------------------------------------------------------------");
    }
  }

    // console.log("result: ", result)
    return result
};

const expectedFirstSolution = "solution 1";

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
    if (input[i] === "\n") {
      const line = input.slice(startIdx, i);
      // console.log(line);
      // console.log("");
      const condition = line.match(/\d/);
      // console.log(`condition: ${condition}`);
      if (condition) {
        const calculatedValue = condition
        // console.log(`Calculated value is: ${calculatedValue}`);
        result += Number(calculatedValue);
      }
      startIdx = i + 1;
      // console.log("");
      // console.log("-------------------------------------------------------------------------------------------------------------------------------");
    }
  }

    // console.log("result: ", result)
    return result
};

const expectedSecondSolution = "solution 2";

export { first, expectedFirstSolution, second, expectedSecondSolution };
