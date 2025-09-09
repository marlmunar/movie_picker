import { NlpManager } from "node-nlp";

const manager = new NlpManager({ languages: ["en"], forceNER: true });

await manager.load("../nlp/model.nlp");

const response = await manager.process(
  "en",
  "Suggest scary movies from 2010s that are kid-friendly"
);

console.log(response.intent);
console.log(response.entities);
