export interface Blog {
    id: any;
    _id?: string;
    title: string;
    content: string;
    product: string;
    author: Author;
    category?: string;
    comments: Comment[];
    likes: string[];
}

export interface Comment {
    _id: string;
    user: Author;
    content: string;
    timestamp: Date;
}

export interface Author {
    _id: string;
    username: string;
}
