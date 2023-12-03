const first = (input: string) => {
  let startIdx = 0;
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\n") {
      const line = input.slice(startIdx, i);
      /*
      --- Info ---
      - In the bag, cubes are either Red, Green, or Blue.
      - The elf will hide a secret n° of cubes of each color in the bag
      - Each game played is identified by an uuid followed by a colon, eg: Game ll:
      - Subsets of cubes that were revealed from the bag, eg: 3 red, 5 green, 4 blue
      
      --- Key takeaways ---
      - Sets are divided by ;
      - Values in a subset are divided by ,

      --- Calculated value ---
      - Find games that would have been possible if the bag contained only 12 Red, 13 Green & 14 Blue cubes
      - The calculated value is the sum of the uuids of the games that are possible

      --- Eg of a game played: ---
      Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
      Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
      Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
      Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
      Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

      Expected Sol:
      Games 1,2 & 5 are possible
      Game 3 is impossible bc Elf showed 20 Red > 14 Red in the bag
      Game 4 is impossible bc Elf showed 15 Blue > 12 Blue in the bag
      */
      // console.log(line);
      // console.log(". . . . . . . . . . ");
      // Extract uuid
      const uuid = line.match(/\d+/);
      // console.log(`uuid: ${uuid}`);
      // Match the subsets for the line
      // knowing that a subset is a string of digits followed by a space followed by a word and that subsets are separated by a ;
      // Ignore the uuid and the colon on subset parse
      const uuidLength = uuid[0].length;
      let currentSubset: string = "";
      let currentSubsetStartIdx = 6 + uuidLength;
      const subsets: { [key: number]: string } = {};
      let subsetIndex = 1;
      for (let j = currentSubsetStartIdx; j < line.length; j++) {
        if (line[j] === ";") {
          currentSubset = line.slice(currentSubsetStartIdx, j);
          // console.log(`currentSubset: ${currentSubset}`);
          subsets[subsetIndex] = currentSubset.trim();
          currentSubsetStartIdx = j + 1;
          subsetIndex++;
        }
      }
      // Handle the last subset
      if (currentSubsetStartIdx < line.length) {
        currentSubset = line.slice(currentSubsetStartIdx);
        subsets[subsetIndex] = currentSubset.trim();
      }
      // console.log(`subsets: ${JSON.stringify(subsets)}`);
      // Check if current game is possible
      let currentGameIsPossible = true;
      for (const subset in subsets) {
        // console.log("^".repeat(50));
        // console.log(`subset: ${subsets[subset]}`);
        // Check if game is possible for each color
        const redCountMatch = subsets[subset].match(/(?<=\b)\d+(?= red)/);
        const greenCountMatch = subsets[subset].match(/(?<=\b)\d+(?= green)/);
        const blueCountMatch = subsets[subset].match(/(?<=\b)\d+(?= blue)/);

        const redCount = redCountMatch ? Number(redCountMatch[0]) : 0;
        const greenCount = greenCountMatch ? Number(greenCountMatch[0]) : 0;
        const blueCount = blueCountMatch ? Number(blueCountMatch[0]) : 0;
        // console.log(`redCount: ${redCount}`);
        // console.log(`greenCount: ${greenCount}`);
        // console.log(`blueCount: ${blueCount}`);
        if (
          (redCount && redCount > 0) ||
          (greenCount && greenCount > 0) ||
          (blueCount && blueCount > 0)
        ) {
          if (redCount > 12 || greenCount > 13 || blueCount > 14) {
            // console.log("found an impossible game...");
            currentGameIsPossible = false;
          }
        }
        // console.log("^".repeat(50));
      }
      // console.log(`is current game possible?: ${currentGameIsPossible}`);
      if (currentGameIsPossible) {
        result += Number(uuid);
      }
      // console.log(". . . . . . . . . . ");
      // console.log(
      //   "-------------------------------------------------------------------------------------------------------------------------------"
      // );
      startIdx = i + 1;
    }
  }

  // 4478 too high
  // console.log("result: ", result);
  return result;
};

const expectedFirstSolution = 2239;

