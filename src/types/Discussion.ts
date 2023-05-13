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
    upvotes: number;
    upvoteStatus: 0 | -1 | 1;
    subComments?: ICommentData[];
}

export interface IDiscussionReplyData {
    id: string;
    author: string;
    content: string;
    upvotes: number;
    upvoteStatus: 0 | -1 | 1;
    comments: ICommentData[];
}
