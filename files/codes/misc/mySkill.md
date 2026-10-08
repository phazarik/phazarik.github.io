# Code-Writing Conventions

## File format and naming

- Prefer simple Python scripts over notebooks unless a notebook is explicitly requested.
- Use lower-camel-case filenames, such as `exampleFileName.py`.
- Do not begin filenames with numbers.
- Avoid `snake_case` filenames.
- Retain standard Python naming conventions inside code unless specified otherwise.

## Top comment section

Begin every script with a bordered comment section containing a plain-English paragraph that explains:
- What the underlying concept means.
- What the script does.
- What the code changes or performs.
- What outcome is expected.

Example:
```python
# -----------------------------------------------------------------------------
# Header for this python script
# This script does blah. It uses blah. The expected outcome is blah.
# Usage:
#   python3 codename.py [--options]
# -----------------------------------------------------------------------------
```

## Intermediate comments

- Use `##` comments before intermediate logical sections.
- Write enough comments for the complete script to function as a tutorial.
- Use plain English.
- Avoid personal language like “you” and "we."
- Do not use triple-quoted strings as comments.
- Add concise parameter-level comments where they improve understanding.
- Before a major logical block, instead of using multiple `##` comment lines, use a comment block. For example,
	```python
	# --------------------------------------------
	# This is a comment block. The following does
	# - blah
	# - blah
	# --------------------------------------------
	```

## Functions

- Use a main function for execution, which is defined first, right after the global variables.
- Organize the utility functions by grouping them based on their usage.
- Avoid defining a function when its code is called only once.
- Keep functions that are reused.
- Keep functions required as callbacks by libraries.

## Hyperparameters

Add a dedicated comment section before hyperparameters that explains:
- The available/common options;
- What each value controls;
- Important runtime, memory, and quality tradeoffs;
- Which values are suitable for smoke tests or full runs.

## ANSI terminal colors

The terminal uses green text on a black background by default. Use ANSI colors consistently. Use variable names like `YLW` for yellow, `BLD` for bold, `RES` for reset, etc. Use them as `f"{YLW}{BLD}text{RES}"`. Conventions:
- **Yellow:** stages and section headings.
- **Cyan:** datasets, raw output, and interpreted results.
- **Red:** errors and failed requirements.
- **Dim text:** long sample content.
- **Normal terminal color:** ordinary status and success messages.
- Do not force green ANSI output.

## Compact code for readability

Avoid unnecessary indentation. For example, in the case of simple block of codes, the following looks cluttered.
```python
if condition():
	somthing()
else:
	something_else()
if __name__ == "__main__":
	main()
```
Write such blocks in the following way:
```python
if condition(): somthing()
else:           something_else()
if __name__ == "__main__": main()
```

## Progress reporting

- Prefer native library progress bars over new dependencies.
- Give progress bars descriptive labels.
- Show training metrics at sensible intervals.
- Keep progress output readable on a dark terminal.

## Dataset inspection

Whenever a dataset is loaded, print:
- the dataset or split structure;
- columns and features when relevant;
- a small representative sample before transformation.

## Created artifacts

Whenever a project artifact is created, print its path:
```python
print(f">> File created: {YLW}{BLD}{filename}{RES}")
```
In case multple files are creared, print the directory path instead.
```python
print(f">> Files created in: {YLW}{BLD}{filedir}{RES}")
```
Store generated models, datasets, adapters, and checkpoints under the project-level `artifacts/` directory.

## Point to refine

Lower-camel case currently applies to filenames. Standard Python conventions remain the default for variables and functions unless specified otherwise.
