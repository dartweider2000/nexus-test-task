export type TPaginationBullet =
  | {
      type: "num";
      num: number;
    }
  | {
      type: "empty";
    };
