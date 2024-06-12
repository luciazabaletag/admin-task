export const TASK_PRIORITY = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
} as const

type PriorityType = {[key: string]: string};

export const TASK_PRIORITY_NAME : PriorityType = {
    "low": 'Baja',
    "medium": 'Media',
    "high": 'Alta'
}