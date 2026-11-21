"""Generate two independent review GLBs and renders from grayscale relief maps.

Run with Blender: blender -b -t 4 --python scripts/sculpt-coffee.py -- assets/coffee-review
"""

import json
import math
from pathlib import Path
import sys

import bpy
from mathutils import Vector, noise

ROOT = Path(sys.argv[sys.argv.index("--") + 1]).resolve()
RINGS = 59
SEGMENTS = 122
SUBJECTS = ("dragon-blood-tree", "dar-al-hajar")


def relief_sampler(path):
    image = bpy.data.images.load(str(path))
    image.colorspace_settings.name = "Non-Color"
    width, height = image.size
    pixels = list(image.pixels)
    bpy.data.images.remove(image)

    def sample(x, y):
        if not (0.0 < x < 1.0 and 0.0 < y < 1.0):
            return 0.0
        sx, sy = x * (width - 1), y * (height - 1)
        ix, iy = int(sx), int(sy)
        u, v = sx - ix, sy - iy
        origin = (iy * width + ix) * 4
        bottom = pixels[origin] * (1 - u) + pixels[origin + 4] * u
        top = pixels[origin + width * 4] * (1 - u) + pixels[origin + width * 4 + 4] * u
        height_value = bottom * (1 - v) + top * v
        edge = min(x, 1 - x, y, 1 - y)
        return max(0.0, (height_value - 0.035) / 0.965) ** 0.86 * min(1, edge * 35)

    return sample


def motif_value(index, sample, x, z):
    return sample((x + (0.065 if index == 1 else -0.067)) / 0.79 + 0.5, z / 1.42 + 0.5)


