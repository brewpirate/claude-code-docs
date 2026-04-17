#!/usr/bin/env bun
// memory-meld: read many claude memory dirs, classify each memory into a
// logical project via LLM, write regrouped output/<project>/ folders.
//
// Usage: bun run index.ts <source-dir>
//   <source-dir> contains subfolders; each subfolder is a copy of a
//   claude memory directory (MEMORY.md + individual memory .md files).

import { readdir, mkdir, writeFile } from "node:fs/promises";
import { join, basename } from "node:path";

type MemoryType = "user" | "feedback" | "project" | "reference";

interface Memory {
  sourceFolder: string;   // e.g. "1"
  filename: string;       // e.g. "user_background.md"
  name: string;           // frontmatter name
  description: string;    // frontmatter description
  type: MemoryType;
  body: string;           // content after frontmatter
}

interface MeldedMemory {
  project: string;        // inferred logical project, or "_shared"
  name: string;
  description: string;
  type: MemoryType;
  body: string;
  sources: string[];      // "1/user_background.md" etc. — provenance
}

// ---------- read ----------

function parseFrontmatter(raw: string): { fm: Record<string, string>; body: string } | null {
  if (!raw.startsWith("---\n")) return null;
  const end = raw.indexOf("\n---", 4);
  if (end === -1) return null;
  const fm: Record<string, string> = {};
  for (const line of raw.slice(4, end).split("\n")) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].trim();
  }
  const body = raw.slice(end + 4).replace(/^\n+/, "");
  return { fm, body };
}

async function readMemories(sourceDir: string): Promise<Memory[]> {
  const memories: Memory[] = [];
  const subs = await readdir(sourceDir, { withFileTypes: true });
  for (const sub of subs) {
    if (!sub.isDirectory() || sub.name === "output") continue;
    const dir = join(sourceDir, sub.name);
    for (const f of await readdir(dir)) {
      if (!f.endsWith(".md") || f === "MEMORY.md") continue;
      const raw = await Bun.file(join(dir, f)).text();
      const parsed = parseFrontmatter(raw);
      if (!parsed) {
        console.warn(`skip (no frontmatter): ${sub.name}/${f}`);
        continue;
      }
      memories.push({
        sourceFolder: sub.name,
        filename: f,
        name: parsed.fm.name ?? f.replace(/\.md$/, ""),
        description: parsed.fm.description ?? "",
        type: (parsed.fm.type as MemoryType) ?? "project",
        body: parsed.body,
      });
    }
  }
  return memories;
}

// ---------- meld (LLM) ----------

async function meld(memories: Memory[]): Promise<MeldedMemory[]> {
  const promptInstructions = await Bun.file(
    join(import.meta.dir, "prompt.md")
  ).text();

  const input = memories.map((m, i) => ({
    id: i,
    source: `${m.sourceFolder}/${m.filename}`,
    name: m.name,
    description: m.description,
    type: m.type,
    body: m.body,
  }));

  const prompt =
    promptInstructions +
    "\n\n<memories>\n" +
    JSON.stringify(input, null, 2) +
    "\n</memories>\n\n" +
    "Respond with ONLY a JSON array of melded memories. No prose, no markdown fences.";

  const proc = Bun.spawn(["claude", "-p"], {
    stdin: new TextEncoder().encode(prompt),
    stdout: "pipe",
    stderr: "pipe",
  });

  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ]);

  if (exitCode !== 0) {
    throw new Error(`claude CLI exited ${exitCode}:\n${stderr}`);
  }

  const jsonStart = stdout.indexOf("[");
  const jsonEnd = stdout.lastIndexOf("]");
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error(`no JSON array in response:\n${stdout}`);
  }
  return JSON.parse(stdout.slice(jsonStart, jsonEnd + 1));
}

// ---------- write ----------

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60);
}

async function writeOutput(sourceDir: string, melded: MeldedMemory[]) {
  const outRoot = join(sourceDir, "output");
  const byProject = new Map<string, MeldedMemory[]>();
  for (const m of melded) {
    const p = m.project || "_shared";
    if (!byProject.has(p)) byProject.set(p, []);
    byProject.get(p)!.push(m);
  }

  for (const [project, items] of byProject) {
    const dir = join(outRoot, slug(project) || "_shared");
    await mkdir(dir, { recursive: true });
    const indexLines: string[] = [];
    for (const m of items) {
      const fname = `${m.type}_${slug(m.name)}.md`;
      const sourcesComment =
        m.sources && m.sources.length
          ? `<!-- melded from: ${m.sources.join(", ")} -->\n\n`
          : "";
      const content =
        `---\nname: ${m.name}\ndescription: ${m.description}\ntype: ${m.type}\n---\n\n` +
        sourcesComment +
        m.body.trim() +
        "\n";
      await writeFile(join(dir, fname), content);
      indexLines.push(`- [${m.name}](${fname}) — ${m.description}`);
    }
    await writeFile(
      join(dir, "MEMORY.md"),
      indexLines.sort().join("\n") + "\n"
    );
  }

  console.log(
    `wrote ${melded.length} melded memories to ${outRoot} across ${byProject.size} project(s): ` +
    [...byProject.keys()].join(", ")
  );
}

// ---------- main ----------

const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error("usage: bun run index.ts <source-dir>");
  process.exit(1);
}

const memories = await readMemories(sourceDir);
console.log(`read ${memories.length} memories from ${sourceDir}`);
const melded = await meld(memories);
await writeOutput(sourceDir, melded);
