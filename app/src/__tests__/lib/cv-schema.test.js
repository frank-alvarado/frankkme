import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { CvSchema, parseCv } from '../../lib/cv-schema';

const validCv = {
  profile: {
    name: { first: 'Frank', last: 'Alvarado' },
    title: 'Software Engineer',
    location: 'Houston, TX',
    contact: {
      email: 'test@example.com',
      website: 'https://frankk.me',
      github: 'https://github.com/frank-alvarado',
      linkedin: 'https://www.linkedin.com/in/fralvarado',
    },
  },
  experiences: [
    {
      title: 'Senior Software Engineer',
      company: 'Acme',
      location: 'Houston, TX',
      period: '2020 - PRESENT',
      details: ['Did stuff'],
    },
  ],
  education: [
    {
      degree: 'B.S.',
      school: 'UT Austin',
      location: 'Austin, TX',
      time: '2009 - 2013',
    },
  ],
  skills: { proficient: ['Java'], familiar: ['Python'], tools: ['Git'] },
};

describe('CvSchema', () => {
  it('accepts a well-formed CV payload', () => {
    expect(() => CvSchema.parse(validCv)).not.toThrow();
  });

  it('parseCv throws a readable error for invalid email', () => {
    const bad = { ...validCv, profile: { ...validCv.profile, contact: { ...validCv.profile.contact, email: 'not-an-email' } } };
    expect(() => parseCv(bad)).toThrow(/profile\.contact\.email/);
  });

  it('parseCv throws when a required field is missing', () => {
    const bad = { ...validCv, profile: { ...validCv.profile, title: undefined } };
    expect(() => parseCv(bad)).toThrow(/profile\.title/);
  });

  it('parseCv requires at least one experience and one education entry', () => {
    expect(() => parseCv({ ...validCv, experiences: [] })).toThrow(/experiences/);
    expect(() => parseCv({ ...validCv, education: [] })).toThrow(/education/);
  });

  it('validates the actual data/cv.yml file', () => {
    const cvPath = path.join(process.cwd(), '..', 'data', 'cv.yml');
    const raw = yaml.load(fs.readFileSync(cvPath, 'utf8'));
    expect(() => CvSchema.parse(raw)).not.toThrow();
  });
});
