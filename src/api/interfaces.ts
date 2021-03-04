export interface GlucoseLevelOnly {
  glucose_reading: number;
}

export interface AllGlucoseLevelsOnly {
  glucoseLevels: GlucoseLevelOnly[];
  isLoading: boolean;
  error: string | null;
}