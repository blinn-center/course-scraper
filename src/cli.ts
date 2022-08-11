import { log } from "./deps.ts";
import { fetchAllSerializable } from "./index.ts";

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG"),
    file: new log.handlers.FileHandler("DEBUG", {
      filename: "./blinn-course-scraper.log",
      formatter: (logRecord) => {
        return JSON.stringify({
          level: logRecord.level,
          msg: logRecord.msg,
          args: logRecord.args,
        });
      },
    }),
  },
  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["console", "file"],
    },
  },
});

const outputFile = Deno.args[0];
if (!outputFile || outputFile === "") {
  throw new Error(`Invalid output file ${outputFile}`);
}

const everything = await fetchAllSerializable();
const json = JSON.stringify(everything, null, 2);

await Deno.writeTextFile(outputFile, json);
