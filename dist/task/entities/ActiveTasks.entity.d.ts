import { Auth } from "src/auth/entities/auth.entity";
export declare class ActiveTasks {
    task_id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    user: Auth;
    user_id: number;
}
