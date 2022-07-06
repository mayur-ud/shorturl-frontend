import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from "next-auth/providers/email";
import clientPromise from "../../../database/connect";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

export default NextAuth({
  secret : process.env.AUTH_SECRET,  
  providers : [
        GithubProvider({
            clientId:process.env.GITHUB_ID,
            clientSecret:process.env.GITHUB_SECRET
        }),
        EmailProvider({
            server: {
              host: process.env.EMAIL_SERVER_HOST,
              port: process.env.EMAIL_SERVER_PORT,
              auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD
              }
            },
            from: process.env.EMAIL_FROM
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          }),
    ],
    pages : {
       signIn : '/auth/signin',
    },
    adapter:   MongoDBAdapter(clientPromise),
    
})
