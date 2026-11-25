// Notes From a Passive-Aggressive Fridge — make.fun entry (program/v1).
// Writes ONE funny passive-aggressive note from a smart fridge to /output/entry.txt.
// Gate: UTF-8 text, 1-200 characters, not only whitespace, exactly ONE line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "3 a.m. again. You ate the last slice standing in the dark over the sink, like a raccoon with a mortgage. I left the light on for you. You're welcome.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (!line.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

validate(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
// Read-back self-check: the file on disk must be byte-identical to the
// validated line (no trailing newline, no encoding surprise).
const onDisk = readFileSync("/output/entry.txt", "utf8");
if (onDisk !== ENTRY) {
  throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
}
validate(onDisk);
console.log(`wrote /output/entry.txt (${ENTRY.length} chars)`);
