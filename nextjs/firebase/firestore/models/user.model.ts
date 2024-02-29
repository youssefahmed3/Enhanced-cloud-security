export default class User {
    constructor(
        public id: string,
        public firstname: string,
        public lastname: string,
        public username: string,
        public email: string,
        public avatar?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public watermarks?: [string],
        public watermarkedImages?: [string],

    ) {}
    
    /* From Firestore to object i can use */
    static fromFirestore(doc: any): User {
        const data = doc.data();
        return new User(
            doc.id,
            data.firstname,
            data.lastname,
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
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.username,
            email: this.email,
            photoUrl: this.avatar || "",
            createdAt: this.createdAt || now,
            updatedAt: this.updatedAt || now,
            watermarks: this.watermarks || [],
            watermarkedImages: this.watermarkedImages || [],
        };
    }
}