import { render, screen } from '@testing-library/react';
import Profile from '../../components/Profile';

describe.skip('Profile Component', () => {
  const mockProfile = {
    name: 'Frank Alvarado',
    title: 'Software Engineer',
    contact: {
      email: 'frank@example.com',
      website: 'https://frankk.me',
      github: 'https://github.com/frank-alvarado'
    }
  };

  it('renders the profile name correctly', () => {
    render(<Profile profile={mockProfile} />);
    const nameElement = screen.getByText('Frank Alvarado');
    expect(nameElement).toBeInTheDocument();
  });

  it('renders the profile title correctly', () => {
    render(<Profile profile={mockProfile} />);
    const titleElement = screen.getByText('Software Engineer');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders contact links correctly', () => {
    render(<Profile profile={mockProfile} />);
    
    const emailLink = screen.getByText('Email');
    expect(emailLink).toHaveAttribute('href', 'mailto:frank@example.com');
    
    const websiteLink = screen.getByText('Website');
    expect(websiteLink).toHaveAttribute('href', 'https://frankk.me');
    
    const githubLink = screen.getByText('GitHub');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/frank-alvarado');
  });
});
