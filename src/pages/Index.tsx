import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, FileText, Users, LogOut, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <p className="text-center">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  const cards = [
    {
      title: "New Applicant",
      description: "Start your homebuyer application with the Community Preservation Trust",
      icon: FileText,
      path: "/new-applicant",
      color: "accent",
    },
    {
      title: "Existing Applicant",
      description: "Check your application status and update your information",
      icon: Users,
      path: "/existing-applicant",
      color: "primary",
    },
    {
      title: "Home Owner",
      description: "Access resources and information for current Trust homeowners",
      icon: Home,
      path: "/homeowner",
      color: "secondary",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Welcome to College Park Community Preservation Trust
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Building affordable homeownership opportunities and preserving community connections
              </p>
            </div>
            <div className="flex gap-2">
              {isAdmin && (
                <Button variant="outline" onClick={() => navigate("/admin")}>
                  <Shield className="mr-2 h-4 w-4" />
                  Admin
                </Button>
              )}
              <Button variant="outline" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Card
                  key={card.path}
                  className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 rounded-[25px]"
                  onClick={() => navigate(card.path)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base">
                      {card.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-16 bg-accent/10 border-2 border-accent/30 rounded-[25px] p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">About the Trust</h2>
            <p className="text-muted-foreground leading-relaxed">
              The College Park Community Preservation Trust is committed to creating pathways to 
              affordable homeownership while preserving the heritage and community connections of 
              College Park, particularly for current and former Lakeland residents and their descendants.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
