export interface ITopicData {
    title: string;
    author: string;
    description: string;
    tags: [];
    id: string;
    isStarred: boolean;
}

export interface ICommentData {
    id: string;
    author: string;
    body: string;
    subComments?: ICommentData[];
}

export interface IDiscussionReplyData {
    id: string;
    author: string;
    content: string;
    upvotes: number;
    comments: ICommentData[];
}
