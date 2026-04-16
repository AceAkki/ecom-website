import * as Icon from "@phosphor-icons/react";

// to generate rating
export const StarsRatings = (rating: number) => {
  // hashmaps maps rating with conditions
  const map = new Map([
    [5, rating >= 4.5],
    [4.5, rating >= 4 && rating < 4.5],
    [4, rating >= 3.5 && rating < 4],
    [3.5, rating >= 3 && rating < 3.5],
    [3, rating >= 2.5 && rating < 3],
    [2.5, rating >= 2 && rating < 2.5],
    [2, rating >= 1.5 && rating < 2],
    [1.5, rating >= 1 && rating < 1.5],
    [1, rating >= 0.5 && rating < 1],
  ]);

  // on truthy value to condition we return rating
  for (const [key, condition] of map) {
    if (condition) {
      return key;
    }
  }
  return 0;
};

// to create star and add
export const createStars = (num: number) => {
  let maxStar = 5;
  let fillStarArr;
  let emptyStarArr;
  let halfStar;
  let emptyStarNum;
  let fillStarNum = num;

  let starArr = [];

  // on truthy value for num emptyStar num and fill star nums are updated while on falsy only empty stat num
  !Number.isInteger(num)
    ? ((emptyStarNum = maxStar - Math.ceil(num)), (fillStarNum = num - 0.5))
    : (emptyStarNum = maxStar - num);
  // fill star num is added
  fillStarArr = [...Array(fillStarNum).keys()].map((i) => {
    return <Icon.StarIcon weight="fill" key={i} />;
  });

  // on truthy value half star is added
  if (!Number.isInteger(num)) halfStar = <Icon.StarHalfIcon weight="fill" />;
  // empty stars are added if num is bigger
  if (emptyStarNum > 0) {
    emptyStarArr = [...Array(emptyStarNum).keys()].map(() => {
      return <Icon.StarIcon />;
    });
  }
  starArr = [fillStarArr, halfStar, emptyStarArr];
  return starArr;
};
