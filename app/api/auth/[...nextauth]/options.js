import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

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