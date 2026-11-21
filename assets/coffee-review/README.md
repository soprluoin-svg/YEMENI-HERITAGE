# Sculpted coffee reviews

These two independent GLBs await owner visualization and approval. The tree engraving and palace engraving are separate exported meshes. Grayscale input maps were derived from the owner-provided concepts using image generation. Each height map is evaluated as vertex displacement on the curved coffee surface. The detail image supplies material variation. The palace study conveys the stepped silhouette, arched window patterns and rock foundation. Verify those details against documentary references before approval.

| Asset             | GLB                          | Static fallback                 | Raking-light view                            |
| ----------------- | ---------------------------- | ------------------------------- | -------------------------------------------- |
| Dragon Blood Tree | [GLB](dragon-blood-tree.glb) | [Front](dragon-blood-tree.webp) | [Raking view](dragon-blood-tree-raking.webp) |
| Dar Al-Hajar      | [GLB](dar-al-hajar.glb)      | [Front](dar-al-hajar.webp)      | [Raking view](dar-al-hajar-raking.webp)      |

[Geometry evidence](geometry-evidence.json) reports displacement before export in model-space units, affected vertices and encoded bytes. The measurements are for the exhibition mesh scale. They do not represent physical bean dimensions.

From the checkout root, regenerate with Blender and convert the temporary render outputs using ImageMagick.

```sh
blender -b -t 4 --python-exit-code 1 --python scripts/sculpt-coffee.py -- assets/coffee-review
for bean in dragon-blood-tree dar-al-hajar; do
  convert "assets/coffee-review/$bean-front.png" -strip -resize 480x -quality 86 "assets/coffee-review/$bean.webp"
  convert "assets/coffee-review/$bean-raking.png" -strip -resize 600x -quality 87 "assets/coffee-review/$bean-raking.webp"
  node scripts/check-model.mjs coffee "assets/coffee-review/$bean.glb"
done
```

The two height maps and two detail maps are retained as source. Keep the generated PNG renders outside the commit after converting them to WebP.
