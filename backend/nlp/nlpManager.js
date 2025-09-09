import { NlpManager } from "node-nlp";
import fs from "fs";
import path from "path";

const manager = new NlpManager({ languages: ["en"], forceNER: true });

const entitiesPath = path.join(process.cwd(), "entities.json");
const intentsPath = path.join(process.cwd(), "intents.json");

if (fs.existsSync(entitiesPath)) {
  const data = JSON.parse(fs.readFileSync(entitiesPath, "utf-8"));
  for (const [entityName, entityData] of Object.entries(data)) {
    if (entityData.options) {
      for (const [option, texts] of Object.entries(entityData.options)) {
        manager.addNamedEntityText(entityName, option, ["en"], texts);
      }
    }
    if (entityData.regex) {
      manager.addRegexEntity(entityName, "en", new RegExp(entityData.regex));
    }
  }
}

if (fs.existsSync(intentsPath)) {
  const data = JSON.parse(fs.readFileSync(intentsPath, "utf-8"));
  for (const intent of data) {
    for (const example of intent.examples) {
      manager.addDocument("en", example, intent.name);
    }
  }
}

(async () => {
  await manager.train();
  manager.save();
})();

export default manager;
