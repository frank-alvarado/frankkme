import { render, screen } from '../utils/test-utils';
import Education from '../../components/Education';

describe('Education Component', () => {
  const mockEducation = [
    {
      degree: 'Master of Science in Computer Science',
      school: 'Stanford University',
      time: '2018-2020'
    },
    {
      degree: 'Bachelor of Science in Computer Engineering',
      school: 'MIT',
      time: '2014-2018'
    }
  ];

  it('renders the Education section heading', () => {
    const { container } = render(<Education education={mockEducation} />);
    expect(container.textContent).toContain('Education');
  });

  it('renders all education entries correctly', () => {
    const { container } = render(<Education education={mockEducation} />);
    
    expect(container.textContent).toContain('Master of Science in Computer Science');
    expect(container.textContent).toContain('Stanford University | 2018-2020');
    
    expect(container.textContent).toContain('Bachelor of Science in Computer Engineering');
    expect(container.textContent).toContain('MIT | 2014-2018');
  });

  it('renders the right number of education entries', () => {
    const { container } = render(<Education education={mockEducation} />);
    // Find elements that likely contain degree information
    const degreeElements = container.querySelectorAll('.font-semibold');
    expect(degreeElements.length).toBe(2);
  });
});
