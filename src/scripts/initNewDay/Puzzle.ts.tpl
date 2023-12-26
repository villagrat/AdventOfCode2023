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
    if (input[i] === "\n" || i === input.length - 1) {
      const line = input.slice(startIdx, i);
      // console.log(line);
      // console.log("");
      
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
    if (input[i] === "\n" || i === input.length - 1) {
      const line = input.slice(startIdx, i);
      // console.log(line);
      // console.log("");
      
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
