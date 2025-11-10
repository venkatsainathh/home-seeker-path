import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, LogOut, Shield, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isHomeowner, loading, signOut } = useAuth();
  const [application, setApplication] = useState<any>(null);
  const [applicationLoading, setApplicationLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("applications")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (!error) {
          setApplication(data);
        }
      } catch (error) {
        console.error("Error fetching application:", error);
      } finally {
        setApplicationLoading(false);
      }
    };

    if (user) {
      fetchApplication();
    }
  }, [user]);

  if (loading || applicationLoading) {
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

  // Homeowner view
  if (isHomeowner) {
    navigate("/homeowner");
    return null;
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "draft":
        return {
          icon: FileText,
          color: "text-muted-foreground",
          title: "Application Draft",
          description: "Continue your application to submit it for review"
        };
      case "submitted":
        return {
          icon: Clock,
          color: "text-blue-500",
          title: "Application Submitted",
          description: "Your application has been submitted and is awaiting review"
        };
      case "under_review":
        return {
          icon: Clock,
          color: "text-yellow-500",
          title: "Under Review",
          description: "Your application is currently being reviewed by our team"
        };
      case "pending_info":
        return {
          icon: AlertCircle,
          color: "text-orange-500",
          title: "Additional Information Required",
          description: "Please check your messages and provide the requested information"
        };
      case "ready_for_match":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          title: "Ready for Matching",
          description: "Your application has been approved! Select your property preferences"
        };
      case "approved":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          title: "Application Approved",
          description: "Congratulations! You've been approved for homeownership"
        };
      case "rejected":
        return {
          icon: AlertCircle,
          color: "text-red-500",
          title: "Application Not Approved",
          description: "Unfortunately, your application was not approved at this time"
        };
      default:
        return {
          icon: FileText,
          color: "text-muted-foreground",
          title: "Application Status",
          description: "View your application status"
        };
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
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

          {!application || application.status === "draft" ? (
            <Card className="border-2 rounded-[25px] shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">
                  {application ? "Continue Your Application" : "Start Your Application"}
                </CardTitle>
                <CardDescription className="text-base">
                  {application 
                    ? "You have a draft application. Continue where you left off."
                    : "Begin your journey to affordable homeownership with the Community Preservation Trust"}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  size="lg" 
                  className="rounded-full"
                  onClick={() => navigate("/new-applicant")}
                >
                  {application ? "Continue Application" : "Start Application"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card className="border-2 rounded-[25px] shadow-xl">
                <CardHeader className="text-center pb-4">
                  {(() => {
                    const statusInfo = getStatusInfo(application.status);
                    const StatusIcon = statusInfo.icon;
                    return (
                      <>
                        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                          <StatusIcon className={`h-8 w-8 ${statusInfo.color}`} />
                        </div>
                        <CardTitle className="text-2xl">{statusInfo.title}</CardTitle>
                        <CardDescription className="text-base">
                          {statusInfo.description}
                        </CardDescription>
                      </>
                    );
                  })()}
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <Button 
                    size="lg" 
                    className="rounded-full"
                    onClick={() => navigate("/existing-applicant")}
                  >
                    View Application Details
                  </Button>
                  {application.status === "ready_for_match" && (
                    <p className="text-sm text-muted-foreground">
                      Select your property preferences to continue
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

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
