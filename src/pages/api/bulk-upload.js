import dbConnect from "../../utils/dbConnect";
import Product from "../../models/Product";
import formidable from "formidable";
import XLSX from "xlsx";
import axios from "axios";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    await dbConnect();

    const form = formidable();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing file:", err);
        return res.status(500).json({ message: "Error parsing file" });
      }

      try {
        const file = files.files;

        if (!file || file.length === 0) {
          return res.status(400).json({ message: "No file uploaded." });
        }

        const filePath = file[0].filepath;
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log("Parsed Data:", JSON.stringify(data, null, 2));

        const savedProducts = [];

        // Process each item and save to the database
        for (let i = 1; i < data.length; i++) {
          const item = data[i];

          const product = new Product({
            name: item[0] || "",
            description: item[1] || "",
            price: item[2] || 0,
            imageUrl: item[3] || "",
            stock: item[4] || 0,
            variants: item[5] ? JSON.parse(item[5]) : [],
            categories: item[6] ? JSON.parse(item[6]) : [],
          });

          console.log("Product Object:", product);

          try {
            const savedProduct = await product.save();
            savedProducts.push(savedProduct);
            console.log(`Product saved: ${savedProduct.name}`);
          } catch (saveError) {
            console.error("Error saving product:", saveError);
            return res
              .status(500)
              .json({ message: "Error saving product", error: saveError });
          }
        }

        // Send saved products to /api/products
        try {
          const response = await axios.post(
            "http://localhost:3000/api/products",
            savedProducts
          );
          console.log("Response from /api/products:", response.data);
        } catch (error) {
          console.error("Error sending data to /api/products:", error);
          return res
            .status(500)
            .json({ message: "Error sending data to /api/products", error });
        }

        return res.status(200).json({
          message: "Products successfully uploaded and sent to /api/products",
          products: savedProducts,
        });
      } catch (error) {
        console.error("Error processing the file:", error);
        return res
          .status(500)
          .json({ message: "Error processing the file", error });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
