import { NextResponse } from "next/server";
/* import bcrypt from "bcryptjs"; */
import axios from "axios";

export async function POST(req: any) {
    try {
        const { base_url, watermark_url } = req.body;
        
        const response = await axios.post('http://localhost:8000/api/v1/embed_sift', {
            "base_url": base_url as string,
            "watermark_url": watermark_url as string,
          });
        const data = await response.data;


        return NextResponse.json({ message: data }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json(
            { message: `Error in ${e.message}` },
            { status: 500 }
        );
    }
}