import NepaliDate from "nepali-date-converter";

export const formatNepaliDate = (createdDateArray: number[]) => {
  const jsDate = new Date(
    createdDateArray[0],
    createdDateArray[1] - 1,
    createdDateArray[2],
    createdDateArray[3],
    createdDateArray[4],
    createdDateArray[5],
    createdDateArray[6] / 1000
  );

  const npDate = new NepaliDate(jsDate);
  // Now get BS fields
  const bs = npDate.getBS();
  return `${bs.year}/${bs.month}/${bs.date}`;
};
