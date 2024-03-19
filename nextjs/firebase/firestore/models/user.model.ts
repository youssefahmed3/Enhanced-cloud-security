import {WatermarkType, WatermarkedImageType} from '../modeltypes/modelTypes'
export default class User {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public avatar?: string,
        public createdAt?: Date,
        public updatedAt?: Date,

    ) {}
    
    /* From Firestore to object i can use */
    static fromFirestore(doc: any): User {
        const data = doc.data();
        return new User(
            doc.id,
            data.username,
            data.email,
            data.avatar,
            data.createdAt.toDate(),
            data.updatedAt.toDate()
        );
    }
    /* From an object to a firestore document */
    toFirestore(): object {
        const now = new Date();
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            avatar: this.avatar || "",
            createdAt: this.createdAt || now,
            updatedAt: this.updatedAt || now,
        };
    }
}