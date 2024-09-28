
export enum TopVoiceType {
    Gold = "gold",
    Blue = "blue",
    Unicorn = "unicorn"
}

export interface TopVoice {
    type: TopVoiceType;
    description: string;
    createdAt: Date;
}