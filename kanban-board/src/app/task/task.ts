export interface Task {
    id?: string;
    title: string;
    description?: string;
    priority? :string;
    assignee? :string;
    status? :string;
    dueDate? : string;
    comments? :string;
    label? : string;
}