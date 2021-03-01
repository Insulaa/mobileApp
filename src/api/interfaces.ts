  export interface UserGlucoseReadings {
    readings: GlucoseReading[];
    isLoading: boolean;
    error: string | null;
  }

export interface GlucoseReading {
        date: string;
        glucose_reading: number;
        id: number;
        patient_id: number;
        timestamp: string;
  }

export interface GlucoseLevelOnly {
  glucose_reading: number;
}

export interface AllGlucoseLevelsOnly {
  glucoseLevels: GlucoseLevelOnly[];
  isLoading: boolean;
  error: string | null;
}