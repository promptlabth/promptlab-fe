import { Feature, Language, Tone } from "@/models/types/config.types";

export type Config = {
    languages: Language[];
    tones: Tone[];
    features: Feature[];
}