import { render, screen } from '../utils/test-utils';
import Home, { getStaticProps } from '../../pages/index';
import fs from 'fs';
import yaml from 'js-yaml';

jest.mock('../../components/Profile', () => {
  return function MockProfile({ profile }) {
    return <div data-testid="mock-profile">{profile.name}</div>;
  };
});

jest.mock('../../components/Experience', () => {
  return function MockExperience() {
    return <div data-testid="mock-experience">Experience Component</div>;
  };
});

jest.mock('../../components/Education', () => {
  return function MockEducation() {
    return <div data-testid="mock-education">Education Component</div>;
  };
});

jest.mock('../../components/Skills', () => {
  return function MockSkills() {
    return <div data-testid="mock-skills">Skills Component</div>;
  };
});

describe('Home Page', () => {
  const mockProps = {
    profile: {
      name: 'Frank Alvarado',
      title: 'Software Engineer',
      contact: { email: 'test@example.com', website: 'https://example.com', github: 'https://github.com' }
    },
    experiences: [{ title: 'Developer', company: 'Tech Corp', time: '2020-Present' }],
    education: [{ degree: 'CS Degree', school: 'University', time: '2016-2020' }],
    skills: { languages: ['JavaScript'], tools: ['Git'] }
  };

  it('renders the page title correctly', () => {
    render(<Home {...mockProps} />);
    expect(document.title).toBe('Frank Alvarado | Software Engineer');
  });

  it('renders all CV components', () => {
    const { container } = render(<Home {...mockProps} />);

    expect(container.querySelector('[data-testid="mock-profile"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="mock-experience"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="mock-education"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="mock-skills"]')).not.toBeNull();
  });

  it('passes the correct props to Profile component', () => {
    const { container } = render(<Home {...mockProps} />);
    const profileElement = container.querySelector('[data-testid="mock-profile"]');
    expect(profileElement).not.toBeNull();
    expect(profileElement.textContent).toBe('Frank Alvarado');
  });

  it('wraps content in a main element', () => {
    const { container } = render(<Home {...mockProps} />);
    expect(container.querySelector('main')).not.toBeNull();
  });
});

describe('getStaticProps', () => {
  const validCv = {
    profile: {
      name: { first: 'Test', last: 'User' },
      title: 'Software Engineer',
      location: 'Houston, TX',
      contact: {
        email: 'test@example.com',
        website: 'https://example.com',
        github: 'https://github.com/test',
        linkedin: 'https://www.linkedin.com/in/test',
      },
    },
    experiences: [
      {
        title: 'Dev',
        company: 'Acme',
        location: 'Houston, TX',
        period: '2020 - PRESENT',
        details: ['Did stuff'],
      },
    ],
    education: [
      {
        degree: 'B.S.',
        school: 'University',
        location: 'Austin, TX',
        time: '2016 - 2020',
      },
    ],
    skills: { proficient: ['JS'], tools: ['Git'] },
  };

  it('reads cv.yml and returns parsed props', async () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue('mocked yaml');
    jest.spyOn(yaml, 'load').mockReturnValue(validCv);

    const result = await getStaticProps();

    expect(fs.readFileSync).toHaveBeenCalledWith(
      expect.stringContaining('cv.yml'),
      'utf8'
    );
    expect(yaml.load).toHaveBeenCalledWith('mocked yaml');
    expect(result).toEqual({ props: validCv });

    fs.readFileSync.mockRestore();
    yaml.load.mockRestore();
  });

  it('throws a readable error when cv.yml fails schema validation', async () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue('mocked yaml');
    jest.spyOn(yaml, 'load').mockReturnValue({ profile: { name: 'broken' } });

    await expect(getStaticProps()).rejects.toThrow(/Invalid data\/cv\.yml/);

    fs.readFileSync.mockRestore();
    yaml.load.mockRestore();
  });
});
