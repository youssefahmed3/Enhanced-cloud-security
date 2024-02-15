interface UserType {
    id?: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    avatar?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface WatermarkType {
    id?: string;
    name: string;
    watermarkUrl: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface WatermarkedImageType {
    id?: string;
    name: string;
    watermarkId: string;
    watermarkedUrl: string;
    keypointsFeatures: {};
    descriptorsFeatures: {};
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;

}

export type {UserType, WatermarkType,WatermarkedImageType}