import { protect } from "../../../middleware/authMiddleware";

export default async function handler(req, res) {
  if (req.method === "GET") {
    protect(req, res, () => {
      res.status(200).json({ message: "You have access to this route" });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
