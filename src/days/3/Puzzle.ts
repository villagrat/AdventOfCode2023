const first = (input: string) => {
  /*
      --- Info ---
      - The puzzle input is a visual representation of the engine
      - Add up the part numbers in the engine schematic to find which part is missing
      - Any n° adjacent to a symbol, (even diagonally!) is a part number and should be included in the sum
      - Periods (.) do not count as a symbol
      
      --- Key takeaways ---
      - Find a way to match the numbers adjacent to a symbol
      - Once found, add to the sum
      - Periods (.) do not count as a symbol

      --- Calculated value ---
      - Find the sum of all part numbers in the engine schematic

      --- Eg of an engine schematic: ---
      467..114..
      ...*......
      ..35..633.
      ......#...
      617*......
      .....+.58.
      ..592.....
      ......755.
      ...$.*....
      .664.598..

      Expected Sol:
      In this schematic, two numbers are not part numbers because they are not 
      adjacent to a symbol: 114 (top right) and 58 (middle right). 
      Every other number is adjacent to a symbol and so is a part number,
      and their sum is 4361.
  */
  /*
    1. Split the input into lines
    2. For each line, replace the periods with spaces
    3. For each line, find the numbers
    4. For each number, check if it is adjacent to a symbol in any of the 8 directions
    5. If it is, add it to the sum
  */
  const matrix = input.split("\n");
  let result = 0;

  console.log("");
  console.log("matrix: ", matrix);
  console.log("");

  for (let i = 0; i < matrix.length; i++) {
    const numbers = matrix[i].replace(/\./g, " ");
    console.log("");
    console.log("for i: ", i);
    console.log("numbers - not dots: ", numbers);
    console.log("");
    const regex = /\d+/g;
    let match;
    while ((match = regex.exec(numbers)) !== null) {
      for (let j = match.index; j < match.index + match[0].length; j++) {
        console.log("");
        console.log(
          "These are the cells surrounding cell with value: ",
          match[0]
        );
        console.log("matrix[i][j]: ", matrix[i][j]);
        console.log("I: ", i);
        console.log("J: ", j);
        console.log("match.index: ", match.index);
        console.log("match[0].length: ", match[0].length);
        console.log("");

        const surrounding = [
          (matrix[i - 1] ?? "")[j - 1] ?? ".",
          (matrix[i - 1] ?? "")[j] ?? ".",
          (matrix[i - 1] ?? "")[j + 1] ?? ".",
          (matrix[i] ?? "")[j - 1] ?? ".",
          (matrix[i] ?? "")[j] ?? ".",
          (matrix[i] ?? "")[j + 1] ?? ".",
          (matrix[i + 1] ?? "")[j - 1] ?? ".",
          (matrix[i + 1] ?? "")[j] ?? ".",
          (matrix[i + 1] ?? "")[j + 1] ?? ".",
        ];
        console.log("");
        console.log("surrounding: ", surrounding);
        console.log("");
        // Check if any of the surrounding characters are not numbers
        if (surrounding.some((x) => /[^0-9.]/.test(x))) {
          result += parseInt(match[0]);
          break;
        }
      }
    }
  }

  console.log(result);
  return result;
};

const expectedFirstSolution = 525181;

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
      // console.log(". . . . . . . . . . ");
      const condition1 = line.match(/\d/);
      const condition2 = line.match(/\d/);
      // console.log(`condition1 value: ${condition1}, condition2: ${condition2}`);
      // console.log(`Calculated value is: ${condition1 + condition2}`);
      // console.log(". . . . . . . . . . ");
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
