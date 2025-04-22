FROM ubuntu:22.04

# Avoid interactive tzdata prompt
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC

# Install TeX Live with XeLaTeX, latexmk, and fonts
RUN apt-get update && apt-get install -y \
    tzdata \
    texlive-xetex \
    texlive-latex-extra \
    latexmk \
    fonts-font-awesome \
    texlive-fonts-extra \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /work

# Default to building cv.tex into build/
ENTRYPOINT ["latexmk", "-pdf", "-pdflatex=xelatex -interaction=nonstopmode -shell-escape -output-directory=build"]
CMD ["cv.tex"]
