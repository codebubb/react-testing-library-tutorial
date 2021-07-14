export interface IBug {
    id: string;
    description: string;
    priority: BugPriority,
}

export enum BugPriority {
    HIGH = 'High',
    MEDIUM = 'Medium',
    LOW = 'Low',
}