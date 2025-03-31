export enum ProgramPriority {
  Black = 0,
  Premium = 1,
  Classic = 2,
}

export const programPriorityMap: Record<string, ProgramPriority> = {
  "Club La Nación Black": ProgramPriority.Black,
  "Club La Nación Premium": ProgramPriority.Premium,
  "Club La Nación Classic": ProgramPriority.Classic,
};
