export interface News {
    _id?: string;
    title: String,
    description: String,
    date: Date,
    content: String,
    author: String,
    archiveDate?: Date,
    archived: Boolean,
    removed: Boolean
}