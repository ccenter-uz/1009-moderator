import { z } from "zod";

export const UsernamePageParamsSchema = z.object({ username: z.string() });

export const ProfilePageArgsSchema = z.object({
  request: z.custom<Request>(),
  params: UsernamePageParamsSchema,
  context: z.any().optional(),
});
