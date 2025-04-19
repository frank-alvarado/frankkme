import { render, screen } from '../utils/test-utils';
import Home from '../../pages/index';

// Mock the components used in the Home page
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
    // Check document title using jest-dom
    expect(document.title).toBe('Frank Alvarado | Software Engineer');
  });

  it('renders all CV components', () => {
    const { container } = render(<Home {...mockProps} />);

    // Use the container to check for test IDs
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
});
