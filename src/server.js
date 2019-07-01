import express from "express";
import apiRoutes from "./routes/api/routes";
import Util from "./utils/utils";

const { errResponse } = Util;
const app = express();
const port = process.env.PORT || 7000;

app.use("/api/v1", apiRoutes);

app.all("*", (req, res) => {
  errResponse(res, 404, "this page does not exist");
});

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});

export default app;
