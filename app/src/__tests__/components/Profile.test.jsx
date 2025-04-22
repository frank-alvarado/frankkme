import { render, screen } from '../utils/test-utils';
import Profile from '../../components/Profile';

describe('Profile Component', () => {
  const mockProfile = {
    name: { first: 'Frank', last: 'Alvarado' },
    title: 'Software Engineer',
    location: 'Houston, TX',
    contact: {
      email: 'frank@example.com',
      website: 'https://frankk.me',
      github: 'https://github.com/frank-alvarado',
      linkedin: 'https://www.linkedin.com/in/fralvarado'
    }
  };

  it('renders the profile name correctly', () => {
    const { container } = render(<Profile profile={mockProfile} />);
    expect(container.textContent).toContain('Frank Alvarado');
  });

  it('renders the profile title correctly', () => {
    const { container } = render(<Profile profile={mockProfile} />);
    expect(container.textContent).toContain('Software Engineer');
  });

  it('renders contact links correctly', () => {
    const { container } = render(<Profile profile={mockProfile} />);
    
    // Find all links in the rendered component
    const links = container.querySelectorAll('a');
    
    // Convert NodeList to Array for easier testing
    const linkArray = Array.from(links);
    
    // Check that we have expected links
    expect(linkArray.length).toBeGreaterThanOrEqual(4);
    
    // Find specific links by their href attributes
    const emailLink = linkArray.find(link => new URL(link.href).protocol === 'mailto:' && new URL(link.href).pathname === 'frank@example.com');
    const websiteLink = linkArray.find(link => new URL(link.href).hostname === 'frankk.me');
    const githubLink = linkArray.find(link => new URL(link.href).hostname === 'github.com');
    const linkedinLink = linkArray.find(link => new URL(link.href).hostname === 'www.linkedin.com');
    
    // Verify links exist
    expect(emailLink).toBeDefined();
    expect(websiteLink).toBeDefined();
    expect(githubLink).toBeDefined();
    expect(linkedinLink).toBeDefined();
    
    // Check link text
    expect(emailLink.textContent).toBe('Email');
    expect(websiteLink.textContent).toBe('Website');
    expect(githubLink.textContent).toBe('GitHub');
    expect(linkedinLink.textContent).toBe('LinkedIn');
  });
});
