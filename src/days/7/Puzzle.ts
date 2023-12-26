const first = (input: string) => {
  /*
      --- Info ---
      - Desert Island some parts they need to fix their machines
      - On our journal in a camel we will learn the rules of 'Camel Cards' ~  a game similar to poker but designed to be easier while riding a camel (?)
      
      --- Key takeaways ---
      - You get a list of hands
      - Your goal is to order them based on strength
      - A hand has 5 cards labeled: [A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2]
                                    ^ Strongest       to       weakest  ^
      --- First ordering rule ---
      - Every hand is one of the types
      1. Five of a kind
      2. Four of a kind
      3. Full house
      4. Three of a kind
      5. Two pair
      6. One pair
      7. High card
      
      --- Second ordering rule ---
      If two hands have the same type,
      1. Start by comparing the first card in each hand - the one with the higher value wins
      2. If the first cards are equal (same label), compare the second cards in each hand

      Eg:
      33332
      2AAAA

      Both are 'Four of a kind' 
      but the second hand is stronger because 3 > 2

      77888
      77788

      Both are 'Full house'
      but the first hand is stronger because 8 > 7

      
      --- Eg: ---
      32T3K 765
      T55J5 684
      KK677 28
      KTJJT 220
      QQQJA 483
      ^ hand + bid
      
      --- Calculated value ---
      - Each hand wins an amount equal to its bid multiplied by its rank
      - Weakest hand gets rank 1, second weakest gets rank 2, etc.
      - This goes up until rank 5 as we have 5 hands in this eg
      
      Expected Sol:
      --- Step 1 - Order the hands by strength ---
      . 32T3K is a 'One pair' (rank 1) -> every other hand is stronger than this
      . KK677, KTJJT are both 'Two pair' (rank 3 & rank 2) -> KK677 is stronger than KTJJT because K > T
      . QQQJA, TJJJ5 are both 'Three of a kind' (rank 5 & rank 4) -> QQQJA is stronger than TJJJ5 because Q > T 
      --- Step 2 - Calculate total winnings ---
      . Add up the result of multiplying each hand's bid with its rank
      . 765 * 1 = 765
      . 684 * 4 = 1368
      .  28 * 3 = 84
      . 220 * 2 = 880
      . 483 * 5 = 2415
                -------
                  6440

      */
  let startIdx = 0;
  let result = 0;

  type HandStrength = Record<string, number>;

  const handStrength: HandStrength = {
    "Five of a kind": 7,
    "Four of a kind": 6,
    "Full house": 5,
    "Three of a kind": 4,
    "Two pair": 3,
    "One pair": 2,
    "High card": 1,
  };

  const cardStrength: Record<string, number> = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
  };

  type Hand = {
    cards: string;
    bid: number;
    rank: number;
    strength: number;
  };

  const hands: Hand[] = [];

  function getHandStrength(hand: string): number {
    const counts = new Map<string, number>();
    for (const card of hand) {
      counts.set(card, (counts.get(card) || 0) + 1);
    }

    const sortedCounts = Array.from(counts.values()).sort((a, b) => b - a);

    if (sortedCounts[0] === 5) {
      return handStrength["Five of a kind"];
    } else if (sortedCounts[0] === 4) {
      return handStrength["Four of a kind"];
    } else if (sortedCounts[0] === 3 && sortedCounts[1] === 2) {
      return handStrength["Full house"];
    } else if (sortedCounts[0] === 3) {
      return handStrength["Three of a kind"];
    } else if (sortedCounts[0] === 2 && sortedCounts[1] === 2) {
      return handStrength["Two pair"];
    } else if (sortedCounts[0] === 2) {
      return handStrength["One pair"];
    } else {
      return handStrength["High card"];
    }
  }

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\n" || i === input.length - 1) {
      const line = input.slice(startIdx, i + 1);
      // console.log(line);
      // console.log("");
      const [cards, bid] = line.split(" ");
      const rank = -1;

      // Sort into one of hand types, no rank yet so -1
      hands.push({
        cards,
        bid: Number(bid),
        rank,
        strength: getHandStrength(cards),
      });

      startIdx = i + 1;
      // console.log("");
      // console.log(
      //   "-------------------------------------------------------------------------------------------------------------------------------"
      // );
    }
  }

  console.log("hands: ", hands);
  // Sort hands by strength
  // For equal strength hands, compare the first X cards each hand until one is stronger
  const sortedByStrength = hands.sort((h1, h2) => h2.strength - h1.strength);
  console.log("sortedByStrength: ", sortedByStrength);
  const sortedByStrengthAndCards = sortedByStrength.sort((h1, h2) => {
    if (h1.strength !== h2.strength) {
      return h2.strength - h1.strength;
    }

    for (let i = 0; i < h1.cards.length; i++) {
      const card1 = cardStrength[h1.cards[i]];
      const card2 = cardStrength[h2.cards[i]];

      if (card1 !== card2) {
        return card2 - card1;
      }
    }

    return 0;
  });
  console.log("sortedByStrengthAndCards: ", sortedByStrengthAndCards);
  // Update the rank of each hand
  for (let i = 0; i < sortedByStrengthAndCards.length; i++) {
    sortedByStrengthAndCards[i].rank = sortedByStrengthAndCards.length - i;
  }
  console.log("updated ranks are: ", sortedByStrengthAndCards);

  // Calculate the total winnings
  for (const hand of sortedByStrengthAndCards) {
    result += hand.bid * hand.rank;
  }
  console.log("result: ", result);
  return result;
};

