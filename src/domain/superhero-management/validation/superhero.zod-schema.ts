import { z } from 'zod';

const superheroCreateSchema = z.object({
  name: z.string().min(1).max(255),
  super_power: z.string().min(1).max(255),
  humility_score: z.number().min(1).max(10),
});

type TSuperheroGetSchema = z.infer<typeof superheroCreateSchema>;

export { superheroCreateSchema, TSuperheroGetSchema };
