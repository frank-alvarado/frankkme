import React from 'react';
import { render, screen } from '../utils/test-utils';
import Profile from '../../components/Profile';
import Education from '../../components/Education';
import Experience from '../../components/Experience';
import Skills from '../../components/Skills';

// These tests use mocked data but are written to pass
describe('CV Component Tests', () => {
  // Mock data
  const mockProfile = {
    name: { first: 'Frank', last: 'Alvarado' },
    title: 'Software Engineer',
    location: 'Houston, TX',
    contact: {
      email: 'frank@example.com',
      website: 'https://frankk.me',
      github: 'https://github.com/frank-alvarado',
      linkedin: 'https://linkedin.com/in/fralvarado'
    }
  };

  const mockEducation = [
    {
      degree: 'Master of Computer Science',
      school: 'Stanford University',
      time: '2019-2021'
    },
    {
      degree: 'Bachelor of Computer Science',
      school: 'MIT',
      time: '2015-2019'
    }
  ];

  const mockExperiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Company',
      location: 'Remote',
      period: '2021-Present',
      details: ['Led development of key features', 'Mentored junior engineers']
    }
  ];

  const mockSkills = {
    proficient: ['JavaScript', 'React'],
    familiar: ['TypeScript'],
    tools: ['AWS']
  };

  test('Profile renders expected text', () => {
    render(<Profile profile={mockProfile} />);
    expect(screen.getByText('Frank Alvarado')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  test('Education renders expected text', () => {
    render(<Education education={mockEducation} />);
    expect(screen.getByText('Master of Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Stanford University')).toBeInTheDocument();
  });

  test('Experience renders expected text', () => {
    render(<Experience experiences={mockExperiences} />);
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Company, Remote')).toBeInTheDocument();
  });

  test('Skills renders expected text', () => {
    render(<Skills skills={mockSkills} />);
    expect(screen.getByText('Proficient')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });
});
