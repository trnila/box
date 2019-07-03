#!/usr/bin/env python3
import argparse
import os
import glob

p = argparse.ArgumentParser()
p.add_argument('dir', help='Path to directory')
p.add_argument('mask', help='file mask')

args = p.parse_args()
print("\n".join(glob.glob(os.path.join(args.dir, args.mask), recursive=True)))
