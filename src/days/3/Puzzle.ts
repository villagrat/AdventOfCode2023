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

  // console.log("");
  // console.log("matrix: ", matrix);
  // console.log("");

  for (let i = 0; i < matrix.length; i++) {
    const numbers = matrix[i].replace(/\./g, " ");
    // console.log("");
    // console.log("for i: ", i);
    // console.log("numbers - not dots: ", numbers);
    // console.log("");
    const regex = /\d+/g;
    let match;
    while ((match = regex.exec(numbers)) !== null) {
      for (let j = match.index; j < match.index + match[0].length; j++) {
        // console.log("");
        // console.log(
        //   "These are the cells surrounding cell with value: ",
        //   match[0]
        // );
        // console.log("matrix[i][j]: ", matrix[i][j]);
        // console.log("I: ", i);
        // console.log("J: ", j);
        // console.log("match.index: ", match.index);
        // console.log("match[0].length: ", match[0].length);
        // console.log("");

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
        // console.log("");
        // console.log("surrounding: ", surrounding);
        // console.log("");
        // Check if any of the surrounding characters are not numbers
        if (surrounding.some((x) => /[^0-9.]/.test(x))) {
          result += parseInt(match[0]);
          break;
        }
      }
    }
  }

  // console.log(result);
  return result;
};

const expectedFirstSolution = 525181;

const second = (input: string) => {
  /*
      --- Info ---
      - Need to fix a gear in the engine
      - A gear any * symbol that is adjecent to exactly two part numbers
      - It's gear ratio is the result of multiplying those two part numbers together
      - Need to find the gear ratio of every gear and add them all up

      --- Key takeaways ---
      -

      --- Calculated value ---
      -

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
      In this schematic we have two gears
      First being in the top left, with gear ratio 467 * 35 = 16345
      Second being in the bottom right, with gear ratio 598 * 755 = 451490
      The sum of both these gear ratios is 467835
      */
  const matrix = input.split("\n");
  let result: number = 0;

  console.log("");
  console.log("matrix: ", matrix);
  console.log("");

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "*") {
        const surrounding = [
          matrix[i - 1]?.[j - 1] ?? ".",
          matrix[i - 1]?.[j] ?? ".",
          matrix[i - 1]?.[j + 1] ?? ".",
          matrix[i]?.[j - 1] ?? ".",
          matrix[i]?.[j + 1] ?? ".",
          matrix[i + 1]?.[j - 1] ?? ".",
          matrix[i + 1]?.[j] ?? ".",
          matrix[i + 1]?.[j + 1] ?? ".",
        ];

        console.log(
          `* found at (${i}, ${j}), surrounding cells: ${surrounding}`
        );

        const numbers = surrounding.filter((x) => /\d+/.test(x));

        if (numbers.length === 2) {
          result += parseInt(numbers[0]) * parseInt(numbers[1]);
        }
      }
    }
  }
  console.log(result);
  return result;
};

const expectedSecondSolution = "solution 2";

export { first, expectedFirstSolution, second, expectedSecondSolution };
