import { createContext } from "react-router";

import type { auth } from "~/lib/auth.server";

type Session = typeof auth.$Infer.Session;

export const sessionContext = createContext<Session>();
