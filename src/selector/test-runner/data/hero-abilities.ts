

interface HeroAbility {
  hero: string;
  eats?: string[];
  wears?: IClothes[];
  strength: number;
  speed: number;
  results: number[];
}

interface IClothes {
  name: string;
  defense?: number;
  attack?: number;
  quality?: number;
}

export const peach = {
  hero: "peach",
  wears : [
    {
      name : "dress",
      defense : 1,
      quality : 100
    },
    {
      name : "umbrella",
      attack : 1,
      defense : 4
    }
  ],
  eats : ['cake', 'turnips', 'sweets'],
  strength : 5,
  speed: 10,
  results : [ 75, 82, 87 ],
};

export const mario = {
  hero : "mario",
  wears : [
    {
      name : "red shirt",
      defense: 2,
    },
    {
      name : "blue pants",
      defense: 2,
    }
  ],
  eats : ["coins", "mushrooms"],
  strength : 15,
  speed: 10,
  results: [ 82, 85, 88 ],
};

export const kerby = {
  hero: "kirby",
  eats : ["everything"],
  strength : 10,
  speed: 7,
  results : [ 82, 86, 10 ],
};

const heroAbilities: HeroAbility[] = [
  peach,
  mario,
  kerby,
];

export default heroAbilities;