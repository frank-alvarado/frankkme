import { z } from 'zod';

const ContactSchema = z.object({
  email: z.string().email(),
  website: z.string().url(),
  github: z.string().url(),
  linkedin: z.string().url(),
});

const ProfileSchema = z.object({
  name: z.object({
    first: z.string().min(1),
    last: z.string().min(1),
  }),
  title: z.string().min(1),
  location: z.string().min(1),
  contact: ContactSchema,
});

const ExperienceSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  period: z.string().min(1),
  details: z.array(z.string().min(1)).min(1),
});

const EducationSchema = z.object({
  degree: z.string().min(1),
  school: z.string().min(1),
  location: z.string().min(1),
  time: z.string().min(1),
  image: z.string().optional(),
});

const SkillsSchema = z.object({
  proficient: z.array(z.string().min(1)).optional(),
  familiar: z.array(z.string().min(1)).optional(),
  tools: z.array(z.string().min(1)).optional(),
});

export const CvSchema = z.object({
  profile: ProfileSchema,
  experiences: z.array(ExperienceSchema).min(1),
  education: z.array(EducationSchema).min(1),
  skills: SkillsSchema,
});

/**
 * Parsed and validated CV payload. Use this type in JSDoc annotations
 * to get editor type hints when working with cv.yml data.
 *
 * @typedef {z.infer<typeof CvSchema>} Cv
 */

export function parseCv(raw) {
  const result = CvSchema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid data/cv.yml — schema validation failed:\n${issues}`);
  }
  return result.data;
}
