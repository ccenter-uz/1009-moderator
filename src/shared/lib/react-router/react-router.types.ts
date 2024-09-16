import { z } from "zod";

import { ProfilePageArgsSchema } from "./react-router.contracts";

export type ProfilePageData = z.infer<typeof ProfilePageArgsSchema>;
