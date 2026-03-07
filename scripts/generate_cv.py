#!/usr/bin/env python3
"""
Combined cv generator:
- Parses data/cv.yml
- Generates LaTeX fragments (experience.tex, technology.tex, education.tex)
- Builds PDF via Makefile
"""
import sys
import subprocess
import shutil
from pathlib import Path
try:
    import yaml
except ImportError:
    print("Missing pyyaml. Install with: pip install pyyaml", file=sys.stderr)
    sys.exit(1)

# Paths
project_root = Path(__file__).resolve().parents[1]
cv_path = project_root / 'data' / 'cv.yml'
cv_dir = project_root / 'latex' / 'cv'
# Sections and build dirs
sections_dir = cv_dir / 'sections'
build_dir = cv_dir / 'build'

# Escape percent and ampersand in LaTeX
def escape_latex(s: str) -> str:
    return s.replace('&', '\\&').replace('%', '\\%')

# Ensure section directory exists
sections_dir.mkdir(parents=True, exist_ok=True)

# Load YAML
with open(cv_path, 'r', encoding='utf8') as f:
    cv = yaml.safe_load(f)

# Write experience.tex
exp_file = sections_dir / 'experience.tex'
with open(exp_file, 'w', encoding='utf8') as f:
    f.write('%\tSECTION TITLE\n%-------------------------------------------------------------------------------\n')
    f.write('\\cvsection{Work Experience}\n\n')
    f.write('%-------------------------------------------------------------------------------\n%\tCONTENT\n%-------------------------------------------------------------------------------\n')
    f.write('\\begin{cventries}\n\n')
    for e in cv['experiences']:
        f.write('  %---------------------------------------------------------\n')
        f.write('  \\cventry\n')
        f.write(f"    {{{escape_latex(e['title'])}}}\n")
        f.write(f"    {{{escape_latex(e['company'])}}}\n")
        f.write(f"    {{{escape_latex(e['location'])}}}\n")
        f.write(f"    {{{escape_latex(e['period'])}}}\n")
        f.write('    {\n')
        f.write('      \\begin{cvitems}\n')
        for d in e['details']:
            f.write(f"        \\item {{{escape_latex(d)}}}\n")
        f.write('      \\end{cvitems}\n')
        f.write('    }\n\n')
    f.write('\\end{cventries}\n')

# Write technology.tex with categorized skills
tech_file = sections_dir / 'technology.tex'
with open(tech_file, 'w', encoding='utf8') as f:
    f.write('%\tSECTION TITLE\n%-------------------------------------------------------------------------------\n')
    f.write('\\cvsection{Skills}\n\n')
    f.write('%-------------------------------------------------------------------------------\n%   CONTENT\n%-------------------------------------------------------------------------------\n')
    f.write('\\begin{cvskills}\n\n')
    # Proficient, Familiar, and Tools categories
    categories = [
        ('proficient', 'Proficient'),
        ('familiar', 'Familiar'),
        ('tools', 'Technologies and Tools'),
    ]
    for key, label in categories:
        items = [escape_latex(item) for item in cv['skills'].get(key, [])]
        f.write('  \\cvskill\n')
        f.write(f'    {{{label}}}\n')
        # Write skill items as comma-separated list
        f.write('    {' + ', '.join(items) + '}\n\n')
    f.write('\\end{cvskills}\n')

# Write education.tex
edu_file = sections_dir / 'education.tex'
with open(edu_file, 'w', encoding='utf8') as f:
    f.write('%\tSECTION TITLE\n%-------------------------------------------------------------------------------\n')
    f.write('\\cvsection{Education}\n\n')
    f.write('%-------------------------------------------------------------------------------\n%   CONTENT\n%-------------------------------------------------------------------------------\n')
    f.write('\\begin{cventries}\n\n')
    for edu in cv['education']:
        f.write('  %---------------------------------------------------------\n')
        f.write('  \\cventry\n')
        # Escape percent and ampersand in education
        f.write(f"    {{{escape_latex(edu['degree'])}}}\n")
        f.write(f"    {{{escape_latex(edu['school'])}}}\n")
        f.write(f"    {{{escape_latex(edu['location'])}}}\n")
        f.write(f"    {{{escape_latex(edu['time'])}}}\n")
        f.write('    {}\n')
    f.write('\\end{cventries}\n')

def build_cv():
    # Ensure build directory exists
    build_dir.mkdir(parents=True, exist_ok=True)
    # Build PDF via XeLaTeX (two runs for references)
    for _ in range(2):
        subprocess.run([
            'xelatex',
            '-interaction=nonstopmode',
            '-shell-escape',
            '-output-directory=build',
            'cv.tex'
        ], cwd=str(cv_dir), check=True)
    # Copy CV PDF to public folder
    src_pdf = build_dir / 'cv.pdf'
    public_pdf = project_root / 'app' / 'public' / 'cv.pdf'
    shutil.copy(str(src_pdf), str(public_pdf))
    print(f"Generated cv.pdf at {src_pdf}, copied to {public_pdf}")

build_cv()