def make_roast_texture(subject, index, detail):
    size = 512
    image = bpy.data.images.new(f"{subject}-roast", width=size, height=size, alpha=False)
    pixels = []
    shell = (0.30, 0.158, 0.090) if index == 0 else (0.266, 0.125, 0.070)
    highlight = (0.66, 0.423, 0.225)
    for row in range(size):
        z = 2 * (row + 0.5) / size - 1
        for col in range(size):
            x = ((col + 0.5) % (size // 2)) / (size // 2) * 1.28 - 0.64
            field = Vector((x, z, 0 if col < size / 2 else 1.9))
            grain = noise.fractal(field * 39, 1.2, 2.0, 3)
            freckles = max(0.0, noise.fractal(field * 108, 1.0, 2, 2)) ** 2
            motif = motif_value(index, detail, x, z) if col < size / 2 else 0
            contrast = min(1.0, motif ** 1.25) * 0.90
            pore = 1.0 + 0.14 * grain - 0.34 * freckles
            pixels.extend([max(0.02, (a + (b - a) * contrast) * pore) for a, b in zip(shell, highlight)])
            pixels.append(1.0)
    image.pixels.foreach_set(pixels)
    image.pack()
    return image


def make_bean(subject, index, sample, detail):
    vertices, offsets, faces, face_front = [], [], [], []

    def point(latitude, angle):
        r = math.cos(latitude)
        z = math.sin(latitude) * (0.93 if index == 0 else 0.88)
        broadness = 1 + 0.09 * math.sin(latitude) - 0.04 * math.sin(2 * latitude)
        x = r * math.sin(angle) * 0.55 * broadness + 0.052 * math.sin(2 * latitude)
        y = -r * math.cos(angle) * (0.355 if index == 0 else 0.38)
        p = Vector((x, y, z))
        grain = noise.fractal(p * 43 + Vector((index * 3, 0, 0)), 1.0, 2.15, 3)
        mottle = noise.fractal(p * 13, 1.15, 1.9, 3)
        front = max(0.0, math.cos(angle))
        seam_center = (-0.34 if index == 0 else 0.34) + 0.035 * math.sin(z * 7.5) + 0.057 * z
        distance = abs(x - seam_center)
        groove = math.exp(-((distance / 0.034) ** 2)) * front ** 0.5 * r
        rim = math.exp(-(((distance - 0.052) / 0.031) ** 2)) * front * r
        motif = motif_value(index, sample, x, z) if front > 0 else 0.0
        displacement = 0.105 * motif * min(1.0, front * 3.5)
        y += 0.076 * groove - 0.018 * rim - displacement
        y += 0.005 * grain
        x += 0.004 * mottle
        z += 0.003 * grain
        vertices.append((x, y, z))
        offsets.append(displacement)

    point(-math.pi / 2, 0)
    for row in range(1, RINGS):
        latitude = math.pi * (row / RINGS - 0.5)
        # Allocate most vertices to the face carrying the relief.
        for col in range(SEGMENTS):
            if col < 92:
                angle = -math.pi / 2 + math.pi * col / 92
            else:
                angle = math.pi / 2 + math.pi * (col - 92) / (SEGMENTS - 92)
            point(latitude, angle)
    tip = len(vertices)
    point(math.pi / 2, 0)

    last_ring = 1 + (RINGS - 2) * SEGMENTS
    for col in range(SEGMENTS):
        nxt = (col + 1) % SEGMENTS
        faces.append((0, 1 + nxt, 1 + col))
        faces.append((tip, last_ring + col, last_ring + nxt))
        face_front.extend([col < 92, col < 92])
        for row in range(RINGS - 2):
            bottom = 1 + row * SEGMENTS
            top = bottom + SEGMENTS
            faces.append((bottom + col, bottom + nxt, top + nxt, top + col))
            face_front.append(col < 92)

    mesh = bpy.data.meshes.new(f"{subject}-relief")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    uvs = mesh.uv_layers.new(name="Roast")
    for polygon, front in zip(mesh.polygons, face_front):
        polygon.use_smooth = True
        for loop in polygon.loop_indices:
            x, _, z = vertices[mesh.loops[loop].vertex_index]
            uvs.data[loop].uv = ((x / 1.28 + 0.5) * 0.5 + (0 if front else 0.5), z / 2 + 0.5)

    material = bpy.data.materials.new("Roasted Yemeni coffee")
    material.use_nodes = True
    nodes = material.node_tree.nodes
    shader = nodes.get("Principled BSDF")
    shader.inputs["Roughness"].default_value = 0.37 + 0.045 * index
    shader.inputs["Specular IOR Level"].default_value = 0.36
    color_node = nodes.new("ShaderNodeTexImage")
    color_node.image = make_roast_texture(subject, index, detail)
    material.node_tree.links.new(color_node.outputs["Color"], shader.inputs["Base Color"])
    mesh.materials.append(material)
    bean = bpy.data.objects.new(subject, mesh)
    bpy.context.collection.objects.link(bean)
    mesh.calc_loop_triangles()
    return bean, {
        "triangles": len(mesh.loop_triangles),
        "vertices": len(mesh.vertices),
        "relief_peak_model_units": round(max(offsets), 5),
        "displaced_vertices": sum(value > 0.006 for value in offsets),
    }


def aim(obj, target):
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()


def render_views(subject):
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 40
    scene.cycles.use_denoising = False
    scene.render.resolution_x = 640
    scene.render.resolution_y = 640
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.world.color = (0.19, 0.14, 0.10)

    for name, position, size, energy, color in [
        ("warm softbox", (-3, -4, 4), 2.7, 470, (1.0, 0.82, 0.68)),
        ("reflected light", (3, -2, 1), 2.7, 65, (1.0, 0.9, 0.78)),
        ("copper rim", (1, 1, 3.4), 2.2, 320, (1.0, 0.65, 0.40)),
    ]:
        light = bpy.data.lights.new(name, "AREA")
        light.energy, light.color, light.size = energy, color, size
        light_object = bpy.data.objects.new(name, light)
        bpy.context.collection.objects.link(light_object)
        light_object.location = position
        aim(light_object, (0, 0, 0))

    camera = bpy.data.objects.new("review camera", bpy.data.cameras.new("review camera"))
    bpy.context.collection.objects.link(camera)
    camera.data.type = "ORTHO"
    camera.data.ortho_scale = 2.25
    scene.camera = camera
    for label, position in [
        ("front", (0.31, -5.5, 0.44)),
        ("raking", (-3.9, -4.5, 0.72)),
    ]:
        camera.location = position
        aim(camera, (0, 0, 0))
        scene.render.filepath = str(ROOT / f"{subject}-{label}.png")
        bpy.ops.render.render(write_still=True)


evidence = {}
for index, subject in enumerate(SUBJECTS):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.context.scene.world = bpy.data.worlds.new("Coffee gallery")
    bean, measurements = make_bean(
        subject, index, relief_sampler(ROOT / f"{subject}-height.png"),
        relief_sampler(ROOT / f"{subject}-detail.png"),
    )
    bpy.context.view_layer.objects.active = bean
    bean.select_set(True)
    glb = ROOT / f"{subject}.glb"
    bpy.ops.export_scene.gltf(filepath=str(glb), export_format="GLB", use_selection=True, export_image_format="JPEG", export_jpeg_quality=85)
    evidence[subject] = {**measurements, "encoded_bytes": glb.stat().st_size}
    render_views(subject)

(ROOT / "geometry-evidence.json").write_text(json.dumps(evidence, indent=2) + "\n")
