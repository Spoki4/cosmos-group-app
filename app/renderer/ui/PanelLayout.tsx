import * as React from "react"
import { Layout, Menu } from "antd"
import styled from "styled-components"
import { Link } from "react-router-dom"
import SubMenu from "antd/lib/menu/SubMenu"

const Logo = styled.div`
  width: 120px;
  height: 32px;
  line-height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
`

export const PanelLayout = ({ renderMenu, renderContent }) => (
  <Layout
    style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
  >
    <Layout.Header>
      <Logo />
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
        <Menu.Item key="users">
          <Link to="/panel/users">Пользователи</Link>
        </Menu.Item>
        <Menu.Item key="employee">
          <Link to="/panel/employee">Работники</Link>
        </Menu.Item>
        <SubMenu key="accounting" title="Учет">
          <Menu.Item key="stock">
            <Link to="/panel/stocks">Склады</Link>
          </Menu.Item>
          <Menu.Item key="receive">
            <Link to="/panel/receive">Привоз</Link>
          </Menu.Item>
          <Menu.Item key="sent">
            <Link to="/panel/sent">Отправка</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="product">
            <Link to="/panel/products">Товары</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Layout.Header>
    <Layout.Content
      style={{
        flex: "1 0 auto",
        background: "#fff",
        padding: 24
      }}
    >
      {renderContent()}
    </Layout.Content>
    <Layout.Footer style={{ flex: "0 0 auto", textAlign: "center" }}>
      Cosmos Group @2018
    </Layout.Footer>
  </Layout>
)