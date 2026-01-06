import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Helping Hands</h3>
            <p className="text-muted-foreground">
              Making the world a better place, one step at a time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/request" className="text-muted-foreground hover:text-foreground transition-colors">
                Request Help
              </Link>
              <Link to="/donate" className="text-muted-foreground hover:text-foreground transition-colors">
                Donate
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <p className="text-muted-foreground">help@helpinghands.org</p>
            <p className="text-muted-foreground">+91 98765 43210</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-muted-foreground">
          &copy; 2026 Helping Hands. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
