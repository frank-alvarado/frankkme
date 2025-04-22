.PHONY: all pdf clean

LATEXMK = latexmk
BUILD_DIR = build

all: pdf

pdf:
	@mkdir -p $(BUILD_DIR)
	# Copy source files to build directory
	@cp -R classes sections fonts images cv.tex $(BUILD_DIR)/
	@cd $(BUILD_DIR) && $(LATEXMK) -pdf -silent \
		-pdflatex="xelatex -interaction=nonstopmode -shell-escape" cv.tex

clean:
	@if [ -d $(BUILD_DIR) ]; then \
		cd $(BUILD_DIR) && $(LATEXMK) -C -silent cv.tex; \
	fi
	@rm -rf $(BUILD_DIR)