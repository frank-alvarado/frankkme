# LaTeX CV Folder

This directory contains the LaTeX source and build scripts for generating a professional PDF CV. It leverages the **Awesome CV** template by Claud D. Park (https://github.com/posquit0/Awesome-CV).

## Requirements

- **TeX Live** distribution with:
  - `xelatex`, `latexmk`
  - Packages: `fontspec`, `unicode-math`, `fontawesome`, `sourcesanspro`
- **Python 3.x**
- **pip** (Python package manager)

## Python Dependencies

1. Create & activate a virtual environment at the project root:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
2. Install PyYAML:
   ```bash
   pip install PyYAML
   ```
3. Generate `requirements.txt`:
   ```bash
   pip freeze > requirements.txt
   ```

## Directory Structure

```
latex/
└─ cv/
   ├─ Makefile          # Build recipes for cv.pdf
   ├─ cv.tex            # Main document (includes sections)
   ├─ sections/         # Generated fragments (experience, skills, education)
   ├─ classes/          # Custom .cls/.sty (awesome-cv.cls, fontawesome.sty)
   ├─ fonts/            # Local fonts
   ├─ images/           # Logos/icons
   └─ build/            # Build artifacts & cv.pdf (gitignored)
```

## Building the CV

From `latex/cv/`:
```bash
make clean     # remove old artifacts
make           # build cv.pdf into build/
```  
*Or manually:*  
```bash
latexmk -pdf -pdflatex="xelatex -interaction=nonstopmode -shell-escape" cv.tex
```

## Automated Script

At the repo root, run:
```bash
./scripts/generate_cv.py
```
This parses `data/cv.yml`, generates `.tex` fragments, builds the PDF, and copies `build/cv.pdf` to `app/public/cv.pdf`.

## Credits

- **Awesome CV** template by Claud D. Park: https://github.com/posquit0/Awesome-CV
