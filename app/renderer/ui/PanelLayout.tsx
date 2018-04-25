import * as React from "react"
import { Layout, Menu } from "antd"
import styled from "styled-components"

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
        {renderMenu()}
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
