import express, { Request, Response } from "express";
import orders from "./orders.json";
import cors from "cors";
// Create a new express application instance
const app = express();

// Set the network port
const port = process.env.PORT || 3000;

// Define the root path with a greeting message
app.use(cors())

app.get("/api/1/orders", (req: Request, res: Response) => {
    console.log("GET /api/1/orders");
    res.status(200);
    res.json(orders);
});

// Start the Express server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});