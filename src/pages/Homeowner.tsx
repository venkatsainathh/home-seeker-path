import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, HelpCircle, Users, Calendar } from "lucide-react";

const Homeowner = () => {
  const resources = [
    {
      title: "Trust Agreement",
      description: "View and download your Affordable Housing Land Trust Agreement",
      icon: FileText,
    },
    {
      title: "Community Events",
      description: "Stay connected with upcoming neighborhood and Trust events",
      icon: Calendar,
    },
    {
      title: "Support & Resources",
      description: "Access homeownership resources and financial literacy programs",
      icon: HelpCircle,
    },
    {
      title: "Homeowner Network",
      description: "Connect with other Trust homeowners in your community",
      icon: Users,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-4 text-center">
            Homeowner Resources
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Welcome to your Trust homeowner portal
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card
                  key={index}
                  className="border-2 rounded-[25px] hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {resource.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 bg-accent/10 border-2 border-accent/30 rounded-[25px] p-8 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Need Assistance?</h2>
            <p className="text-muted-foreground mb-4">
              Our team is here to support you throughout your homeownership journey
            </p>
            <p className="text-sm text-muted-foreground">
              Contact: info@communitypreservationtrust.org
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homeowner;
