export interface User {
    _id?: string;
    username: string;
    email: string;
    password: string;
    profile: {
        firstName?: string;
        lastName?: string;
        address?: string;
    };
    activityLog: ActivityLog[];
    favorites: string[];
}

export interface ActivityLog {
    action: string;
    timestamp: Date;
}
