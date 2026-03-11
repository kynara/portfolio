"""
Remove white background from face images, crop to content, resize for web.
Uses connected-component labelling to only remove background white pixels
(not internal white like teeth/eyes).
"""

import os
import numpy as np
from PIL import Image
from scipy.ndimage import label

SRC_DIR  = '/Users/kynara/Developer/portfolio/images'
OUT_DIR  = '/Users/kynara/Developer/portfolio/public/images'
MAX_DIM  = 1200   # max width or height after resize
PADDING  = 24     # px to leave around the cropped content
THRESHOLD = 238   # r,g,b >= this → candidate "white" pixel

os.makedirs(OUT_DIR, exist_ok=True)

files = [
    'open-mouth.png',
    'pre-eat-close-mouth.png',
    'post-eat-close-mouth.png',
]

for filename in files:
    in_path  = os.path.join(SRC_DIR, filename)
    out_path = os.path.join(OUT_DIR, filename)

    print(f'\nProcessing: {filename}')
    img = Image.open(in_path).convert('RGBA')
    data = np.array(img)
    h, w = data.shape[:2]
    print(f'  Original size: {w}x{h}')

    r, g, b = data[:, :, 0], data[:, :, 1], data[:, :, 2]

    # 1. Candidate white mask
    white = (r >= THRESHOLD) & (g >= THRESHOLD) & (b >= THRESHOLD)

    # 2. Label connected components of white regions
    labeled, _ = label(white)

    # 3. Any label touching the image border is background
    border_labels = set()
    border_labels.update(labeled[0,  :].tolist())   # top edge
    border_labels.update(labeled[-1, :].tolist())   # bottom edge
    border_labels.update(labeled[:,  0].tolist())   # left edge
    border_labels.update(labeled[:, -1].tolist())   # right edge
    border_labels.discard(0)  # 0 = non-white pixels, not background

    # 4. Build alpha channel: 0 (transparent) for background, 255 otherwise
    bg_mask = np.isin(labeled, list(border_labels))
    alpha = np.where(bg_mask, 0, 255).astype(np.uint8)

    # Smooth the edge: pixels that border a transparent pixel get feathered
    from scipy.ndimage import binary_dilation
    edge = binary_dilation(bg_mask) & ~bg_mask   # 1-px ring around removed area
    alpha[edge] = 128   # semi-transparent fringe for softer cut

    data[:, :, 3] = alpha
    result = Image.fromarray(data)

    # 5. Crop to bounding box + padding
    bbox = result.getbbox()
    if bbox:
        x1, y1, x2, y2 = bbox
        x1 = max(0, x1 - PADDING)
        y1 = max(0, y1 - PADDING)
        x2 = min(w,  x2 + PADDING)
        y2 = min(h,  y2 + PADDING)
        result = result.crop((x1, y1, x2, y2))

    # 6. Resize so the largest dimension ≤ MAX_DIM
    rw, rh = result.size
    scale = min(MAX_DIM / rw, MAX_DIM / rh, 1.0)
    if scale < 1.0:
        new_size = (int(rw * scale), int(rh * scale))
        result = result.resize(new_size, Image.LANCZOS)

    result.save(out_path, 'PNG', optimize=True)
    print(f'  Saved → {out_path}  ({result.width}x{result.height})')

print('\nAll done.')