const expectedFirstSolution = "251287184";

const second = (input: string) => {
  /*
      --- Info ---
      - Now J cards are jokers ~  wildcards that can act as whatever card that would make the hand the strongest
      - To rebalance the game, J are also the weakest card individually
      
      --- Key takeaways ---
      - Although J can pretend to be whatever card, to break ties
      for eg between JKKK2 & QQQQ2  --> both are 'Four of a kind'
                                    --> but J is always treated as J,
                                        so QQQQ2 is stronger because J < Q 

      --- Calculated value ---
      - idem

      --- Eg: ---
      32T3K 765
      T55J5 684
      KK677 28
      KTJJT 220
      QQQJA 483
      ^ hand + bid

      Expected Sol:
      --- Step 1 - Order the hands by strength ---
      - 32T3K is still a 'One pair' (rank 1) -> every other hand is stronger than this
      - KK677 is now the only 'Two pair' (rank 2) -> every other hand is stronger than this
      - T55J5, KTJJT & QQQJA are now all 'Four of a kind'
        T55JS gets rank 3 (T < Q)
        QQQJA gets rank 4 (Q > T)
        KTJJT gets rank 5 (K > Q)

      --- Step 2 - Calculate total winnings ---
      now should be 5905
      */
  let startIdx = 0;
  let result = 0;

  type HandStrength = Record<string, number>;

  const handStrength: HandStrength = {
    "Five of a kind": 7,
    "Four of a kind": 6,
    "Full house": 5,
    "Three of a kind": 4,
    "Two pair": 3,
    "One pair": 2,
    "High card": 1,
  };

  const cardStrength: Record<string, number> = {
    A: 14,
    K: 13,
    Q: 12,
    T: 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
    J: 1,
  };

  type Hand = {
    cards: string;
    bid: number;
    rank: number;
    strength: number;
  };

  const hands: Hand[] = [];

  function getHandStrength(hand: string): number {
    const counts = new Map<string, number>();
    for (const card of hand) {
      counts.set(card, (counts.get(card) || 0) + 1);
    }

    // If there's a Joker in the hand, it can act as any card to make the hand the strongest
    if (counts.has("J")) {
      const jokerCount = counts.get("J")!;
      counts.delete("J");

      const maxCountCard = Array.from(counts.entries()).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      counts.set(maxCountCard, (counts.get(maxCountCard) || 0) + jokerCount);
    }

    const sortedCounts = Array.from(counts.values()).sort((a, b) => b - a);

    if (sortedCounts[0] === 5) {
      return handStrength["Five of a kind"];
    } else if (sortedCounts[0] === 4) {
      return handStrength["Four of a kind"];
    } else if (sortedCounts[0] === 3 && sortedCounts[1] === 2) {
      return handStrength["Full house"];
    } else if (sortedCounts[0] === 3) {
      return handStrength["Three of a kind"];
    } else if (sortedCounts[0] === 2 && sortedCounts[1] === 2) {
      return handStrength["Two pair"];
    } else if (sortedCounts[0] === 2) {
      return handStrength["One pair"];
    } else {
      return handStrength["High card"];
    }
  }

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\n" || i === input.length - 1) {
      const line = input.slice(startIdx, i + 1);
      // console.log(line);
      // console.log("");
      const [cards, bid] = line.split(" ");
      const rank = -1;

      // Sort into one of hand types, no rank yet so -1
      hands.push({
        cards,
        bid: Number(bid),
        rank,
        strength: getHandStrength(cards),
      });

      startIdx = i + 1;
      // console.log("");
      // console.log(
      //   "-------------------------------------------------------------------------------------------------------------------------------"
      // );
    }
  }

  console.log("hands: ", hands);
  // Sort hands by strength
  // For equal strength hands, compare the first X cards each hand until one is stronger
  const sortedByStrength = hands.sort((h1, h2) => h2.strength - h1.strength);
  console.log("sortedByStrength: ", sortedByStrength);
  const sortedByStrengthAndCards = sortedByStrength.sort((h1, h2) => {
    if (h1.strength !== h2.strength) {
      return h2.strength - h1.strength;
    }

    for (let i = 0; i < h1.cards.length; i++) {
      const card1 = cardStrength[h1.cards[i]];
      const card2 = cardStrength[h2.cards[i]];

      if (card1 !== card2) {
        return card2 - card1;
      }
    }

    return 0;
  });
  console.log("sortedByStrengthAndCards: ", sortedByStrengthAndCards);
  // Update the rank of each hand
  for (let i = 0; i < sortedByStrengthAndCards.length; i++) {
    sortedByStrengthAndCards[i].rank = sortedByStrengthAndCards.length - i;
  }
  console.log("updated ranks are: ", sortedByStrengthAndCards);

  // Calculate the total winnings
  for (const hand of sortedByStrengthAndCards) {
    result += hand.bid * hand.rank;
  }
  console.log("result: ", result);
  return result;
};

const expectedSecondSolution = "solution 2";

export { first, expectedFirstSolution, second, expectedSecondSolution };