const second = (input: string) => {
  /*
      --- Info ---
      - 
      
      --- Key takeaways ---
      - Sets are divided by ;
      - Values in a subset are divided by ,

      --- Calculated value ---
      - In each game, find the fewest n° of cubes of each color that could have made the game possible
      - Then, the value for a set is the power of the n° of cubes of each color
      - The calculated value is the sum of the powers found for each game

      --- Eg of a game played: ---
      Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
      Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
      Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
      Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
      Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
      
      Expected Sol:
      Game 1 - the game could have been played with as few as 4 red, 2 green, and 6 blue cubes. If any color had even one fewer cube, the game would have been impossible.
      Game 2 - could have been played with a minimum of 1 red, 3 green, and 4 blue cubes.
      Game 3 - must have been played with at least 20 red, 13 green, and 6 blue cubes.
      Game 4 - required at least 14 red, 3 green, and 15 blue cubes.
      Game 5 - needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag.
      */
  let startIdx = 0;
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\n") {
      const line = input.slice(startIdx, i);
      // console.log(line);
      // console.log(". . . . . . . . . . ");
      // Extract uuid
      const uuid = line.match(/\d+/);
      // Find minimum n° of cubes of each color to make game possible
      let minRedCount = 0;
      let minGreenCount = 0;
      let minBlueCount = 0;
      // console.log(`uuid: ${uuid}`);
      // Match the subsets for the line
      // knowing that a subset is a string of digits followed by a space followed by a word and that subsets are separated by a ;
      // Ignore the uuid and the colon on subset parse
      const uuidLength = uuid[0].length;
      // Parse subsets
      let currentSubset: string = "";
      let currentSubsetStartIdx = 6 + uuidLength;
      const subsets: { [key: number]: string } = {};
      let subsetIndex = 1;
      for (let j = currentSubsetStartIdx; j < line.length; j++) {
        if (line[j] === ";") {
          currentSubset = line.slice(currentSubsetStartIdx, j);
          // console.log(`currentSubset: ${currentSubset}`);
          subsets[subsetIndex] = currentSubset.trim();
          currentSubsetStartIdx = j + 1;
          subsetIndex++;
        }
      }
      // Handle the last subset
      if (currentSubsetStartIdx < line.length) {
        currentSubset = line.slice(currentSubsetStartIdx);
        subsets[subsetIndex] = currentSubset.trim();
      }
      // console.log(`subsets: ${JSON.stringify(subsets)}`);
      for (const subset in subsets) {
        // console.log("^".repeat(50));
        // console.log(`subset: ${subsets[subset]}`);
        // Count RGB on current subset
        const redCountMatch = subsets[subset].match(/(?<=\b)\d+(?= red)/);
        const greenCountMatch = subsets[subset].match(/(?<=\b)\d+(?= green)/);
        const blueCountMatch = subsets[subset].match(/(?<=\b)\d+(?= blue)/);

        const redCount = redCountMatch ? Number(redCountMatch[0]) : 0;
        const greenCount = greenCountMatch ? Number(greenCountMatch[0]) : 0;
        const blueCount = blueCountMatch ? Number(blueCountMatch[0]) : 0;
        // console.log(`redCount: ${redCount}`);
        // console.log(`greenCount: ${greenCount}`);
        // console.log(`blueCount: ${blueCount}`);
        // check if RGB count is higher than min RGB count
        // if so update min RGB count
        if (redCount > minRedCount) {
          minRedCount = redCount;
        }
        if (greenCount > minGreenCount) {
          minGreenCount = greenCount;
        }
        if (blueCount > minBlueCount) {
          minBlueCount = blueCount;
        }
        // console.log("^".repeat(50));
      }
      // console.log(`is current game possible?: ${currentGameIsPossible}`);
      // Calculate multiplier for current game and add it to the sum
      const currentGameMultiplier = minRedCount * minGreenCount * minBlueCount;
      // console.log(`currentGameMultiplier: ${currentGameMultiplier}`);
      result += currentGameMultiplier;

      // console.log(". . . . . . . . . . ");
      // console.log(
      //   "-------------------------------------------------------------------------------------------------------------------------------"
      // );
      startIdx = i + 1;
    }
  }

  // console.log("result: ", result);
  return result;
};

const expectedSecondSolution = 83435;

export { first, expectedFirstSolution, second, expectedSecondSolution };
