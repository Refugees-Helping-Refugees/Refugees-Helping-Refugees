#!/bin/bash
set -e

LANGUAGES=("english" "arabic" "spanish" "somali" "dari")
POSTER_DIR="public/poster"
MANIFEST="{}"

for lang in "${LANGUAGES[@]}"; do
  PDF="$POSTER_DIR/poster_${lang}.pdf"
  OUT_DIR="$POSTER_DIR/$lang"

  if [ ! -f "$PDF" ]; then
    echo "⚠️  Skipping $lang — PDF not found"
    continue
  fi

  mkdir -p "$OUT_DIR"

  # Convert PDF pages to PNGs at 150 DPI
  pdftoppm -r 150 -png "$PDF" "$OUT_DIR/page"

  # Rename to consistent page-1.png, page-2.png, ... (pdftoppm may zero-pad)
  i=1
  for f in $(ls "$OUT_DIR"/*.png 2>/dev/null | sort); do
    target="$OUT_DIR/page-$i.png"
    if [ "$f" != "$target" ]; then
      mv "$f" "$target"
    fi
    i=$((i+1))
  done

  PAGE_COUNT=$((i-1))
  echo "✓ $lang → $PAGE_COUNT page(s)"
  MANIFEST=$(echo "$MANIFEST" | node -e "
    const m = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
    m['$lang'] = $PAGE_COUNT;
    process.stdout.write(JSON.stringify(m));
  ")
done

echo "$MANIFEST" > "$POSTER_DIR/manifest.json"
echo "✓ manifest.json written"
