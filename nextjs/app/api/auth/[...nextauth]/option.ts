

    import type { NextAuthOptions, Session } from "next-auth";
    import GithubProvider from "next-auth/providers/github";
    import CredentialsProvider from "next-auth/providers/credentials";
    import GoogleProvider from "next-auth/providers/google";
    import { FirestoreAdapter } from "@auth/firebase-adapter"
    import { signInWithCredential, signInWithEmailAndPassword } from "firebase/auth";
    import { auth } from "@/firebase/config";
    export const options: NextAuthOptions = {
        providers: [
            /* GithubProvider({
                clientId: process.env.GITHUB_ID as string,
                clientSecret: process.env.GITHUB_SECRET as string,
            }), */
            CredentialsProvider({
                id: "credentials",
                name: "Credentials",
                credentials: {
                    email: { label: "Email", type: "email" },
                    password: { label: "Password", type: "password" },
                },
                async authorize(credentials): Promise<any> {
                    return await signInWithEmailAndPassword(auth, credentials?.email || "", credentials?.password || "")
                    .then((userCredential) => {
                        return userCredential.user 
                    })
                    .catch((error) => { return error });
                },
            }),
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
            })
        ],
        callbacks: {
            
            
            async jwt({ token, user }) {
                if (user) {
                    token.user = user;
                }
                return token;
            },
            async session({ session, token }: { session: Session; token: any }) {
                session.user = token.user;
                
                return session;
            },

        },
        secret: process.env.NEXTAUTH_SECRET,
        session: {
            strategy: "jwt",
        },
        pages: {
            signIn: "/signin",
            signOut: "/",
        },
        
    }