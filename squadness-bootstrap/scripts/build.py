#!/usr/bin/env python3
"""
Squadness Bootstrap — build script
Concatenates and minifies src/tokens/tokens.css + src/squadness.css into dist/
"""
import re, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, "dist")
os.makedirs(DIST, exist_ok=True)

BANNER = """\
/*!
 * Squadness Bootstrap v2.0.0
 * Design System tokens + component styles for Bootstrap 5
 * https://github.com/squadness/squadness-bootstrap
 * (c) 2026 Squadness — MIT License
 */
"""

def minify_css(css):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)
    css = css.replace('\r\n', '\n').replace('\r', '\n')
    css = re.sub(r'[ \t]+', ' ', css)
    css = re.sub(r'\s*([{}:;,>~+])\s*', r'\1', css)
    css = re.sub(r'\(\s+', '(', css)
    css = re.sub(r'\s+\)', ')', css)
    css = re.sub(r'[^{}]+\{\s*\}', '', css)
    css = re.sub(r';\}', '}', css)
    css = re.sub(r'\s+', ' ', css)
    return css.strip()

def read(path):
    with open(path) as f:
        return f.read()

tokens    = read(os.path.join(ROOT, "src/tokens/tokens.css"))
squadness = read(os.path.join(ROOT, "src/squadness.css"))

# Unminified
unmin = BANNER + "\n/* === tokens.css === */\n" + tokens + "\n\n/* === squadness.css === */\n" + squadness + "\n"
with open(os.path.join(DIST, "squadness-bootstrap.css"), "w") as f:
    f.write(unmin)

# Minified
minified = BANNER.replace('\n', ' ').strip() + "\n" + minify_css(tokens) + minify_css(squadness) + "\n"
with open(os.path.join(DIST, "squadness-bootstrap.min.css"), "w") as f:
    f.write(minified)

raw = len(unmin.encode())
mini = len(minified.encode())
print(f"✅ dist/squadness-bootstrap.css     — {raw:,} bytes ({raw//1024} KB)")
print(f"✅ dist/squadness-bootstrap.min.css — {mini:,} bytes ({mini//1024} KB)")
print(f"   Minification: {100-(mini/raw*100):.1f}% reduction")
