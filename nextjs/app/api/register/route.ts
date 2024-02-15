/* import User from "@/lib/models/user.model"; */
/* import { connectToDb } from "@/lib/mongoose"; */
import { NextResponse } from "next/server";
/* import bcrypt from "bcryptjs"; */
export async function POST(req: any) {
    try {
        /* const { username, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectToDb();
        try {
            const user = await User.create({ username, email, password: hashedPassword });
            console.log(user);
            
        } catch (error: any) {
            if (error.code === 11000) {
                const duplicateField = Object.keys(error.keyValue)[0];
                return NextResponse.json(
                    {
                        field: duplicateField,
                        message: `${duplicateField} already exists.`
                    },
                    { status: 400 }
                );
            }
            console.log(error.message);
        }
 */
        return NextResponse.json({ message: "User Registered" }, { status: 201 });
    } catch (e: any) {
        return NextResponse.json(
            { message: `Error in ${e.message}` },
            { status: 500 }
        );
    }
}