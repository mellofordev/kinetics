import { Glob } from "bun";
import { mkdir } from "fs/promises";
import { dirname } from "path";

const REGISTRY_DIR = "./registry";
const PUBLIC_R_DIR = "./public/r";
const REGISTRY_INDEX = "./registry.json";
const BASE_URL = "https://kinetics.prepare.site";

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: Array<{
    path: string;
    type: string;
    content: string;
    target?: string;
  }>;
}

interface RegistryIndex {
  $schema: string;
  name: string;
  homepage: string;
  items: Array<Omit<RegistryItem, "files"> & { files: Array<{ path: string; type: string }> }>;
}

function parseJSDocTags(content: string): Record<string, string> | null {
  const jsDocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
  if (!jsDocMatch) return null;

  const block = jsDocMatch[1];
  const tags: Record<string, string> = {};

  // Split by lines and parse each tag
  const lines = block.split("\n");
  let currentTag = "";
  let currentValue = "";

  for (const line of lines) {
    const trimmed = line.replace(/^\s*\*\s?/, "").trim();
    // Match @tag at start of line (not @scoped/package in the middle)
    const tagMatch = trimmed.match(/^@(\w+)\s+(.*)/);
    if (tagMatch) {
      // Save previous tag if exists
      if (currentTag) {
        tags[currentTag] = currentValue.trim();
      }
      currentTag = tagMatch[1];
      currentValue = tagMatch[2];
    } else if (currentTag && trimmed) {
      // Continue previous tag value
      currentValue += " " + trimmed;
    }
  }

  // Save last tag
  if (currentTag) {
    tags[currentTag] = currentValue.trim();
  }

  return tags;
}

function parseCommaSeparated(value: string | undefined): string[] {
  if (!value) return [];
  return value.split(",").map((d) => d.trim()).filter(Boolean);
}

async function generateRegistry() {
  const items: RegistryItem[] = [];
  const glob = new Glob("**/*.{ts,tsx}");

  console.log("🔍 Scanning registry directory...");

  // Ensure output directory exists
  await mkdir(PUBLIC_R_DIR, { recursive: true });

  for await (const file of glob.scan({ cwd: REGISTRY_DIR })) {
    const filePath = `${REGISTRY_DIR}/${file}`;
    const content = await Bun.file(filePath).text();

    const tags = parseJSDocTags(content);
    if (!tags || !tags.name) {
      console.log(`⏭️  Skipping ${file} (no @name tag)`);
      continue;
    }

    // Determine file type based on directory structure
    const fileType = file.includes("/")
      ? `registry:${dirname(file)}`
      : "registry:ui";

    const item: RegistryItem = {
      name: tags.name,
      type: tags.type || "registry:ui",
      title: tags.title || tags.name,
      description: tags.description || "",
      dependencies: parseCommaSeparated(tags.dependencies),
      registryDependencies: parseCommaSeparated(tags.registryDependencies),
      files: [
        {
          path: file,
          type: fileType,
          content: content,
          target: `components/${file}`,
        },
      ],
    };

    items.push(item);

    // Write individual component JSON to public/r/
    const componentJson = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      ...item,
    };

    await Bun.write(
      `${PUBLIC_R_DIR}/${tags.name}.json`,
      JSON.stringify(componentJson, null, 2)
    );

    console.log(`✅ Generated ${tags.name}.json`);
  }

  // Write registry index
  const registryIndex: RegistryIndex = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "kinetics",
    homepage: BASE_URL,
    items: items.map(({ files, ...rest }) => ({
      ...rest,
      files: files.map(({ path, type }) => ({ path, type })),
    })),
  };

  await Bun.write(REGISTRY_INDEX, JSON.stringify(registryIndex, null, 2));

  console.log(`\n📦 Registry built successfully!`);
  console.log(`   - ${items.length} component(s) in registry.json`);
  console.log(`   - Individual JSONs in ${PUBLIC_R_DIR}/`);
  console.log(`\n🔗 Components available at:`);
  items.forEach((item) => {
    console.log(`   ${BASE_URL}/r/${item.name}.json`);
  });
}

generateRegistry().catch((err) => {
  console.error("❌ Registry generation failed:", err);
  process.exit(1);
});
