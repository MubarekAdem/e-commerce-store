import React, { useState } from "react";
import { Menu, Button, Drawer } from "antd";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  OrderedListOutlined,
  BarsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar"; // Import SearchBar component

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const totalItems = cart ? cart.length : 0;

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 fixed h-full bg-white shadow-md">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <a href="/dashboard">Dashboard</a>
          </Menu.Item>
          <Menu.Item key="2" icon={<OrderedListOutlined />}>
            <a href="/product-list">Product List</a>
          </Menu.Item>
          {currentUser?.role === "customer" && (
            <Menu.Item key="3" icon={<OrderedListOutlined />}>
              <a href="/track-orders">Track Orders</a>
            </Menu.Item>
          )}
          {currentUser?.role === "admin" && (
            <Menu.Item key="6" icon={<OrderedListOutlined />}>
              <a href="/orders">Orders</a> {/* Admin-only Orders Menu */}
            </Menu.Item>
          )}
          <Menu.Item key="4" icon={<ShoppingCartOutlined />}>
            <a href="/cart">Cart ({totalItems})</a>
          </Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />}>
            <Button type="link" onClick={handleLogout}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </div>

      {/* Desktop Search Bar next to the sidebar */}
      <div className="hidden lg:block flex-grow">
        <div className="ml-64 p-4">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Drawer with fixed button */}
      <div className="lg:hidden">
        <Button
          type="primary"
          onClick={showDrawer}
          icon={<BarsOutlined />}
          style={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1000,
            backgroundColor: "#1890ff",
          }}
        />
        <Drawer
          title="Menu"
          placement="left"
          onClose={closeDrawer}
          visible={visible}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <a href="/dashboard">Dashboard</a>
            </Menu.Item>
            <Menu.Item key="2" icon={<OrderedListOutlined />}>
              <a href="/product-list">Product List</a>
            </Menu.Item>
            {currentUser?.role === "customer" && (
              <Menu.Item key="3" icon={<OrderedListOutlined />}>
                <a href="/track-orders">Track Orders</a>
              </Menu.Item>
            )}
            {currentUser?.role === "admin" && (
              <Menu.Item key="6" icon={<OrderedListOutlined />}>
                <a href="/orders">Orders</a> {/* Admin-only Orders Menu */}
              </Menu.Item>
            )}
            <Menu.Item key="4" icon={<ShoppingCartOutlined />}>
              <a href="/cart">Cart ({totalItems})</a>
            </Menu.Item>
            <Menu.Item key="5" icon={<LogoutOutlined />}>
              <Button type="link" onClick={handleLogout}>
                Logout
              </Button>
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden w-full">
        <div className="p-4">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
