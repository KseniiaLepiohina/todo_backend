import { Auth } from "src/auth/entities/auth.entity";
export declare class ActiveTasks {
    taskId: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    user: Auth;
    userId: number;
}
