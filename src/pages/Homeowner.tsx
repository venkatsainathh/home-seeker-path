import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, FileText, RefreshCw, MessageSquare, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Homeowner = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("homeowner_id", user.id);

        if (error) throw error;
        setProperties(data || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [user]);

  const services = [
    {
      title: "Property Improvement Request",
      description: "Submit a request for property improvements or repairs",
      icon: Home,
      action: () => toast.info("Property improvement request feature coming soon"),
    },
    {
      title: "Refinance Request",
      description: "Apply for refinancing your property",
      icon: RefreshCw,
      action: () => toast.info("Refinance request feature coming soon"),
    },
    {
      title: "Annual Certification",
      description: "Complete your annual homeowner certification",
      icon: FileText,
      action: () => toast.info("Annual certification feature coming soon"),
    },
    {
      title: "Message CPT Staff",
      description: "Contact our team for support and inquiries",
      icon: MessageSquare,
      action: () => toast.info("Messaging feature coming soon"),
    },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <p className="text-center">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">
                Trust Homeowner Portal
              </h1>
              <p className="text-lg text-muted-foreground">
                Welcome! Manage your properties and access homeowner services
              </p>
            </div>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Properties Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4">Your Properties</h2>
            {properties.length === 0 ? (
              <Card className="border-2 rounded-[25px]">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    No properties assigned yet. Please contact CPT staff for assistance.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {properties.map((property) => (
                  <Card key={property.id} className="border-2 rounded-[25px] hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5 text-primary" />
                        <CardTitle>{property.address}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Property ID: {property.id}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Services Section */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Homeowner Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={service.title}
                    className="border-2 rounded-[25px] cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    onClick={service.action}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homeowner;
