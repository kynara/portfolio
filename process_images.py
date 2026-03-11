"""
Remove white background from face images, crop to content, resize for web.
Resizes first so the 20 px white border is consistent across all images
regardless of their original resolution.
"""

import os
import numpy as np
from PIL import Image
from scipy.ndimage import label, binary_dilation

SRC_DIR   = '/Users/kynara/Developer/portfolio/images'
OUT_DIR   = '/Users/kynara/Developer/portfolio/public/images'
MAX_DIM   = 1200    # resize to this before processing
BORDER    = 20      # white border to preserve (px, in output space)
THRESHOLD = 238     # r,g,b >= this → candidate "white" pixel

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
    print(f'  Original size: {img.width}x{img.height}')

    # 1. Resize first so BORDER pixels are consistent in the final image
    scale = min(MAX_DIM / img.width, MAX_DIM / img.height, 1.0)
    if scale < 1.0:
        img = img.resize((int(img.width * scale), int(img.height * scale)), Image.LANCZOS)

    data = np.array(img)
    h, w = data.shape[:2]

    r, g, b = data[:, :, 0], data[:, :, 1], data[:, :, 2]

    # 2. Candidate white mask
    white = (r >= THRESHOLD) & (g >= THRESHOLD) & (b >= THRESHOLD)

    # 3. Connected-component flood fill from edges → background mask
    labeled, _ = label(white)
    border_labels = set()
    border_labels.update(labeled[0,  :].tolist())
    border_labels.update(labeled[-1, :].tolist())
    border_labels.update(labeled[:,  0].tolist())
    border_labels.update(labeled[:, -1].tolist())
    border_labels.discard(0)
    bg_mask = np.isin(labeled, list(border_labels))
    fg_mask = ~bg_mask

    # 4. Expand face by BORDER px — keep those background pixels as white
    white_border = binary_dilation(fg_mask, iterations=BORDER) & bg_mask
    data[white_border, 0] = 255
    data[white_border, 1] = 255
    data[white_border, 2] = 255
    alpha = np.where(bg_mask & ~white_border, 0, 255).astype(np.uint8)
    data[:, :, 3] = alpha
    result = Image.fromarray(data)

    # 5. Crop tight to opaque content (no extra padding — border is the padding)
    bbox = result.getbbox()
    if bbox:
        result = result.crop(bbox)

    result.save(out_path, 'PNG', optimize=True)
    print(f'  Saved → {out_path}  ({result.width}x{result.height})')

print('\nAll done.')
