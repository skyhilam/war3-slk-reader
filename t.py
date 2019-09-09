import sys

from sylk_parser import SylkParser

# argv1: source file
# argv2: output file

parser = SylkParser(sys.argv[1])
with open(sys.argv[2], "wb") as fbuf:
    parser.to_csv(fbuf)
