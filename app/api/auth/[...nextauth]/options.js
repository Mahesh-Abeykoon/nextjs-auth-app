import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/model/User";
import bcrypt from "bcrypt";

export const options = {
    providers:[
        GitHubProvider({
            profile(profile) {
                console.log("Profile GitHub: ", profile)
                let userRole = "GitHub User"
                if(profile?.email == "mahesh.p.abeykoon@gmail.com"){
                    userRole = "admin"
                }

                return {
                    ...profile,
                    role: userRole,
                };
            },
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            redirectUri: 'https://nextjs-auth-app.onrender.com/api/auth/callback/github',

        }), 
        GoogleProvider({
            profile(profile) {
                console.log("Profile Google: ", profile)
                
                let userRole = "Google User";
                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                };
            },
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectUri: 'https://nextjs-auth-app.onrender.com/api/auth/callback/google',

        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
            email: {
                label: "Email:",
                type: "text",
                placeholder: "Enter your email",
            },
            password: {
                label: "Password:",
                type: "password",
                placeholder: "Enter your password",
            },
            },
            async authorize(credentials) {
            try {
                const foundUser = await User.findOne({ email: credentials.email })
                .lean()
                .exec();
    
                if (foundUser) {
                console.log("User Exists");
                const match = await bcrypt.compare(
                    credentials.password,
                    foundUser.password
                );
    
                if (match) {
                    console.log("Good Pass");
                    delete foundUser.password;
    
                    foundUser["role"] = "Unverified Email";
                    return foundUser;
                }
                }
            } catch (error) {
                console.log(error);
            }
            return null;
            },
        }),
        ],

    callbacks: {
        async jwt({ token, user }){
            console.log("JWT Callback: ", { token, user });

            if(user) token.role = user.role;
            return token;
        },
        async session({ session, token }){
            console.log("Session Callback: ", { session, token });

            if(session?.user) session.user.role = token.role;
            return session;
        },
    }

}