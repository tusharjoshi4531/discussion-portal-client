export interface ITopic {
    title: string;
    author: string;
    description: string;
    tags: [];
    id: string;
    isStarred: boolean;
}

export interface IComment {
    id: string;
    author: string;
    parentId: string;
    replyId: string;
    content: string;
    upvotes: number;
    upvoteStatus: 0 | -1 | 1;
}

export interface IReply {
    id: string;
    author: string;
    content: string;
    upvotes: number;
    upvoteStatus: 0 | -1 | 1;
}
