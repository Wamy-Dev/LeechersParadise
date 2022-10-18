import express from "express";
import { generateLinks } from "./rapidgator_script.mjs";
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/", async (req, res) => {


  const premiumLink = await generateLinks(req.body.downloadLink);
  let rapidgator = "rapidgator.net";
  let hitfile = "hitfile.net";
  
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));


