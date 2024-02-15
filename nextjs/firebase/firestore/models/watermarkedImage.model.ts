export default class WatermarkedImage {
    constructor(
        public id: string,
        public name: string,
        public watermarkId: string,
        public watermarkedUrl: string,
        public keypointsFeatures: {},
        public descriptorsFeatures: {},
        public userId: string,
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
            data.watermarkedUrl,
            data.keypointsFeatures,
            data.descriptorsFeatures,
            data.userId,
            data.createdAt.toDate(),
            data.updatedAt.toDate() // Remove this argument
        );
    }
    /* From an object to a firestore document */
    toFirestore(): object {
        const now = new Date();
        return {
            name: this.name,
            watermarkId: this.watermarkId,
            watermarkedUrl: this.watermarkedUrl,
            keypointsFeatures: this.keypointsFeatures,
            descriptorsFeatures: this.descriptorsFeatures,
            userId: this.userId,
            createdAt: this.createdAt || now,
            updatedAt: this.updatedAt || now,
        };
    }
}