import withTM from "next-transpile-modules"; // Importing the transpile module

const nextConfig = withTM([
  "antd", // Include Ant Design
  "@ant-design/icons", // Include Ant Design icons
  "rc-util", // Include rc-util
  "rc-pagination", // Add rc-pagination
  "rc-picker",
  "rc-tree",
  "rc-table", // Add rc-picker
])({
  reactStrictMode: true, // Enable React strict mode
});

export default nextConfig;
