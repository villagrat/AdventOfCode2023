const first = (input: string) => {
  // let startIdx = 0;
  let result = 0;
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
      Build a matrix of the numbers in the line
      It will be a NxM matrix where N is the number of lines and M is the length of the line
      Parsed possible parts in the matrix will include:
      - value
      - line n° 
      - coordinates in line, eg: [0,2]
      
      Parsed symbols in the matrix will include:
      - value
      - line n°
      - coordinates in line, eg: [3]
  */
  const matrix: {
    value: string;
    lineNumber: number;
    coordinates: number[];
    shouldCheckIfSum: boolean;
  }[] = [];
  let lineNumber = 0;
  let startIdx = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\n") {
      const line = input.slice(startIdx, i);
      const parts = [];
      const symbols = [];

      let match;
      const numberRegex = /\d+/g;
      while ((match = numberRegex.exec(line))) {
        parts.push({
          value: match[0],
          lineNumber,
          coordinates: [match.index, numberRegex.lastIndex - 1],
          shouldCheckIfSum: true,
        });
      }

      const symbolRegex = /[^\d\.]/g;
      while ((match = symbolRegex.exec(line))) {
        symbols.push({
          value: match[0],
          lineNumber,
          coordinates: [match.index],
          shouldCheckIfSum: false,
        });
      }

      matrix.push(...parts, ...symbols);
      lineNumber++;
      startIdx = i + 1;
    }
  }

  // Sort the matrix by line number and then by the first coordinate
  matrix.sort((a, b) => {
    if (a.lineNumber !== b.lineNumber) {
      return a.lineNumber - b.lineNumber;
    }
    return a.coordinates[0] - b.coordinates[0];
  });

  console.log("matrix: ", matrix);
  // Iterate over the matrix and check if each symbol has a part in its adjacent cells
  for (let i = 0; i < matrix.length; i++) {
    const item = matrix[i];
    if (!item.shouldCheckIfSum) {
      // Check the eight possible adjacent cells
      const adjacentCells = [
        [item.lineNumber - 1, item.coordinates[0] - 1],
        [item.lineNumber - 1, item.coordinates[0]],
        [item.lineNumber - 1, item.coordinates[0] + 1],
        [item.lineNumber, item.coordinates[0] - 1],
        [item.lineNumber, item.coordinates[0] + 1],
        [item.lineNumber + 1, item.coordinates[0] - 1],
        [item.lineNumber + 1, item.coordinates[0]],
        [item.lineNumber + 1, item.coordinates[0] + 1],
      ];
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[j].shouldCheckIfSum) {
          const partStartCoordinate = matrix[j].coordinates[0];
          const partEndCoordinate = matrix[j].coordinates[1];
          if (
            adjacentCells.some(
              (cell) =>
                cell[0] === matrix[j].lineNumber &&
                cell[1] >= partStartCoordinate &&
                cell[1] <= partEndCoordinate
            )
          ) {
            result += Number(matrix[j].value);
            break;
          }
        }
      }
    }
  }

  console.log("result: ", result);
  return result;
};

const expectedFirstSolution = 4361;

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
