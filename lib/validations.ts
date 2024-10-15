import { z } from 'zod';

export const QuestionsSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long!' })
    .max(130, { message: 'Title must contain at most 130 characters!' }),
  explanation: z.string().min(20, {
    message: 'Explanation must be at least 20 characters long!',
  }),
  tags: z
    .array(
      z
        .string()
        .min(1, {
          message: 'Tag must be at least one character long!',
        })
        .max(15, {
          message: 'Tag must contain at most 15 characters',
        })
    )
    .min(1, {
      message: 'You must provide at least one tag!',
    })
    .max(3, {
      message: 'You must provide at most 3 tags!',
    }),
});
