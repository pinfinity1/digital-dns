// Third-party Imports
import CredentialProvider from 'next-auth/providers/credentials'
import NextAuth from "next-auth";
import client from "@/libs/axios";


declare module "next-auth" {
    interface User {
        accessToken?: string;
        username?: string;
    }
    
    interface Session {
        user: {
            accessToken?: string;
            username?: string;
        };
    }
}


export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        CredentialProvider({
            name: 'Credentials',
            type: 'credentials',
            
            credentials: {
                email: {},
                chatId: {},
                password: {}
            },
            async authorize (credentials) {
                if( !credentials.chatId || !credentials.password) {
                    throw new Error('Missing credentials');
                }
                
                try {
                    const loginValue = {
                        email: "",
                        chatId: +credentials.chatId,
                        password: credentials.password
                    }
                    
                    
                    const {data} = await client.post('/api/v1/User/Login', {...loginValue});
                    
                    
                    if( !data.isSuccess) {
                        return null
                    }
                    
                    
                    return {
                        id: credentials.chatId.toString(),
                        accessToken: data.data.token,
                        username: data.data.userName
                    };
                    
                    
                } catch (error) {
                    console.error('Login error:', (error as Error).message);
                }
                
                
            }
        }),
    ],
    
    // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
    session: {
        /*
         * Choose how you want to save the user session.
         * The default is `jwt`, an encrypted JWT (JWE) stored in the session cookie.
         * If you use an `adapter` however, NextAuth default it to `database` instead.
         * You can still force a JWT session by explicitly defining `jwt`.
         * When using `database`, the session cookie will only contain a `sessionToken` value,
         * which is used to look up the session in the database.
         * If you use a custom credentials provider, user accounts will not be persisted in a database by NextAuth.js (even if one is configured).
         * The option to use JSON Web Tokens for session tokens must be enabled to use a custom credentials provider.
         */
        strategy: 'jwt',
        
        // ** Seconds - How long until an idle session expires and is no longer valid
        maxAge: 60 * 60 // ** 30 days
    },
    
    // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
    pages: {
        signIn: '/login'
    },
    
    // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
    callbacks: {
        async jwt ({token, user}) {
            if(user) {
                token.id = user.id;
                token.accessToken = user.accessToken as string;
                token.username = user.username as string;
            }
            return token;
        },
        async session ({session, token}) {
            session.user = {
                ...session.user,
                username: token.username as string,
                accessToken: token.accessToken as string
            };
            return session;
        }
    },
    trustHost: true
})
