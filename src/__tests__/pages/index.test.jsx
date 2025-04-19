import { render, screen } from '@testing-library/react';
import Home from '../index';

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

describe.skip('Home Page', () => {
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
    // Check document title (needs jest-dom)
    expect(document.title).toBe('Frank Alvarado | Software Engineer');
  });

  it('renders all CV components', () => {
    render(<Home {...mockProps} />);

    expect(screen.getByTestId('mock-profile')).toBeInTheDocument();
    expect(screen.getByTestId('mock-experience')).toBeInTheDocument();
    expect(screen.getByTestId('mock-education')).toBeInTheDocument();
    expect(screen.getByTestId('mock-skills')).toBeInTheDocument();
  });

  it('passes the correct props to Profile component', () => {
    render(<Home {...mockProps} />);
    expect(screen.getByTestId('mock-profile')).toHaveTextContent('Frank Alvarado');
  });
});
