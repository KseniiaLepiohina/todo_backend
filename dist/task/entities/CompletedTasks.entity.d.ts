import { Auth } from "src/auth/entities/auth.entity";
export declare class CompletedTasks {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    completedAt: Date;
    userId: number;
    user: Auth;
}
