import { auth } from "@/lib/actions/better-auth";
import { handlers } from "better-auth";

export const { GET, POST } = handlers(auth);