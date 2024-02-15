export default class Watermark {
    constructor(
        public id: string,
        public name: string,
        public watermarkUrl: string,
        public userId: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) { }

    /* From Firestore to object i can use */
    static fromFirestore(doc: any): Watermark {
        const data = doc.data();
        return new Watermark(
            doc.id,
            data.name,
            data.watermarkUrl,
            data.userId,
            data.createdAt.toDate(),
            data.updatedAt.toDate()
        );
    }
    /* From an object to a firestore document */
    toFirestore(): object {
        const now = new Date();
        return {
            name: this.name,
            watermarkUrl: this.watermarkUrl,
            userId: this.userId,
            createdAt: this.createdAt || now,
            updatedAt: this.updatedAt || now,
        };
    }
}