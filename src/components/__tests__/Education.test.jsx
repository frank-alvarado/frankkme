import { render, screen } from '@testing-library/react';
import Education from '../Education';

describe.skip('Education Component', () => {
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
    render(<Education education={mockEducation} />);
    const headingElement = screen.getByText('Education');
    expect(headingElement).toBeInTheDocument();
  });

  it('renders all education entries correctly', () => {
    render(<Education education={mockEducation} />);
    
    expect(screen.getByText('Master of Science in Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Stanford University | 2018-2020')).toBeInTheDocument();
    
    expect(screen.getByText('Bachelor of Science in Computer Engineering')).toBeInTheDocument();
    expect(screen.getByText('MIT | 2014-2018')).toBeInTheDocument();
  });

  it('renders the right number of education entries', () => {
    render(<Education education={mockEducation} />);
    const degreeElements = screen.getAllByRole('heading', { level: 4 });
    expect(degreeElements.length).toBe(2);
  });
});
