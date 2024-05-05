interface UserType {
    id?: string;
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
    createdAt?: Date;
    updatedAt?: Date;
}

interface WatermarkedImageType {
    id?: string;
    name: string;
    watermarkUrl: string;
    baseUrl: string;
    watermarkedUrl: string;
    createdAt?: Date;
    updatedAt?: Date;

}

export type {UserType, WatermarkType,WatermarkedImageType}