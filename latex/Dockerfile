# Dockerfile – containerized CV PDF build
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install TeX Live (XeLaTeX), Python, pip, Git, and fonts
RUN apt-get update && apt-get install -y \
    python3 python3-pip git tzdata \
    texlive-xetex texlive-latex-extra latexmk \
    texlive-fonts-extra fonts-font-awesome \
  && rm -rf /var/lib/apt/lists/*

# Install Python YAML parser
RUN pip3 install PyYAML

# Copy project and build CV PDF (classes/fonts are in repo)
WORKDIR /work
COPY . /work
ENV TEXINPUTS=/work/latex/cv/classes:/work/latex/cv/fonts:
RUN python3 scripts/generate_cv.py

# Default: generate cv.pdf into app/public (mount host if needed)
ENTRYPOINT ["python3", "scripts/generate_cv.py"]
