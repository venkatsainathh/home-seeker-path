import { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/trust-logo.png";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-6">
          <Link to="/">
            <img 
              src={logo} 
              alt="College Park Community Preservation Trust" 
              className="h-32 w-auto"
            />
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border bg-white mt-auto">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>College Park Community Preservation Trust</p>
          <p>7401 Baltimore Avenue, Suite 201, College Park, MD 20740</p>
          <p className="mt-2">www.communitypreservationtrust.org</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
