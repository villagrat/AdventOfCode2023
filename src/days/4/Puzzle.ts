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
      // console.log(line);
      // console.log("");
      const [part1, part2] = cardData.split("|").map((part) => part.trim());
      // console.log(`Part 1: ${part1}`);
      // console.log(`Part 2: ${part2}`);
      const numbers1 = part1.split(/\s+/).map(Number);
      const numbers2 = part2.split(/\s+/).map(Number);
      // console.log(`Numbers 1: ${numbers1}`);
      // console.log(`Numbers 2: ${numbers2}`);
      numbers1.forEach((num) => winning.add(num));
      numbers2.forEach((num) => yours.add(num));
      // console.log(`Set 1: ${Array.from(winning).join(", ")}`);
      // console.log(`Set 2: ${Array.from(yours).join(", ")}`);

      const commonNumbers = Array.from(yours).filter((num) => winning.has(num));
      // console.log(
      //   `Number of your numbers present in winning: ${commonNumbers.length}`
      // );
      if (commonNumbers.length > 0) {
        result += Math.pow(2, commonNumbers.length - 1);
      }

      winning.clear();
      yours.clear();

      startIdx = i + 1;
      // console.log("");
      // console.log(
      //   "-------------------------------------------------------------------------------------------------------------------------------"
      // );
    }
  }

  console.log("result: ", result);
  return result;
};

const expectedFirstSolution = "solution 1";

const second = (input: string) => {
  /*
      --- Info ---
      - Rules are printed on the back of the card... of course...
      
      --- Key takeaways ---
      - There are no points
      - Scratchcards only cause you to win more scratchcards, equal to the n° of winning numbers you have
      - You win 'copies' of the scratchcards below the winning card equal to the n° of matches
      - Copies of scrachcards are scored like normal scratchcards and have the same card number as the card they copied
      - Eg: if card 10 were to have 5 matching numbers, you would win a copy of each of cards 11, 12, 13, 14 & 15

      --- Eg: ---
      Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
      Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
      Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
      Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
      Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
      Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
            ^ winning numbers           ^ your numbers

      Expected Sol:
      - Card 1 has 4 matching numbers, so you win 1 copy each of the next 4 cards (C2, C3, C4, C5)
      - Your 2 instances of C2 (1 OG + 1 copy) have 2 matching numbers, so you win 2 copies of the next 2 cards (C3)
      - Your 4 instances of C3 (1 OG + 3 copies) have 2 matching numbers, so you win 4 copies each of C4 & C5
      - Your 8 instances of C4 (1 OG + 7 copies) have 1 matching number, so you win 8 copies of C5
      - Your 14 instances of C5 (1 OG + 13 copies) have 0 matching numbers, so you win nothing
      - Your 1 instance of C6 has 0 matching numbers, so you win nothing

      --- Calculated value ---
      - 
      Final count of instances of scratchcards
      C1: 1
      C2: 2
      C3: 4
      C4: 8
      C5: 14
      C6: 1

      array should be [1,2,4,8,14,1]

      COUNT of all scratchcards = 30
      */
  let startIdx = 0;
  const winning = new Set<number>();
  const yours = new Set<number>();

  // Split the input by newline and get the length
  const numberOfLines = input.split("\n").length;
  console.log("Number of lines: ", numberOfLines);

  // Initialize an array of length numberOfLines with value 1
  const scratchcards = new Array(numberOfLines).fill(1);
  console.log("Scratchcards: ", scratchcards);
  console.log("");

  let result = 0;
  for (let i = 0; i < input.length; i++) {
    if ((input[i] === "\n" || i === input.length - 1) && startIdx !== i) {
      const line = input.slice(startIdx, i).trim();
      const cardTitle = line.split(":")[0].trim();
      const cardNumber = Number(cardTitle.match(/\d+/)[0]);
      const cardData = line.split(":")[1].trim();
      console.log("-------------------------------------");
      console.log(line);
      console.log("");
      const [part1, part2] = cardData.split("|").map((part) => part.trim());
      // console.log(`Part 1: ${part1}`);
      // console.log(`Part 2: ${part2}`);
      const numbers1 = part1.split(/\s+/).map(Number);
      const numbers2 = part2.split(/\s+/).map(Number);
      // console.log(`Numbers 1: ${numbers1}`);
      // console.log(`Numbers 2: ${numbers2}`);
      numbers1.forEach((num) => winning.add(num));
      numbers2.forEach((num) => yours.add(num));
      // console.log(`Set 1: ${Array.from(winning).join(", ")}`);
      // console.log(`Set 2: ${Array.from(yours).join(", ")}`);

      const commonNumbers = Array.from(yours).filter((num) => winning.has(num));
      const matches = commonNumbers.length;

      console.log("Current card number: ", cardNumber);
      // If there are matches, add the number of matches to the scratchcards array
      if (matches > 0) {
        console.log(
          `We have some ${matches} winning numbers, they are ${commonNumbers}`
        );
        const instances = scratchcards[cardNumber - 1];
        console.log("");
        console.log("Snapshot @ start of all our cards: ", scratchcards);
        console.log("");
        console.log;
        console.log(
          `Your ${instances} instances of card ${cardNumber} have ${matches} matching numbers, so you win ${instances} for the next ${matches} cards`
        );
        const endIdx = Math.min(cardNumber + matches, scratchcards.length);
        for (let idx = cardNumber; idx < endIdx; idx++) {
          scratchcards[idx] += instances;
        }
        console.log("");
        console.log("Snapshot @ end of all our cards: ", scratchcards);
        console.log("");
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
  console.log("scratchcards: ", scratchcards);
  result = scratchcards.reduce((acc, curr) => acc + curr, 0);
  console.log("result: ", result);
  return result;
};

// 5647978 too low
// 8467762 - OFF BY ONE!!1)))
// 8467763 too high
const expectedSecondSolution = "8467762";

export { first, expectedFirstSolution, second, expectedSecondSolution };
