export default class WatermarkedImage {
    constructor(
        public id: string,
        public name: string,
        public watermarkId: string,
        public baseUrl: string,
        public watermarkedUrl: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) { }

    /* From Firestore to object i can use */
    static fromFirestore(doc: any): WatermarkedImage {
        const data = doc.data();
        return new WatermarkedImage(
            doc.id,
            data.name,
            data.watermarkId,
            data.baseUrl,
            data.watermarkedUrl,
            data.createdAt.toDate(),
            data.updatedAt.toDate() // Remove this argument
        );
    }
    /* From an object to a firestore document */
    toFirestore(): object {
        const now = new Date();
        return {
            id: this.id,
            name: this.name,
            watermarkId: this.watermarkId,
            baseUrl: this.baseUrl,
            watermarkedUrl: this.watermarkedUrl,
            createdAt: this.createdAt || now,
            updatedAt: this.updatedAt || now,
        };
    }
}