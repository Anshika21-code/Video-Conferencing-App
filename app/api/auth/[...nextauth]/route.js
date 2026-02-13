// import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
// import dbConnect from "../../../../lib/dbConnect"
// import User from "../../../../models/User"

// export const authOptions = {
//   // 
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET
//     })
//     // ...add more providers here
//   ],
//   // callbacks rediredtion - if a user selcts github or google he will be redirected then it is c/d callbacks. 
//   callbacks:{
//     async jwt({token, user, account}){
//         // console.log('this is token', token)
//         // console.log('user', user)
//         // console.log('account', account)
        
//         if(user){
//             token.id = user.id;
//         }
//         if(account){
//             token.accessToken= account.access_token;
//         }

//         return token;
//     },
//     async session({ session, token }) {
//         session.user.id= token.id;
//         return session
//     },
//     async signIn({user, profile}){
//         await dbConnect()
//             let dbUser = await User.findOne({email:user.email})

//          // if user not found create new 
//         if(!dbUser){
//             dbUser = await User.create({
//                 name:profile.name,
//                 email:profile.email,
//                 profilePicture:profile.picture,
//                 isVerified:profile.email_verified ? true:false
//             })
//         }    
//         user.id = dbUser._id.toString();
//         return true;
//     }
//   },
//   session:{
//     strategy: "jwt",
//     maxAge: 90 * 24 * 60,
//   },
//   pages:{
//     signIn: '/user-auth',
//   }
// }

// const handle = NextAuth(authOptions)
// export {handle as POST, handle as GET};

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) token.id = user.id;
      if (account) token.accessToken = account.access_token;
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },

    async signIn({ user, profile }) {
      await dbConnect();

      let dbUser = await User.findOne({ email: user.email });

      if (!dbUser) {
        dbUser = await User.create({
          name: profile?.name || user.name,
          email: profile?.email || user.email,
          profilePicture: profile?.picture || user.image,
          isVerified: profile?.email_verified ?? true,
        });
      }

      user.id = dbUser._id.toString();
      return true;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 90 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/user-auth",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
