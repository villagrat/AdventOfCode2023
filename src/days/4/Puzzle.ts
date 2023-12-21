const first = (input: string) => {
  /*
  --- Info ---
      -Welcome to Island Island, time to figure out what some scractchcards mean or whatever
      
      --- Key takeaways ---
      - Each card has 2 lists of numbers separated by a |
      - One is a list of winning numbers and the other a list of numers you have
      - Need to find which of the n° you have appear @ list of winning numbers
      
      --- Calculated value ---
      - The first match makes the card worth one point, then each match after that doubles the point value of the card
      - 

      --- Eg: ---
      Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
      Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
      Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
      Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
      Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
      Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
            ^ winning numbers           ^ your numbers

      Expected Sol:
      - Card 1: of the 5 winning numbers, you have 4. This card is worth 8 points = 2^3
      - Card 2: of the 5 winning numbers, you have 2. This card is worth 2 points = 2^1    
      ...etc

      SUM of all cards value = 13
      */
  let startIdx = 0;
  const winning = new Set<number>();
  const yours = new Set<number>();
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\n" || i === input.length - 1) {
      const line = input.slice(startIdx, i).trim();
      const cardData = line.split(":")[1].trim();
      console.log(line);
      console.log("");
      const [part1, part2] = cardData.split("|").map((part) => part.trim());
      console.log(`Part 1: ${part1}`);
      console.log(`Part 2: ${part2}`);
      const numbers1 = part1.split(/\s+/).map(Number);
      const numbers2 = part2.split(/\s+/).map(Number);
      console.log(`Numbers 1: ${numbers1}`);
      console.log(`Numbers 2: ${numbers2}`);
      numbers1.forEach((num) => winning.add(num));
      numbers2.forEach((num) => yours.add(num));
      console.log(`Set 1: ${Array.from(winning).join(", ")}`);
      console.log(`Set 2: ${Array.from(yours).join(", ")}`);

      const commonNumbers = Array.from(yours).filter((num) => winning.has(num));
      console.log(
        `Number of your numbers present in winning: ${commonNumbers.length}`
      );
      if (commonNumbers.length > 0) {
        result += Math.pow(2, commonNumbers.length - 1);
      }

      winning.clear();
      yours.clear();

      startIdx = i + 1;
      console.log("");
      console.log(
        "-------------------------------------------------------------------------------------------------------------------------------"
      );
    }
  }

  console.log("result: ", result);
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
      // console.log(line);
      // console.log("");
      const condition1 = line.match(/\d/);
      const condition2 = line.match(/\d/);
      // console.log(`condition1 value: ${condition1}, condition2: ${condition2}`);
      // console.log(`Calculated value is: ${condition1 + condition2}`);
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
      startIdx = i + 1;
      // console.log("");
      // console.log("-------------------------------------------------------------------------------------------------------------------------------");
    }
  }

  // console.log("result: ", result)
  return result;
};

const expectedSecondSolution = "solution 2";

export { first, expectedFirstSolution, second, expectedSecondSolution };
