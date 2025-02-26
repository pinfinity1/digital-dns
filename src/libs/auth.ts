import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";


interface Credentials {
    token: string;
    userName: string;
}

interface User {
    id: string;
    token: string;
    userName: string;
}

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                token: {label: "Token", type: "text"},
                userName: {label: "Username", type: "text"},
            },
            async authorize (credentials) {
                const {token, userName} = credentials as Credentials;
                
                if( !token || !userName) {
                    throw new Error("Token and Username are required");
                }
                
                return {
                    id: userName,
                    token,
                    userName,
                } as User;
            },
        }),
    ],
    callbacks: {
        async jwt ({token, user}: any) {
            if(user) {
                token.token = user.token;
                token.userName = user.userName;
            }
            return token;
        },
        async session ({session, token}: any) {
            session.token = token.token;
            session.userName = token.userName;
            return session;
        },
    },
    session: {strategy: "jwt"},
});
