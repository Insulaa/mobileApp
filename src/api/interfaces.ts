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