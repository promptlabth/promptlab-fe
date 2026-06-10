import { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Nav } from "react-bootstrap";

export type AdminSection = "dashboard" | "users" | "subscriptions";

interface AdminShellProps {
  active: AdminSection;
  title: string;
  children: ReactNode;
}

const ADMIN_LINKS: { key: AdminSection; href: string; label: string }[] = [
  { key: "dashboard", href: "/admin", label: "แดชบอร์ด" },
  { key: "users", href: "/admin/users", label: "ผู้ใช้" },
  { key: "subscriptions", href: "/admin/subscriptions", label: "สมาชิก" },
];

// Minimal admin shell: page title + tab navigation between the admin pages.
// Internal tool, labels are hardcoded Thai on purpose (no locale keys).
export const AdminShell = ({ active, title, children }: AdminShellProps) => {
  return (
    <div className="bg-light min-vh-100 pb-5">
      <Head>
        <title>{`Admin | ${title}`}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className="bg-dark py-3 mb-3">
        <Container>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-white fs-5 fw-bold">
              Prompt Lab Admin · {title}
            </span>
            <Nav variant="pills" activeKey={active}>
              {ADMIN_LINKS.map((link) => (
                <Nav.Item key={link.key}>
                  <Nav.Link
                    as={Link}
                    href={link.href}
                    eventKey={link.key}
                    className={
                      active === link.key ? "" : "text-white-50"
                    }
                  >
                    {link.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </Container>
      </div>
      <Container>{children}</Container>
    </div>
  );
};
