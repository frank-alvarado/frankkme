# Multi-tool CV builder
# Builds CV PDF from single-source YAML + Awesome CV template

FROM ubuntu:22.04

# Noninteractive installs
ENV DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC

# Install system dependencies: TeX, Python, Git
RUN apt-get update && apt-get install -y \
    tzdata \
    python3 python3-pip \
    git \
    texlive-xetex \
    texlive-latex-extra \
    latexmk \
    fonts-font-awesome \
    texlive-fonts-extra \
  && rm -rf /var/lib/apt/lists/*

# Python deps
RUN pip3 install PyYAML

# Install Awesome-CV template into TeX tree
RUN git clone https://github.com/posquit0/Awesome-CV.git /usr/local/texlive/texmf-local/awesome-cv \
  && mktexlsr

WORKDIR /work

# Copy entire repo (assumes build is invoked from repo root)
COPY . /work

# Generate and build CV PDF
RUN python3 scripts/generate_cv.py

# Final artifact located at app/public/cv.pdf inside container
CMD ["ls", "app/public/cv.pdf"]
