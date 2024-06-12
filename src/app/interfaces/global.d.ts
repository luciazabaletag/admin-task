import { ProjectType } from "../types";
import { NextRequest, NextResponse } from "next/server";
import type { DefaultSession } from 'next-auth';

namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      MONGO_URI: string;
    }
}


declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      userId: string;
    };
  }
}

