import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
      user:{
        access_token: string | undefined & DefaultSession["user"];
        discord_id: string | undefined & DefaultSession["user"];
        discord_name: string | undefined & DefaultSession["user"];
        opendaoc_name: string | undefined & DefaultSession["user"];
      }
    }
    interface User {
        access_token: any
       & DefaultSession["user"];
    }
}