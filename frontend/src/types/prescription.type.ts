type Step = ".00" | ".25" | ".50" | ".75";
type IntRange =
  | "-20"
  | "-19"
  | "-18"
  | "-17"
  | "-16"
  | "-15"
  | "-14"
  | "-13"
  | "-12"
  | "-11"
  | "-10"
  | "-9"
  | "-8"
  | "-7"
  | "-6"
  | "-5"
  | "-4"
  | "-3"
  | "-2"
  | "-1"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20";

export type EyePossibleDiopter = `${IntRange}${Step}` | "20.00";

export type EyeDetail = {
  sph: number;
  cyl: number;
  axis: number;
};

export type EyeFinalDetail = {
  sph: number;
  cyl: number;
  axis: number;
  add: number;
};

export type EyePrescript = {
  id: string;
  time: string;
  pd: number;
  right_eye: {
    vd: number;
    first_time: EyeDetail;
    second_time: EyeDetail;
    avg: EyeDetail;
  };
  left_eye: {
    vd: number;
    first_time: EyeDetail;
    second_time: EyeDetail;
    avg: EyeDetail;
  };
};

export type EyeFinalPrescript = {
  left_eye: EyeFinalDetail;
  right_eye: EyeFinalDetail;
};
