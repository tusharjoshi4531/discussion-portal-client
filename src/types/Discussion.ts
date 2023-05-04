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
    body: string;
    subComments?: ICommentData[];
}
