import dayjs from "dayjs";

export const generateMonths = (year: number) => {
  return Array.from({ length: 12 }, (_, i) =>
    dayjs().year(year).month(i).format("MMMM YYYY")
  );
};

export const getCurrentYear = () => dayjs().year();